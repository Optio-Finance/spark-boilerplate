import { useCallback, useEffect, useReducer } from "react";
import { defaultProvider, ProviderInterface } from "starknet";

import { Connector } from "../connectors";
import { ConnectorNotFoundError } from "../errors";
import { StarknetState } from "./model";

interface StarknetManagerState {
  account?: string;
  connectors: Connector[];
  connector?: Connector;
  library: ProviderInterface;
  error?: Error;
  wallet?: unknown;
}

interface SetAccount {
  type: "set_account";
  account?: string;
  wallet?: unknown;
}

interface SetProvider {
  type: "set_provider";
  provider?: ProviderInterface;
}

interface SetConnector {
  type: "set_connector";
  connector?: Connector;
}

interface SetError {
  type: "set_error";
  error: Error;
}

type Action = SetAccount | SetProvider | SetConnector | SetError;

function reducer(
  state: StarknetManagerState,
  action: Action
): StarknetManagerState {
  switch (action.type) {
    case "set_account": {
      return { ...state, account: action.account, wallet: action.wallet };
    }
    case "set_provider": {
      return { ...state, library: action.provider ?? defaultProvider };
    }
    case "set_connector": {
      return { ...state, connector: action.connector };
    }
    case "set_error": {
      return { ...state, error: action.error };
    }
    default: {
      return state;
    }
  }
}

interface UseStarknetManagerProps {
  defaultProvider?: ProviderInterface;
  connectors?: Connector[];
  autoConnect?: boolean;
}

export function useStarknetManager({
  defaultProvider: userDefaultProvider,
  connectors: userConnectors,
  autoConnect,
}: UseStarknetManagerProps): StarknetState {
  const connectors = userConnectors ?? [];
  const [state, dispatch] = useReducer(reducer, {
    library: userDefaultProvider ? userDefaultProvider : defaultProvider,
    connectors,
  });

  const { account, library, error, wallet } = state;

  const connect = useCallback((connector: Connector) => {
    connector.connect().then(
      (account) => {
        dispatch({
          type: "set_account",
          account: account.address,
          wallet: connector.options,
        });
        dispatch({ type: "set_provider", provider: account });
        dispatch({ type: "set_connector", connector });
      },
      (err) => {
        console.error(err);
        dispatch({ type: "set_error", error: new ConnectorNotFoundError() });
      }
    );
  }, []);

  const disconnect = useCallback(() => {
    if (!state.connector) return;
    state.connector.disconnect().then(
      () => {
        dispatch({
          type: "set_account",
          account: undefined,
          wallet: undefined,
        });
        dispatch({ type: "set_provider", provider: undefined });
        dispatch({ type: "set_connector", connector: undefined });
      },
      (err) => {
        console.error(err);
        dispatch({ type: "set_error", error: new ConnectorNotFoundError() });
      }
    );
  }, [state.connector]);

  useEffect(() => {
    async function tryAutoConnect(connectors: Connector[]) {
      // Autoconnect priority is defined by the order of the connectors.
      for (let i = 0; i < connectors.length; i++) {
        try {
          const connector = connectors[i];
          if (!(await connector.ready())) {
            // Not already authorized, try next.
            continue;
          }

          const account = await connector.connect();
          dispatch({
            type: "set_account",
            account: account.address,
            wallet: connector.options,
          });
          dispatch({ type: "set_provider", provider: account });
          dispatch({ type: "set_connector", connector });

          // Success, stop trying.
          return;
        } catch {
          // no-op, we continue trying the next connectors.
        }
      }
    }

    if (autoConnect && !account) {
      tryAutoConnect(connectors);
    }
  }, []);

  return { account, connect, disconnect, connectors, library, error, wallet };
}
