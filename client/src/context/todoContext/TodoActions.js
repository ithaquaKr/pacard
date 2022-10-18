export const getTodosStart = () => ({
  type: "GET_TODOS_START",
});

export const getTodosSuccess = (todos) => ({
  type: "GET_TODOS_SUCCESS",
  payload: todos,
});

export const getTodosFailure = () => ({
  type: "GET_TODOS_FAILURE",
});

export const createTodoStart = () => ({
  type: "CREATE_TODO_START",
});

export const createTodoSuccess = (todo) => ({
  type: "CREATE_TODO_SUCCESS",
  payload: todo,
});

export const createTodoFailure = () => ({
  type: "CREATE_TODO_FAILURE",
});

export const updateTodoStart = () => ({
  type: "UPDATE_TODO_START",
});

export const updateTodoSuccess = (id, todo) => ({
  type: "UPDATE_TODO_SUCCESS",
  payload: todo,id
});

export const updateTodoFailure = () => ({
  type: "UPDATE_TODO_FAILURE",
});

export const deleteTodoStart = () => ({
  type: "DELETE_TODO_START",
});

export const deleteTodoSuccess = (id) => ({
  type: "DELETE_TODO_SUCCESS",
  payload: id,
});

export const deleteTodoFailure = () => ({
  type: "DELETE_TODO_FAILURE",
});
