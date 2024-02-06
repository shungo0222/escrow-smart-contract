import "@nomicfoundation/hardhat-toolbox";
import hre from "hardhat";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { tokenDeployParams } from "../config/deployParameters";

async function deployTokens() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`Deploying tokens with the account: ${deployer.address} on ${networkName}`);

  let deployedTokens: any = {};

  for (const token of tokenDeployParams) {
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

  const deploymentDir = "deployments";
  mkdirSync(deploymentDir, { recursive: true });
  const outputFile = join(deploymentDir, `deployedTokens-${networkName}.json`);
  writeFileSync(outputFile, JSON.stringify(deployedTokens, null, 2));

  console.log(`Deployed tokens addresses have been saved to ${outputFile}`);
}

export default deployTokens;
