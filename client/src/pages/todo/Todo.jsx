import * as React from 'react';

import "./todo.scss";
import Grid from '@mui/material/Grid';
// import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TodoContext } from "../../context/todoContext/TodoContext";
import { getTodos } from "../../context/todoContext/apiCalls";

// Import new task tab
import Newtask from "../../components/newtask/Newtask"

// Import Item
import Item from "../../components/item/Item"


export default function MydocumentList() {
  const { todos, dispatch } = useContext(TodoContext);

  
  // Get Task
  useEffect(() => {
    getTodos(dispatch);
  }, [dispatch]);

  return (
    <div className="todolist">
      <div className="todolist-container">
      <div className="todolist-top">
        <img src="images/bg-left.png" alt="" className="todolist-img" />
          <div className="todolist-title">
            Todo List
          </div>
          </div>
        <div className="new-document">
          <Newtask/>
        </div>
        <div className="todolist-bottom">
          <div className="todolist-data">
            <Grid item xs={6}>
              <Grid container justifyContent="center" spacing={8}>
                {todos.map((value, idx) => (
                  <Grid value={value} key={value._id} item>
                    <Item dataFromParent={value}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
