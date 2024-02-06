import "@nomicfoundation/hardhat-toolbox";
import hre from "hardhat";
import { writeFileSync } from "fs";

async function deployTokens() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`Deploying tokens with the account: ${deployer.address} on ${networkName}`);

  const tokens = [
    {
      name: "USD Coin",
      symbol: "USDC",
      initialSupply: "1000000000", // 1000 USDC, 6桁の小数点以下
      customDecimals: 6,
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      initialSupply: "1000000000", // 1000 USDT, 6桁の小数点以下
      customDecimals: 6,
    },
    {
      name: "JPY Coin",
      symbol: "JPYC",
      initialSupply: "1000000000000000000000", // 1000 JPYC, 18桁の小数点以下
      customDecimals: 18,
    },
  ];

  let deployedTokens: any = {};

  for (const token of tokens) {
    const CustomToken = await hre.ethers.getContractFactory("CustomToken");
    const customToken = await CustomToken.deploy(
      token.name,
      token.symbol,
      token.initialSupply,
      token.customDecimals
    );

    await customToken.deployed();
    console.log(`${token.symbol} deployed to: ${customToken.address}`);

    deployedTokens[token.symbol] = customToken.address;
  }

  const outputFile = `deployedTokens-${networkName}.json`;
  writeFileSync(outputFile, JSON.stringify(deployedTokens, null, 2));

  console.log(`Deployed tokens addresses have been saved to ${outputFile}`);
}

export default deployTokens;
