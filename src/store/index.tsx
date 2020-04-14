import React, { createContext, Dispatch, useReducer } from 'react';

import globalReducer, { State, Action, initialState } from './global';

const StoreContext = createContext({} as { state: State; dispatch: Dispatch<Action> });

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider };
