// import "@nomiclabs/hardhat-ethers";
import "@shardlabs/starknet-hardhat-plugin";
import { HardhatUserConfig } from "hardhat/types";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  paths: {
    starknetArtifacts: "./spark/artifacts",
  },
  starknet: {
    venv: "~/cairo_venv",
    network: "testnet",
    recompile: false,
    wallets: {
      OpenZeppelin: {
        accountName: "OpenZeppelin",
        modulePath:
          "starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount",
        accountPath: "~/.starknet_accounts",
      },
    },
  },
  networks: {
    Spark: {
      url: "http://127.0.0.1:5050/",
    },
    testnet: {
      url: "https://alpha4.starknet.io/",
    },
  },
};

export default config;
