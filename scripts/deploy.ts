import "@nomicfoundation/hardhat-toolbox";
import hre from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`Deploying contracts with the account: ${deployer.address} on ${networkName}`);

  // // トークンの設定
  // const tokens = [
  //   {
  //     name: "USD Coin",
  //     symbol: "USDC",
  //     initialSupply: "1000000000", // 1000 USDC, 6桁の小数点以下
  //     customDecimals: 6,
  //   },
  //   {
  //     name: "Tether USD",
  //     symbol: "USDT",
  //     initialSupply: "1000000000", // 1000 USDT, 6桁の小数点以下
  //     customDecimals: 6,
  //   },
  //   {
  //     name: "JPY Coin",
  //     symbol: "JPYC",
  //     initialSupply: "1000000000000000000000", // 1000 JPYC, 18桁の小数点以下
  //     customDecimals: 18,
  //   },
  // ];

  // // 各トークンをデプロイ
  // for (const token of tokens) {
  //   const CustomToken = await hre.ethers.getContractFactory("CustomToken");
  //   const customToken = await CustomToken.deploy(
  //     token.name,
  //     token.symbol,
  //     token.initialSupply,
  //     token.customDecimals
  //   );

  //   console.log(`${token.name} deployed to: ${(await customToken.getAddress())}`);
  // }

  // ERC2771Forwarderのデプロイ
  const Forwarder = await hre.ethers.getContractFactory("ERC2771Forwarder");
  const forwarder = await Forwarder.deploy("ERC2771Forwarder");
  const forwarderAddress = await forwarder.getAddress();
  console.log(`Forwarder deployed to: ${forwarderAddress}`);

  // Escrowコントラクトのデプロイ
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    forwarderAddress,
    1, // minSubmissionDeadlineDays
    7, // minReviewDeadlineDays
    7, // minPaymentDeadlineDays
    270, // lockPeriodDays
    14  // deadlineExtensionPeriodDays
  );
  const escrowAddress = await escrow.getAddress();
  console.log(`Escrow deployed to: ${escrowAddress}`);

  const outputFile = `deploy.${networkName}.json`;
  writeFileSync(outputFile, JSON.stringify({
    ERC2771Forwarder: forwarderAddress,
    Escrow: escrowAddress,
  }, null, 2));

  console.log(`Waiting for ${networkName} scan to catch up...`);
  await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds

  await hre.run("verify:verify", {
    address: forwarderAddress,
    constructorArguments: ["ERC2771Forwarder"],
  });
  await hre.run("verify:verify", {
    address: escrowAddress,
    constructorArguments: [forwarderAddress, 1, 7, 7, 270, 14],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
