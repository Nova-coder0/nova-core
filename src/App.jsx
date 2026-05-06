import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Coins,
  FileCode2,
  Gauge,
  Github,
  LockKeyhole,
  Network,
  PlusCircle,
  Rocket,
  Scale,
  RefreshCw,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { ethers } from "ethers";

const TOKEN_ADDRESS = "0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8";
const OWNER_ADDRESS = "0x73B13124271Dd38f62b1DA3297BeA735CBCDC942";
const PAIR_ADDRESS = "0x1eCc98A87EA3E28B8b8Bc72a388223db8A1444Bb";
const RPC_URL = "https://bsc-dataseed.binance.org/";
const LOGO_URL = "https://raw.githubusercontent.com/Nova-coder0/nova-core/main/public/nova-logo.png";
const TOKENLIST_URL = "https://raw.githubusercontent.com/Nova-coder0/nova-core/main/public/nova.tokenlist.json";
const BSC_CHAIN = {
  chainId: "0x38",
  chainName: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: [RPC_URL],
  blockExplorerUrls: ["https://bscscan.com"]
};

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function owner() view returns (address)",
  "function paused() view returns (bool)"
];

const initialStats = {
  name: "NovaToken",
  symbol: "NOVA",
  decimals: 18,
  totalSupply: "1,000,000,000",
  owner: OWNER_ADDRESS,
  paused: "false",
  ownerBalance: "999,999,740.873956",
  ownerShare: "99.999974",
  pairBalance: "0.000001066321",
  holders: "4",
  buyTax: "0",
  sellTax: "0",
  risk: "High",
  liquidityUsd: "Effectively zero"
};

const checklist = [
  { label: "Trust Wallet metadata", state: "done", detail: "info.json and logo.png are prepared for the BSC asset path." },
  { label: "Contract source verification", state: "risk", detail: "V1 source is not publicly verified yet." },
  { label: "Owner and treasury policy", state: "done", detail: "Owner wallet and allocation rules are documented before treasury moves." },
  { label: "Liquidity plan", state: "next", detail: "Real liquidity and lock policy are required before promotion." },
  { label: "Monitoring", state: "done", detail: "V1 analysis script exists and this dashboard exposes the same facts." },
  { label: "Grant readiness", state: "done", detail: "A BNB Chain grant proposal draft is ready for an open-source monitoring path." },
  { label: "Utility layer", state: "next", detail: "Build API credits, bot access, or dashboard services around NOVA." }
];

const tokenomics = [
  ["Liquidity", "20%", "200,000,000 NOVA"],
  ["Ecosystem rewards", "30%", "300,000,000 NOVA"],
  ["Treasury / operations", "20%", "200,000,000 NOVA"],
  ["Development", "15%", "150,000,000 NOVA"],
  ["Community grants", "10%", "100,000,000 NOVA"],
  ["Reserve", "5%", "50,000,000 NOVA"]
];

const actions = [
  "Submit the prepared logo and metadata through the Trust Wallet asset flow.",
  "Create official website URL and add it to the Trust Wallet metadata.",
  "Publish owner and treasury policy before moving supply.",
  "Add real PancakeSwap liquidity only after tokenomics are public.",
  "Verify V1 source if the original source code is available.",
  "Keep V2 as audited backup, not immediate replacement."
];

const noBnbRoutes = [
  {
    title: "Utility first",
    body: "Build a useful NOVA tool before adding serious liquidity: dashboard, bot, API credits, or holder utilities."
  },
  {
    title: "Grant path",
    body: "Prepare a BNB Chain grant application around open-source monitoring, token transparency, and community tooling."
  },
  {
    title: "Community liquidity",
    body: "Let early supporters add small liquidity after the tokenomics and risks are public. No false promises."
  },
  {
    title: "Partner liquidity",
    body: "Offer transparent NOVA allocation to a partner who contributes BNB, with vesting and public terms."
  }
];

const totalSupplyNumber = 1_000_000_000;

function compactAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatToken(value, decimals, digits = 6) {
  const parsed = Number(ethers.formatUnits(value, decimals));
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits
  }).format(parsed);
}

function metricTone(value) {
  if (value === "risk") return "danger";
  if (value === "next") return "warn";
  return "ok";
}

function formatNumber(value, digits = 6) {
  if (!Number.isFinite(value)) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits
  }).format(value);
}

function App() {
  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Static baseline");
  const [error, setError] = useState("");
  const [walletStatus, setWalletStatus] = useState("");
  const [liquidityInputs, setLiquidityInputs] = useState({
    novaAmount: "10000000",
    bnbAmount: "1",
    bnbUsd: "600"
  });

  async function refreshStats() {
    setLoading(true);
    setError("");

    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
      const [name, symbol, decimals, totalSupply, owner, paused, pairBalance] = await Promise.all([
        token.name(),
        token.symbol(),
        token.decimals(),
        token.totalSupply(),
        token.owner(),
        token.paused(),
        token.balanceOf(PAIR_ADDRESS)
      ]);

      const ownerBalance = await token.balanceOf(owner);
      const total = Number(ethers.formatUnits(totalSupply, decimals));
      const ownerAmount = Number(ethers.formatUnits(ownerBalance, decimals));
      const ownerShare = total > 0 ? ((ownerAmount / total) * 100).toFixed(6) : "0";

      setStats((current) => ({
        ...current,
        name,
        symbol,
        decimals,
        totalSupply: formatToken(totalSupply, decimals, 2),
        owner,
        paused: String(paused),
        ownerBalance: formatToken(ownerBalance, decimals, 6),
        ownerShare,
        pairBalance: formatToken(pairBalance, decimals, 12)
      }));
      setLastUpdated(new Date().toLocaleString());
    } catch (refreshError) {
      setError(refreshError.message || "Unable to refresh chain data.");
      setLastUpdated("Using static fallback");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshStats();
  }, []);

  const riskScore = useMemo(() => {
    const ownerShare = Number(stats.ownerShare);
    if (ownerShare > 95) return "Critical concentration";
    if (ownerShare > 50) return "High concentration";
    return "Improving";
  }, [stats.ownerShare]);

  const liquidityModel = useMemo(() => {
    const novaAmount = Number(liquidityInputs.novaAmount);
    const bnbAmount = Number(liquidityInputs.bnbAmount);
    const bnbUsd = Number(liquidityInputs.bnbUsd);
    const valid = novaAmount > 0 && bnbAmount > 0 && bnbUsd > 0;

    if (!valid) {
      return {
        valid: false,
        novaPerBnb: 0,
        bnbPerNova: 0,
        usdPerNova: 0,
        impliedFdv: 0,
        poolUsdDepth: 0,
        twoXBuyBnb: 0
      };
    }

    const bnbPerNova = bnbAmount / novaAmount;
    const usdPerNova = bnbPerNova * bnbUsd;
    const impliedFdv = usdPerNova * totalSupplyNumber;
    const poolUsdDepth = bnbAmount * bnbUsd * 2;

    return {
      valid,
      novaPerBnb: novaAmount / bnbAmount,
      bnbPerNova,
      usdPerNova,
      impliedFdv,
      poolUsdDepth,
      twoXBuyBnb: bnbAmount * (Math.sqrt(2) - 1)
    };
  }, [liquidityInputs]);

  function updateLiquidityInput(name, value) {
    setLiquidityInputs((current) => ({
      ...current,
      [name]: value.replace(/[^0-9.]/g, "")
    }));
  }

  async function addNovaToWallet() {
    setWalletStatus("");

    if (!window.ethereum?.request) {
      setWalletStatus("MetaMask was not detected in this browser.");
      return;
    }

    try {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BSC_CHAIN.chainId }]
        });
      } catch (switchError) {
        if (switchError.code !== 4902) {
          throw switchError;
        }

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [BSC_CHAIN]
        });
      }

      const added = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: TOKEN_ADDRESS,
            symbol: "NOVA",
            decimals: 18,
            image: LOGO_URL
          }
        }
      });

      setWalletStatus(added ? "NOVA import request sent to MetaMask." : "MetaMask did not add NOVA.");
    } catch (walletError) {
      setWalletStatus(walletError.message || "MetaMask import failed.");
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="https://github.com/Nova-coder0/nova-core" target="_blank" rel="noreferrer">
          <img className="brand-mark brand-logo" src="/nova-logo.png" alt="NOVA logo" />
          <span>
            <strong>NOVA Control Center</strong>
            <small>BNB Smart Chain V1 transparency</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#dashboard">Dashboard</a>
          <a href="#tokenomics">Tokenomics</a>
          <a href="#actions">Actions</a>
          <a href="https://bscscan.com/token/0x20f8CA292a27c1d5F41A43599268bb85a12Ee3A8" target="_blank" rel="noreferrer">
            BscScan <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <section className="status-band" id="dashboard">
        <div className="status-copy">
          <h1>Make the existing NOVA token measurable, transparent, and safer to trust.</h1>
          <p>
            NOVA V1 is active on BNB Smart Chain. The current work is not a new deploy: it is transparency,
            tokenomics, liquidity discipline, and utility around the contract that already exists.
          </p>
        </div>
        <div className="contract-panel">
          <div>
            <span>Contract</span>
            <strong>{compactAddress(TOKEN_ADDRESS)}</strong>
          </div>
          <div>
            <span>Owner</span>
            <strong>{compactAddress(stats.owner)}</strong>
          </div>
          <button className="icon-button" type="button" onClick={refreshStats} disabled={loading} title="Refresh chain data">
            <RefreshCw size={18} className={loading ? "spinning" : ""} />
          </button>
        </div>
      </section>

      <section className="discoverability-band" aria-label="NOVA wallet import">
        <div>
          <span className="eyebrow">Wallet visibility</span>
          <h2>Add NOVA to MetaMask with the official logo URL.</h2>
          <p>
            This uses MetaMask's wallet asset request on BNB Smart Chain. MetaMask may still cache or ignore logos for
            custom tokens, but this gives users the cleanest import path we can control.
          </p>
        </div>
        <div className="wallet-actions">
          <button className="primary-button" type="button" onClick={addNovaToWallet}>
            <PlusCircle size={18} />
            Add NOVA to MetaMask
          </button>
          <a className="secondary-button" href={TOKENLIST_URL} target="_blank" rel="noreferrer">
            Tokenlist JSON <ArrowUpRight size={15} />
          </a>
          {walletStatus && <p className="wallet-status">{walletStatus}</p>}
        </div>
      </section>

      {error && <p className="inline-alert">Live RPC refresh failed: {error}</p>}

      <section className="metrics-grid" aria-label="NOVA token metrics">
        <Metric icon={Coins} label="Total supply" value={`${stats.totalSupply} NOVA`} tone="neutral" />
        <Metric icon={Wallet} label="Owner share" value={`${stats.ownerShare}%`} tone="danger" caption={riskScore} />
        <Metric icon={Activity} label="Paused" value={stats.paused} tone={stats.paused === "true" ? "danger" : "ok"} />
        <Metric icon={Gauge} label="Buy / sell tax" value={`${stats.buyTax}% / ${stats.sellTax}%`} tone="ok" />
        <Metric icon={Network} label="Pair NOVA reserve" value={stats.pairBalance} tone="warn" caption="PancakeSwap V2" />
        <Metric icon={AlertTriangle} label="Liquidity" value={stats.liquidityUsd} tone="danger" />
      </section>

      <section className="split-layout">
        <div className="panel">
          <div className="section-heading">
            <ShieldCheck size={21} />
            <h2>Trust Checklist</h2>
          </div>
          <div className="checklist">
            {checklist.map((item) => (
              <div className="check-row" key={item.label}>
                <span className={`status-dot ${metricTone(item.state)}`} />
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-heading">
            <FileCode2 size={21} />
            <h2>Contract Position</h2>
          </div>
          <dl className="facts">
            <div>
              <dt>Network</dt>
              <dd>BNB Smart Chain</dd>
            </div>
            <div>
              <dt>Pair</dt>
              <dd>{compactAddress(PAIR_ADDRESS)}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>Not verified yet</dd>
            </div>
            <div>
              <dt>Last refresh</dt>
              <dd>{lastUpdated}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="tokenomics-section" id="tokenomics">
        <div className="section-heading">
          <LockKeyhole size={21} />
          <h2>Tokenomics Draft</h2>
        </div>
        <div className="tokenomics-table" role="table" aria-label="Suggested NOVA allocation">
          <div className="table-row table-head" role="row">
            <span>Category</span>
            <span>Share</span>
            <span>Amount</span>
          </div>
          {tokenomics.map(([category, share, amount]) => (
            <div className="table-row" role="row" key={category}>
              <span>{category}</span>
              <strong>{share}</strong>
              <span>{amount}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="liquidity-section" id="liquidity">
        <div className="section-heading">
          <Scale size={21} />
          <h2>Liquidity Calculator</h2>
        </div>
        <div className="liquidity-layout">
          <div className="liquidity-form">
            <label>
              <span>NOVA for pool</span>
              <input
                inputMode="decimal"
                value={liquidityInputs.novaAmount}
                onChange={(event) => updateLiquidityInput("novaAmount", event.target.value)}
              />
            </label>
            <label>
              <span>BNB for pool</span>
              <input
                inputMode="decimal"
                value={liquidityInputs.bnbAmount}
                onChange={(event) => updateLiquidityInput("bnbAmount", event.target.value)}
              />
            </label>
            <label>
              <span>BNB price USD</span>
              <input
                inputMode="decimal"
                value={liquidityInputs.bnbUsd}
                onChange={(event) => updateLiquidityInput("bnbUsd", event.target.value)}
              />
            </label>
          </div>
          <div className="liquidity-results">
            <Result label="Start price" value={`${formatNumber(liquidityModel.bnbPerNova, 12)} BNB / NOVA`} />
            <Result label="USD price" value={`$${formatNumber(liquidityModel.usdPerNova, 10)} / NOVA`} />
            <Result label="NOVA per BNB" value={formatNumber(liquidityModel.novaPerBnb, 2)} />
            <Result label="Implied FDV" value={`$${formatNumber(liquidityModel.impliedFdv, 2)}`} />
            <Result label="Pool depth" value={`$${formatNumber(liquidityModel.poolUsdDepth, 2)}`} />
            <Result label="Approx. BNB buy to 2x" value={`${formatNumber(liquidityModel.twoXBuyBnb, 4)} BNB`} />
          </div>
        </div>
        <p className="liquidity-note">
          This is an AMM model for planning, not a promise of price movement. Real trades include fees, slippage,
          arbitrage, and liquidity risk. Use it to avoid creating a pool that is too thin or misleading.
        </p>
      </section>

      <section className="growth-section">
        <div className="section-heading">
          <Rocket size={21} />
          <h2>No-BNB Growth Path</h2>
        </div>
        <div className="growth-grid">
          {noBnbRoutes.map((route) => (
            <article className="growth-card" key={route.title}>
              <strong>{route.title}</strong>
              <p>{route.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="actions-section" id="actions">
        <div className="section-heading">
          <CheckCircle2 size={21} />
          <h2>Next Actions</h2>
        </div>
        <ol className="action-list">
          {actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
        <div className="repo-link">
          <Github size={18} />
          <a href="https://github.com/Nova-coder0/nova-core" target="_blank" rel="noreferrer">
            Open nova-core repository
          </a>
        </div>
      </section>
    </main>
  );
}

function Result({ label, value }) {
  return (
    <div className="result-cell">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Metric({ icon: Icon, label, value, tone, caption }) {
  return (
    <article className={`metric ${tone}`}>
      <div className="metric-icon">
        <Icon size={20} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      {caption && <small>{caption}</small>}
    </article>
  );
}

export default App;
