import "@nomicfoundation/hardhat-toolbox";
import { run } from "hardhat";

async function verifyContract(address: string, constructorArguments: any[]) {
  try {
    await run("verify:verify", {
      address,
      constructorArguments,
    });
    console.log(`Verification successful for contract at address: ${address}`);
  } catch (error) {
    console.error(`Verification failed for contract at address: ${address}`, error);
  }
}

export default verifyContract;
