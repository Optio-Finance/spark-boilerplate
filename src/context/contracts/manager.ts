import React, { useEffect } from "react";
import { useStarknet } from "../starknet";
import type { ContractState } from "./model";
import { CONTRACT_INITIAL_STATE } from "./model";

const useContractManager = (): ContractState => {
  const [state] = React.useState({
    ...CONTRACT_INITIAL_STATE,
  });
  const { erc1155Contract } = state;
  const { account, library } = useStarknet();

  useEffect(() => {
    erc1155Contract.connect(account || library);
  }, [erc1155Contract, account, library]);

  return {
    erc1155Contract,
  };
};

export default useContractManager;
