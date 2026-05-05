const { ethers, network } = require("hardhat");

async function main() {
  const required = ["DEPLOYER_PRIVATE_KEY", "NOVA_TREASURY"];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (!ethers.isAddress(process.env.NOVA_TREASURY)) {
    throw new Error("NOVA_TREASURY must be a valid EVM address.");
  }

  if (!process.env.DEPLOYER_PRIVATE_KEY.startsWith("0x")) {
    throw new Error("DEPLOYER_PRIVATE_KEY must start with 0x.");
  }

  console.log("Deployment config OK");
  console.log(`Treasury: ${process.env.NOVA_TREASURY}`);
  console.log(`Network: ${network.name}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
