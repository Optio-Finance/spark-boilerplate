import { defaultProvider, ProviderInterface } from "starknet";
import { Connector } from "../connectors";

export interface StarknetState {
  account?: string;
  connect: (connector: Connector) => void;
  disconnect: () => void;
  library: ProviderInterface;
  connectors: Connector[];
  error?: Error;
  wallet?: unknown;
}

export const STARKNET_INITIAL_STATE: StarknetState = {
  account: undefined,
  connect: () => undefined,
  disconnect: () => undefined,
  library: defaultProvider,
  connectors: [],
  wallet: undefined,
};
