import CardReducer from "./CardReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  cards: [],
  isFetching: false,
  error: false,
};

export const CardContext = createContext(INITIAL_STATE);

export const CardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CardReducer, INITIAL_STATE);

  return (
    <CardContext.Provider
      value={{
        cards: state.cards,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
