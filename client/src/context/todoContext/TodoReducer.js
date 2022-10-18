const TodoReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS_START":
      return {
        todos: [],
        isFetching: true,
        error: false,
      };
    case "GET_TODOS_SUCCESS":
      return {
        todos: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_TODOS_FAILURE":
      return {
        todos: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_TODO_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_TODO_SUCCESS":
      return {
        todos: [...state.todos, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_TODO_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPLOAD_TODO_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_TODO_SUCCESS":
      return {
        todos: state.todo.map(
          (todo) => todo._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPLOAD_TODO_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "DELETE_TODO_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_TODO_SUCCESS":
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_TODO_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default TodoReducer;
