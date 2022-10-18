import { useContext, useState, useRef, useEffect } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";


//Import icon
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import "./auth.scss";


export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { dispatch, error, isFetching } = useContext(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();
      login({ username, password }, dispatch);
  };
  
  const history = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const avatarRef = "/images/default-ava.png";

  const handleFinish = async (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    setAvatar(avatarRef);
    if(email!==""){
      try {
        await axios.post("/api/auth/register", { email,username, password, avatar });
        history.push("/");
      } catch (err) {
      }
    }
  };

  //Animation
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    });
  });

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <div className="logo-ami">
              <img src="/images/whatlogo.png" alt="" />
              <div className="logo-title">
                AMILab
              </div>
            </div>
            <form className="sign-in-form">
              <h2 className="title">SIGN IN</h2>
              <div className="input-field">
                <AccountCircleIcon className="icon"/>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-field">
                <LockIcon className="icon"/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
 
              </div>
              <input type="submit" value="Sign In" className="btn solid" onClick={handleLogin} />
                {error &&  <Stack sx={{ width: '45%' }}>
                  <Alert severity="error">Something Wrong?!</Alert>
                </Stack>}
                {isFetching && <Box sx={{ width: '50%' }}>
                  <LinearProgress />
                </Box>}
            </form>
            <form className="sign-up-form">
            <h2 className="title">SIGN UP</h2>
            <div className="input-field">
              <EmailIcon className="icon"/>
              <input type="email"  placeholder="Email" ref={emailRef} />
            </div>
            <div className="input-field">
              <AccountCircleIcon className="icon"/>
              <input type="text" placeholder="Username" ref={usernameRef} />
            </div>
            <div className="input-field">
              <LockIcon className="icon"/>
              <input type="password" placeholder="Password" ref={passwordRef} />
          
            </div>
            <input type="submit" className="btn" value="Sign Up" onClick={handleFinish} />
          </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Don't have an account yet?</h3>
              <p>
                Vậy thì còn chần chờ gì nữa mà không đăng ký ngay để có những trải nghiệm tuyệt vời cùng AMILab
              </p>
                <button className="btn transparent" id="sign-up-btn" >
                  Sign Up Now!
                </button>
            
            </div>
            <img src="/images/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
            <h3>Already have account?</h3>
            <p>
                Đăng nhập ngay để trải nghiệm những tính năng tuyệt vời của AMILab
            </p>
                <button className="btn transparent" id="sign-in-btn">
                    Sign In Now!
                </button>
            </div>
            <img src="/images/register.svg" className="image" alt=""/>
        </div>
        </div>
      </div>
    </>
  );
}
