import SetReducer from "./SetReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  sets: [],
  isFetching: false,
  error: false,
};

export const SetContext = createContext(INITIAL_STATE);

export const SetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SetReducer, INITIAL_STATE);

  return (
    <SetContext.Provider
      value={{
        sets: state.sets,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};
