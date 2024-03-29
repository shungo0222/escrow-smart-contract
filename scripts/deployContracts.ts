import "@nomicfoundation/hardhat-toolbox";
import hre from "hardhat";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { escrowDeployParams, forwarderDeployParams } from "../config/deployParameters";

async function deployContracts() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`Deploying contracts with the account: ${deployer.address} on ${networkName}`);

  // ERC2771Forwarderのデプロイ
  const Forwarder = await hre.ethers.getContractFactory("ERC2771Forwarder");
  const forwarder = await Forwarder.deploy(forwarderDeployParams.name);
  const forwarderAddress = await forwarder.getAddress();
  console.log(`Forwarder deployed to: ${forwarderAddress}`);

  // Escrowコントラクトのデプロイ
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    forwarderAddress,
    escrowDeployParams.minSubmissionDeadlineDays,
    escrowDeployParams.minReviewDeadlineDays,
    escrowDeployParams.minPaymentDeadlineDays,
    escrowDeployParams.lockPeriodDays,
    escrowDeployParams.deadlineExtensionPeriodDays
  );
  const escrowAddress = await escrow.getAddress();
  console.log(`Escrow deployed to: ${escrowAddress}`);

  const deploymentDir = "deployments";
  mkdirSync(deploymentDir, { recursive: true });
  const outputFile = join(deploymentDir, `deployedContracts-${networkName}.json`);
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
