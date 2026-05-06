const { ethers } = require("ethers");

const NOVA_V1 = "0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8";
const PANCAKE_PAIR = "0x1eCc98A87EA3E28B8b8Bc72a388223db8A1444Bb";
const BSC_RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org/";

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function owner() view returns (address)",
  "function paused() view returns (bool)"
];

async function optionalCall(label, fn) {
  try {
    return await fn();
  } catch {
    return `${label}: unavailable`;
  }
}

async function main() {
  const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);
  const token = new ethers.Contract(NOVA_V1, ERC20_ABI, provider);

  const [name, symbol, decimals, totalSupply, owner, paused, pairBalance] = await Promise.all([
    token.name(),
    token.symbol(),
    token.decimals(),
    token.totalSupply(),
    optionalCall("owner", () => token.owner()),
    optionalCall("paused", () => token.paused()),
    token.balanceOf(PANCAKE_PAIR)
  ]);

  const ownerBalance =
    typeof owner === "string" && owner.startsWith("0x")
      ? await token.balanceOf(owner)
      : 0n;

  const total = Number(ethers.formatUnits(totalSupply, decimals));
  const ownerAmount = Number(ethers.formatUnits(ownerBalance, decimals));
  const ownerShare = total > 0 ? (ownerAmount / total) * 100 : 0;

  console.log("NOVA V1 Analysis");
  console.log("----------------");
  console.log(`Contract: ${NOVA_V1}`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Decimals: ${decimals}`);
  console.log(`Total supply: ${ethers.formatUnits(totalSupply, decimals)} ${symbol}`);
  console.log(`Owner: ${owner}`);
  console.log(`Paused: ${paused}`);
  console.log(`Owner balance: ${ethers.formatUnits(ownerBalance, decimals)} ${symbol}`);
  console.log(`Owner share: ${ownerShare.toFixed(6)}%`);
  console.log(`Pancake pair: ${PANCAKE_PAIR}`);
  console.log(`Pair token balance: ${ethers.formatUnits(pairBalance, decimals)} ${symbol}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
