import "@nomicfoundation/hardhat-toolbox";
import hre from "hardhat";
import { writeFileSync } from "fs";

async function deployContracts() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`Deploying contracts with the account: ${deployer.address} on ${networkName}`);

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

  const outputFile = `deployedContracts-${networkName}.json`;
  writeFileSync(outputFile, JSON.stringify({
    ERC2771Forwarder: forwarderAddress,
    Escrow: escrowAddress,
  }, null, 2));

  console.log(`Deployed contracts addresses have been saved to ${outputFile}`);

  return {
    forwarderAddress,
    escrowAddress
  };
}

export default deployContracts;
