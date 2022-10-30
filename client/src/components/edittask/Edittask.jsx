import * as React from 'react';


import { useContext, useState } from "react";
import { updateCard } from "../../context/cardContext/apiCalls";
import { CardContext } from "../../context/cardContext/CardContext";

import "./edittask.scss"


// Design Dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

//Icon
import EditIcon from '@mui/icons-material/Edit';


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


export default function Edittask(props) {

    // Dialog function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
     };

    // Create new task
    const [card, setCard] = useState(null);

    const { dispatch } = useContext(CardContext);

    const handleChange = (e) => {
      const value = e.target.value;
      setCard({ ...card, [e.target.name]: value });
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        updateCard(props.dataFromParent._id, card, dispatch);
        setOpen(false);
      } catch (err) {
      }
    };


  return (
    <div>
      <Button size="small" startIcon={<EditIcon />} onClick={handleClickOpen}>
          EDIT</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
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
            id="outlined-select-currency"
            select
            label="Status"
            name='status'
            onChange={handleChange}
            helperText="Please select your task status!"
            margin="normal"
            defaultValue=''
            fullWidth
            >
            {statusOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'red'}}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{color: 'green'}}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
