const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NovaTokenV2", function () {
  async function deployFixture() {
    const [treasury, holder] = await ethers.getSigners();
    const NovaTokenV2 = await ethers.getContractFactory("NovaTokenV2");
    const token = await NovaTokenV2.deploy(treasury.address);
    await token.waitForDeployment();

    return { token, treasury, holder };
  }

  it("deploys with fixed metadata and supply", async function () {
    const { token, treasury } = await deployFixture();
    const initialSupply = ethers.parseUnits("1000000000", 18);

    expect(await token.name()).to.equal("NovaToken");
    expect(await token.symbol()).to.equal("NOVA");
    expect(await token.decimals()).to.equal(18n);
    expect(await token.totalSupply()).to.equal(initialSupply);
    expect(await token.balanceOf(treasury.address)).to.equal(initialSupply);
  });

  it("rejects a zero treasury", async function () {
    const NovaTokenV2 = await ethers.getContractFactory("NovaTokenV2");

    let rejected = false;
    try {
      await NovaTokenV2.deploy(ethers.ZeroAddress);
    } catch {
      rejected = true;
    }

    expect(rejected).to.equal(true);
  });

  it("allows holders to transfer and burn their own tokens", async function () {
    const { token, treasury, holder } = await deployFixture();
    const transferAmount = ethers.parseUnits("1000", 18);
    const burnAmount = ethers.parseUnits("250", 18);

    await token.transfer(holder.address, transferAmount);
    await token.connect(holder).burn(burnAmount);

    expect(await token.balanceOf(holder.address)).to.equal(transferAmount - burnAmount);
    expect(await token.totalSupply()).to.equal(ethers.parseUnits("999999750", 18));
  });

  it("does not expose owner, mint, pause, blacklist, or tax controls", async function () {
    const { token } = await deployFixture();

    expect(token.owner).to.equal(undefined);
    expect(token.mint).to.equal(undefined);
    expect(token.pause).to.equal(undefined);
    expect(token.unpause).to.equal(undefined);
    expect(token.blacklist).to.equal(undefined);
    expect(token.setTax).to.equal(undefined);
    expect(token.setFees).to.equal(undefined);
  });
});
