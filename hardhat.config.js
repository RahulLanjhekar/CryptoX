require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/34z27xwC2MVKmiA4WJq9tuqwqObKWCOc',
      accounts: ['810eff1e52aba5cfbee0b83e92a78ce62e8968eeb17644c5f189f0a0dea8702c']
    }
  }
};
