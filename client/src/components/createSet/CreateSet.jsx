import * as React from 'react';


import { useContext, useState } from "react";
import { createSet } from "../../context/setContext/apiCalls";
import { SetContext } from "../../context/setContext/SetContext";

import "./createSet.scss"

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

const ClassifyOption = [
  {
    value: 'Động vật',
    label: 'Động vật',
  },
  {
    value: 'Con người',
    label: 'Con người',
  },
  {
    value: 'Âm nhạc',
    label: 'Âm nhạc',
  },
];

const SharedOption = [
  {
    value: true,
    label: 'Công khai'
  },
  {
    value: false,
    label: 'Riêng tư'
  }
]

export default function CreateSet() {

    // Dialog function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
     };

    // Create new task
    const [set, setSet] = useState(null);

    const { dispatch } = useContext(SetContext);

    const handleChange = (e) => {
      const value = e.target.value;
      setSet({ ...set, [e.target.name]: value });
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        createSet(set, dispatch);
        setOpen(false);
      } catch (err) {
      }
    };


  return (
    <div>
      <Button onClick={handleClickOpen} sx={{color: 'green'}} endIcon={<AddCircleIcon sx={{ height: 24, width: 24, }} />} ></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo bộ thẻ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập đầy đủ các thông tin dưới đây để tạo bộ thẻ của bạn.!
          </DialogContentText>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Tiêu đề"
            type="text"
            name='title'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="outlined-textarea"
            label="Mô tả"
            type="text"
            name='desc'
            onChange={handleChange}
            fullWidth
            multiline
            />
          <TextField
            id="outlined-select"
            select
            label="Chủ đề"
            name='classify'
            onChange={handleChange}
            defaultValue=''
            helperText="Vui lòng chọn chủ đề của bộ thẻ!"
            margin="normal"
            fullWidth
            >
            {ClassifyOption.map((option) => (
                <MenuItem key={option.value} value={option.value} >
                {option.label}
                </MenuItem>
            ))}
            </TextField>
          <TextField
            id="outlined-select"
            select
            label="Chia sẻ"
            name='shared'
            onChange={handleChange}
            defaultValue=''
            helperText="Bạn có muốn chia sẻ bộ thẻ của mình cho mọi người"
            margin="normal"
            fullWidth
            >
            {SharedOption.map((option) => (
                <MenuItem key={option.value} value={option.value} >
                {option.label}
                </MenuItem>
            ))}
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'red'}}>Hủy</Button>
          <Button onClick={handleSubmit} sx={{color: 'green'}}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
