// import deployTokens from "./deployTokens";
// The deployment of test tokens was initially required for development on the Mumbai testnet, but is currently not in use.
// The code is kept for possible reactivation in the future if needed.

import deployContracts from "./deployContracts";
import verifyContract from "./verifyContract";

async function main() {
  // Deployment of test tokens is currently unnecessary, hence the following line is commented out.
  // await deployTokens();

  const { forwarderAddress, escrowAddress } = await deployContracts();

  console.log(`Waiting for polygon scan to catch up...`);
  await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds

  await verifyContract(forwarderAddress, ["ERC2771Forwarder"]);
  await verifyContract(escrowAddress, [forwarderAddress, 1, 7, 7, 270, 14]);
}

main().catch((error) => {
  console.error("An error occurred during the deployment process:", error);
});
