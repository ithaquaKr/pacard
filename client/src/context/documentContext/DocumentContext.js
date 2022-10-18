import DocumentReducer from "./DocumentReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  documents: [],
  isFetching: false,
  error: false,
};

export const DocumentContext = createContext(INITIAL_STATE);

export const DocumentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DocumentReducer, INITIAL_STATE);

  return (
    <DocumentContext.Provider
      value={{
        documents: state.documents,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
