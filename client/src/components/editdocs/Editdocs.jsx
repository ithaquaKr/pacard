import * as React from 'react';


import { useContext, useState } from "react";
import { updateDocument } from "../../context/documentContext/apiCalls";
import { DocumentContext } from "../../context/documentContext/DocumentContext";

import "./editdocs.scss"


// Design Dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

const classifyOptions = [
    {
        value: 'Bài giảng',
        label: 'Bài giảng',
    },
    {
        value: 'Bài báo - Tạp chí',
        label: 'Bài báo -  Tạp chí',
    },
    {
        value: 'E-Book Chuyên ngành',
        label: 'E-Book Chuyên ngành',
    },
    {
        value: 'Đề tài khoa học',
        label: 'Đề tài khoa học',
    },
    {
        value: 'Luận án- Luận văn',
        label: 'Luận án- Luận văn',
    },
    {
        value: 'Sách',
        label: 'Sách',
    },
    {
        value: 'Truyện - Tiểu thuyết',
        label: 'Truyện - Tiểu thuyết',
    },
  ];


export default function Editdocs(props) {

    // Dialog function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
     };

    // Document to create new document
    const [document, setDocument] = useState(null);
  
    const { dispatch } = useContext(DocumentContext);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setDocument({ ...document, [e.target.name]: value });
    };
    

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        updateDocument(props.dataFromParent._id, document, dispatch);
        setOpen(false);
      } catch (err) {
      }
    };
    

  return (
    <div>
      <button className="documentListEdit" onClick={handleClickOpen}>
          Edit
        </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit your document, please text in here then click UPDATE button to update your document. 
          </DialogContentText>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Title"
            placeholder={props.dataFromParent.title}
            type="text"
            name='title'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="outlined-textarea"
            label="Description"
            placeholder={props.dataFromParent.desc}
            type="text"
            name='desc'
            onChange={handleChange}
            fullWidth
            multiline
            />
          <TextField 
            margin="normal"
            id="outlined-basic"
            label="Year"
            placeholder={props.dataFromParent.year}
            type="text"
            name='year'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Classify"
            name='classify'
            defaultValue=''
            onChange={handleChange}
            helperText="Please select your document classify"
            margin="normal"
            fullWidth
            >
            {classifyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            <TextField
                margin="normal"
                id="outlined-basic"
                label="Author"
                placeholder={props.dataFromParent.author}
                type="text"
                name='author'
                fullWidth
                onChange={handleChange}
            />  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'red'}}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{color: 'green'}}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
