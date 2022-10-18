import TodoReducer from "./TodoReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  todos: [],
  isFetching: false,
  error: false,
};

export const TodoContext = createContext(INITIAL_STATE);

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, INITIAL_STATE);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
