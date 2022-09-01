import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

type WrappedProps = { children: ReactNode };
type Dispatch = { type: string; payload: unknown };
type ContextType = {
  state: { links: [] };
  dispatch: (action: Dispatch) => { links: [] };
};

const AppContext = createContext<ContextType | null>(null);

function reducer(state: any, action: any) {
  switch (action.type) {
    case "addLink": {
      return { links: [action.payload, ...state.links] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function AppContextWrapper({ children }: WrappedProps) {
  const [state, dispatch] = useReducer(reducer, { links: [] });
  const appContextValue: any = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useLinkDispatcher() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useLinkDispatcher must be used within AppContextWrapper");
  }
  return context;
}
