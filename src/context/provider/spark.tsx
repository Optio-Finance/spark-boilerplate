import { StarknetBlockProvider } from "../blocks";
import { getInstalledInjectedConnectors } from "../connectors";
import { StarknetLibraryProvider } from "../starknet";
import { StarknetTransactionManagerProvider } from "../txs";

export interface SparkProviderProps {
  children: React.ReactNode;
}

export function SparkProvider({ children }: SparkProviderProps): JSX.Element {
  const connectors = getInstalledInjectedConnectors();
  return (
    <StarknetLibraryProvider connectors={connectors} autoConnect>
      <StarknetBlockProvider>
        <StarknetTransactionManagerProvider>
          {children}
        </StarknetTransactionManagerProvider>
      </StarknetBlockProvider>
    </StarknetLibraryProvider>
  );
}
