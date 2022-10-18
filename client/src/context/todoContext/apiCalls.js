import axios from "axios";
import {
  createTodoFailure,
  createTodoStart,
  createTodoSuccess,
  updateTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
  deleteTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  getTodosFailure,
  getTodosStart,
  getTodosSuccess,
} from "./TodoActions";

export const getTodos = async (dispatch) => {
  dispatch(getTodosStart());
  try {
    const res = await axios.get("/api/todo", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getTodosSuccess(res.data));
  } catch (err) {
    dispatch(getTodosFailure());
  }
};

//create
export const createTodo = async (todo, dispatch) => {
  dispatch(createTodoStart());
  try {
    const res = await axios.post("/api/todo", todo, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createTodoSuccess(res.data));
  } catch (err) {
    dispatch(createTodoFailure());
  }
};

//update
export const updateTodo = async (id, todo, dispatch) => {
  dispatch(updateTodoStart());
  try {
    const res = await axios.put("/api/todo/" + id, todo, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateTodoSuccess(res.data));
  } catch (err) {
    dispatch(updateTodoFailure());
  }
};


//delete
export const deleteTodo = async (id, dispatch) => {
  dispatch(deleteTodoStart());
  try {
    await axios.delete("/api/todo/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteTodoSuccess(id));
  } catch (err) {
    dispatch(deleteTodoFailure());
  }
};
