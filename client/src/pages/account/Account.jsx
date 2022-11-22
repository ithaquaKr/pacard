import { useRef, useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import * as React from 'react';
import storage from "../../firebase";
import { logout } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";


import axios from "axios";
import "./account.scss";
//import Icon
import LockIcon from '@mui/icons-material/Lock';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

//Hide / Show password
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


//ListTab
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

///DeleteAccount Tab
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";



export default function Account() {


  const Id = JSON.parse(window.localStorage.getItem('user'))._id;
  const {dispatch } = useContext(AuthContext);

  const history = useNavigate();
  const metadata = {
    contentType: 'image/jpeg'
  };
  ///Update Avatar
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const upload = (items) => {
    items.forEach((item) => {
    const fileName = new Date().getTime() + item.label + item.file.name;
    // const uploadTask = storage.ref(`/avatar/${fileName}`).put(item.file);
    const storageRef = ref(storage, `/avatar/${fileName}` + item.file);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setAvatar(url);
        });
      }
    );
   });
  };
  const handleUploadAvatar = (e) => {
    e.preventDefault();
    upload([
      { file: file, label: "file" },
    ]);
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    if(avatar!==null){
      try {
        await axios.put("/api/users/" + Id, {avatar }, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        alert("Update Avatar Success, Please re-login to update your avatar")
      } catch (err) {
      }
    }
  };
  // Edit Profile
  /////// Change username / email
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  const usernameRef = useRef();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setUsername(usernameRef.current.value);
    if(email!==""){
      try {
        await axios.put("/api/users/" + Id, { email, username }, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        alert("Update Profile Success, Please re-login to display change")
      } catch (err) {
      }
    }
  };


  // Show/Hide Password
  const [showPassword, setshowPassword] = React.useState(false);

  const handleShowPassword = () => {
    if(showPassword === true){
      setshowPassword(false);
    } else {
      setshowPassword(true);
    }
  };

  //ChangePassword
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const renewpasswordRef = useRef();

  const handleChangePassword = async (e) =>{
    e.preventDefault();
    if(passwordRef.current.value === renewpasswordRef.current.value){
      setPassword(passwordRef.current.value);
      if(password !== ""){
        try {
          await axios.put("/api/users/" + Id, { password }, {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          alert("Success");
        } catch (err) {
        }
    }
    } else {
      alert("Re-enter password is not correct!!")
    }
  }

  //Delete Account
  const handleDelete = async (e) =>{
    e.preventDefault();
    try {
      await axios.delete("/api/users/" + Id, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(logout());
      history.push("/");

    } catch (err) {
      alert(err);
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /////////////////////////
  //Animation tab

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  ///////////////////////////

  return (
    <div className="account">
      <div className="account-container">
        <div className="account-top">
          <img src={JSON.parse(window.localStorage.getItem('user')).avatar} alt="" className="account-info-img" />
          <div className="account-top-title">
            Account Settings
          </div>
        </div>
        <div className="account-bottom">
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component={'span'} className="account-bottom-items">
              Edit Profile
            </Typography>
            <Typography component={'span'} className="account-bottom-items2">Update your profile infomation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} >
            <div className="edit-forms">
              <div className="avatar-field">
                <img src={JSON.parse(window.localStorage.getItem('user')).avatar} alt="" className="avatar-img"/>
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}/>
                {!avatar?
                <input type="button" className="btn-upload-ava" defaultValue="Upload" onClick={handleUploadAvatar}/>:
                <input type="button" className="btn-upload-ava-save" defaultValue="Save" onClick={handleUpdateAvatar}/>}
              </div>
              <div className="profile-field">
                <div className="edit-field">
                  <AccountCircleIcon className="icon-edit"/>
                  <input type="text" placeholder="New Username" ref={usernameRef}/>
                </div>
                <div className="edit-field">
                  <EmailIcon className="icon-edit"/>
                  <input type="text" placeholder="New Email" ref={emailRef}/>
                </div>
                <input type="button" className="btn-edit" defaultValue="Save" onClick={handleUpdateProfile}/>
              </div>
            </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography component={'span'} className="account-bottom-items">
              Change Password
            </Typography>
            <Typography component={'span'} className="account-bottom-items2">
              Change password to secure your account
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} className="account-bottom-items-detail">
              <li>
              After a successful password update, you will be redirected to the login page where you can log in with your new password.
              </li>
            </Typography>
            <div className="changepas-forms">
            <div className="changepas-field">
              <LockIcon className="icon-pas"/>
              <input type={ (showPassword) ? "text" : "password"} placeholder="New Password" ref={passwordRef}/>
              <button className="icon-show-pass" onClick={handleShowPassword}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon/>}
              </button>
            </div>
            <div className="changepas-field">
              <LockIcon className="icon-pas"/>
              <input type={ (showPassword) ? "text" : "password"} placeholder="Re-enter New Password" ref={renewpasswordRef}/>
              <button className="icon-show-pass" onClick={handleShowPassword}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon/>}
              </button>
            </div>
            <input type="submit" className="btn-changepas" defaultValue="Change" onClick={handleChangePassword}/>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography component={'span'} className="account-bottom-items">Report!</Typography>
            <Typography component={'span'} className="account-bottom-items2">
                Send report for us to fix your problem soon
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'}>
            <div className="report-forms">
            <div className="report-field">
              <TextSnippetIcon className="icon-pas"/>
              <textarea placeholder="Your problem?"/>
            </div>
            <input type="submit" className="btn-report" defaultValue="Report"/>
            </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography component={'span'} className="account-bottom-items-d">Delete</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} className="account-bottom-items-detail">
              <h3>
              Deleting an account has the following effects:
              </h3>
              <li>
              Certain user content will be moved to a system-wide "Ghost User" in order to maintain content for posterity. For further information, please refer to the user account deletion documentation.
              </li>
              <li>
              5 personal projects will be removed and cannot be restored.
              </li>
            </Typography>
            <button className="account-delete-button" onClick={handleClickOpen}>
              Delete
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you really want to delete your account?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                There are still many new features waiting for you. :((
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus sx={{color: "red"}}>
                  DELETE
                </Button>
              </DialogActions>
            </Dialog>
          </AccordionDetails>
        </Accordion>
        </div>
      </div>
    </div>
  );
}
