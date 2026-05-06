const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const TOKEN_ADDRESS = "0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8";
const DEFAULT_RPC_URL = "https://bsc-dataseed.binance.org/";
const OUTPUT_DIR = path.join(process.cwd(), "generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "nova-v1-allocation-plan.json");

const ABI = [
  "function owner() view returns (address)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

const ALLOCATION = [
  {
    key: "liquidity",
    label: "Liquidity",
    shareBps: 2000,
    env: "NOVA_LIQUIDITY_WALLET"
  },
  {
    key: "ecosystem_rewards",
    label: "Ecosystem rewards",
    shareBps: 3000,
    env: "NOVA_ECOSYSTEM_REWARDS_WALLET"
  },
  {
    key: "treasury_operations",
    label: "Treasury / operations",
    shareBps: 2000,
    env: "NOVA_TREASURY_OPERATIONS_WALLET"
  },
  {
    key: "development",
    label: "Development",
    shareBps: 1500,
    env: "NOVA_DEVELOPMENT_WALLET"
  },
  {
    key: "community_grants",
    label: "Community grants",
    shareBps: 1000,
    env: "NOVA_COMMUNITY_GRANTS_WALLET"
  },
  {
    key: "reserve",
    label: "Reserve",
    shareBps: 500,
    env: "NOVA_RESERVE_WALLET"
  }
];

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return {};

  return Object.fromEntries(
    fs
      .readFileSync(envPath, "utf8")
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trim().startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      })
  );
}

function usage() {
  console.log("Usage:");
  console.log("  node scripts/allocate-v1.js --dry-run");
  console.log("  node scripts/allocate-v1.js --execute");
}

function format(amount, decimals) {
  return ethers.formatUnits(amount, decimals);
}

function readAddress(env, key, strict) {
  const value = env[key];
  if (!value || !ethers.isAddress(value)) {
    if (strict) {
      throw new Error(`Missing or invalid ${key}`);
    }
    return null;
  }
  return ethers.getAddress(value);
}

async function main() {
  const execute = process.argv.includes("--execute");
  const dryRun = process.argv.includes("--dry-run") || !execute;

  if (process.argv.includes("--help")) {
    usage();
    return;
  }

  const env = loadEnv();
  const rpcUrl = env.BSC_RPC_URL || DEFAULT_RPC_URL;
  const privateKey = env.NOVA_OWNER_PRIVATE_KEY || env.DEPLOYER_PRIVATE_KEY;
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const readToken = new ethers.Contract(TOKEN_ADDRESS, ABI, provider);
  const [owner, decimals, symbol, totalSupply] = await Promise.all([
    readToken.owner(),
    readToken.decimals(),
    readToken.symbol(),
    readToken.totalSupply()
  ]);

  const targets = ALLOCATION.map((item) => {
    const amount = (totalSupply * BigInt(item.shareBps)) / 10000n;
    return {
      ...item,
      address: readAddress(env, item.env, execute),
      amount,
      amountFormatted: format(amount, decimals)
    };
  });

  const plan = {
    token: TOKEN_ADDRESS,
    symbol,
    decimals: Number(decimals),
    totalSupply: format(totalSupply, decimals),
    owner: ethers.getAddress(owner),
    generatedAt: new Date().toISOString(),
    mode: dryRun ? "dry-run" : "execute",
    transfers: targets.map((target) => ({
      category: target.label,
      share: `${target.shareBps / 100}%`,
      amount: `${target.amountFormatted} ${symbol}`,
      to: target.address || `UNSET:${target.env}`,
      env: target.env
    }))
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(plan, null, 2)}\n`);

  console.log(`NOVA V1 allocation plan written to ${OUTPUT_FILE}`);
  console.log(`Owner: ${plan.owner}`);
  for (const transfer of plan.transfers) {
    console.log(`${transfer.category}: ${transfer.amount} -> ${transfer.to}`);
  }

  if (!privateKey) {
    console.log("No NOVA_OWNER_PRIVATE_KEY or DEPLOYER_PRIVATE_KEY found. Dry-run only.");
    return;
  }

  const wallet = new ethers.Wallet(privateKey, provider);
  console.log(`Signer: ${wallet.address}`);

  if (wallet.address.toLowerCase() !== owner.toLowerCase()) {
    if (dryRun) {
      console.log("Dry-run warning: signer is not the current NOVA owner, so this wallet cannot execute allocation transfers.");
      const missingTargets = targets.filter((target) => !target.address).map((target) => target.env);
      if (missingTargets.length > 0) {
        console.log(`Dry-run has missing target wallets: ${missingTargets.join(", ")}`);
        console.log("Set every target wallet before using --execute.");
      }
      return;
    }
    throw new Error("Signer is not the current NOVA owner. Refusing to execute allocation transfers.");
  }

  const ownerBalance = await readToken.balanceOf(wallet.address);
  const requiredTotal = targets.reduce((sum, target) => sum + target.amount, 0n);

  if (ownerBalance < requiredTotal) {
    throw new Error(
      `Owner balance too low. Required ${format(requiredTotal, decimals)} ${symbol}, available ${format(
        ownerBalance,
        decimals
      )} ${symbol}.`
    );
  }

  if (dryRun) {
    const missingTargets = targets.filter((target) => !target.address).map((target) => target.env);
    if (missingTargets.length > 0) {
      console.log(`Dry-run has missing target wallets: ${missingTargets.join(", ")}`);
      console.log("Set every target wallet before using --execute.");
    }
    console.log("Dry-run complete. Add --execute to broadcast transfers from the owner wallet.");
    return;
  }

  const token = readToken.connect(wallet);
  const receipts = [];

  for (const target of targets) {
    console.log(`Sending ${target.amountFormatted} ${symbol} to ${target.address} (${target.label})`);
    const tx = await token.transfer(target.address, target.amount);
    console.log(`Broadcast: ${tx.hash}`);
    const receipt = await tx.wait();
    receipts.push({
      category: target.label,
      to: target.address,
      amount: `${target.amountFormatted} ${symbol}`,
      hash: tx.hash,
      blockNumber: receipt.blockNumber
    });
  }

  const executedPlan = {
    ...plan,
    mode: "executed",
    executedAt: new Date().toISOString(),
    receipts
  };
  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(executedPlan, null, 2)}\n`);
  console.log(`Execution receipts written to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
