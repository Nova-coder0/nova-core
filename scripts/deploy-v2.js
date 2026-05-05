const { ethers } = require("hardhat");

async function main() {
  const treasury = process.env.NOVA_TREASURY;

  if (!treasury || !ethers.isAddress(treasury)) {
    throw new Error("Set NOVA_TREASURY to the initial token treasury address.");
  }

  const NovaTokenV2 = await ethers.getContractFactory("NovaTokenV2");
  const token = await NovaTokenV2.deploy(treasury);
  await token.waitForDeployment();

  console.log(`NovaTokenV2 deployed to ${await token.getAddress()}`);
  console.log(`Treasury: ${treasury}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
