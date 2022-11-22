import * as React from 'react';


import { useContext, useState } from "react";
import storage from "../../firebase";
import { createCard } from "../../context/setContext/apiCalls";
import { SetContext } from "../../context/setContext/SetContext";
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

import Processbutton from "../processbutton/Processbutton"

import DoneAllIcon from '@mui/icons-material/DoneAll';

import "./addCard.scss"



// Design Dialog
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import MenuItem from '@mui/material/MenuItem';
import NoteAddIcon from "@mui/icons-material/NoteAdd";


export default function AddCard(props) {

    const set_id = props.dataFromParent._id
        // Dialog function
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
     };

    // Document to create new document
    const [card, setCard] = useState(null);
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const { dispatch } = useContext(SetContext);

    const handleChange = (e) => {
      const value = e.target.value;
      setCard({ ...card, [e.target.name]: value });
    };
    const metadata = {
      contentType: 'image/jpeg'
    };
    const upload = (items) => {
      items.forEach((item) => {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/items/${fileName}` + item.file);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        // const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
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
            // uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setCard((prev) => {
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
        { file: file, label: "img" },
      ]);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        createCard(set_id ,card, dispatch);
        setOpen(false);
      } catch (err) {
      }
    };


  return (
    <div>
      <Button onClick={handleClickOpen} sx={{color: 'green'}} endIcon={<NoteAddIcon sx={{ height: 24, width: 24, }} />} ></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm thẻ mới</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập các thông tin cho thẻ mới tại đây.
          </DialogContentText>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Mặt trước"
            type="text"
            name='front'
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            id="outlined-textarea"
            label="Mặt sau"
            placeholder="Vui lòng nhập thông tin mặt sau của thẻ"
            type="text"
            name='back'
            onChange={handleChange}
            fullWidth
            multiline
            />
          <div className="addFileItem">
            <label>Ảnh</label>
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
