import * as React from 'react';


import { useContext, useState } from "react";
import storage from "../../firebase";
import { createDocument } from "../../context/documentContext/apiCalls";
import { DocumentContext } from "../../context/documentContext/DocumentContext";


import Processbutton from "../../components/processbutton/Processbutton"

import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from "react-router-dom";

import "./newdocs.scss"



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


export default function Newdocs() {
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
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(0);
  
    const history = useNavigate();
  
    const { dispatch } = useContext(DocumentContext);
  
    const handleChange = (e) => {
      const value = e.target.value;
      setDocument({ ...document, [e.target.name]: value });
    };
    
    const upload = (items) => {
      items.forEach((item) => {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setDocument((prev) => {
                return { ...prev, [item.label]: url };
              });
              setUploaded((prev) => prev + 1);
            });
          }
        );
      });
    };
  
    const handleUpload = (e) => {
      e.preventDefault();
      upload([
        { file: file, label: "file" },
      ]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        createDocument(document, dispatch);
        history.push("/mydocuments");
        setOpen(false);
      } catch (err) {
      }
    };
    

  return (
    <div>
      <Button variant="outlined" 
      sx={{ color: 'white', border: 'none', backgroundColor: 'green' }}
      onClick={handleClickOpen}>
        New Document
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
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
            label="Description"
            placeholder="Text your description about your document"
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
                type="text"
                name='author'
                fullWidth
                onChange={handleChange}
            />
            <div className="addFileItem">
                <label>File</label>
                <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
                />
                {uploaded === 1 ? (
                <button className="addCreateFileBtn">
                <DoneAllIcon />
                </button>
                ) : (
                <div className="addUploadBtn" onClick={handleUpload}>
                <Processbutton/>
                </div>
            )}
            </div>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
