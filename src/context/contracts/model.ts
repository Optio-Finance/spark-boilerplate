import ERC1155_ABI from "@artifacts/contracts/ERC1155.cairo/ERC1155_abi.json";
import { Abi, Contract } from "starknet";

export interface ContractState {
  erc1155Contract: Contract;
}

export const CONTRACT_INITIAL_STATE: ContractState = {
  erc1155Contract: new Contract(
    ERC1155_ABI as Abi,
    "0x066888284bf0dce7811aea8950eab7c39c22f2594cef7124366aa93edbcc6b8e"
  ),
};
