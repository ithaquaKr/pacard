import * as React from 'react';


import { useContext, useState } from "react";
import { createTodo } from "../../context/todoContext/apiCalls";
import { TodoContext } from "../../context/todoContext/TodoContext";

import "./newtask.scss"

import AddCircleIcon from '@mui/icons-material/AddCircle';

// Design Dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const statusOption = [
    {
        value: 'TO LEARN',
        label: 'TO LEARN',
    },
    {
        value: 'LEARNING',
        label: 'LEARNING',
    },
    {
        value: 'LEARNED',
        label: 'LEARNED',
    },
  ];


export default function Newtask() {

    // Dialog function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
     };

    // Create new task
    const [todo, setTodo] = useState(null);
  
    const { dispatch } = useContext(TodoContext);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setTodo({ ...todo, [e.target.name]: value });
    };
    

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        createTodo(todo, dispatch);
        setOpen(false);
      } catch (err) {
      }
    };
    

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{color: 'green'}} endIcon={<AddCircleIcon sx={{ height: 54, width: 54, }} />} ></Button>  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the infomation about your task to note it~!
          </DialogContentText>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Title"
            type="text"
            name='title'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="outlined-textarea"
            label="Infomation"
            type="text"
            name='info'
            onChange={handleChange}
            fullWidth
            multiline
            />
          <TextField
            id="outlined-select"
            select
            label="Status"
            name='status'
            onChange={handleChange}
            defaultValue=''
            helperText="Please select your task status!"
            margin="normal"
            fullWidth
            >
            {statusOption.map((option) => (
                <MenuItem key={option.value} value={option.value} >
                {option.label}
                </MenuItem>
            ))}
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'red'}}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{color: 'green'}}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
