import "./sidebar.scss";

//Import Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from '@mui/icons-material/Search';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InfoIcon from '@mui/icons-material/Info';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";


const Sidebar = () => {
  const {dispatch } = useContext(AuthContext);
  const name = JSON.parse(window.localStorage.getItem('user')).username;
  const mail = JSON.parse(window.localStorage.getItem('user')).email;
  const avatar = JSON.parse(window.localStorage.getItem('user')).avatar;

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    closeBtn?.addEventListener("click", ()=>{
      sidebar.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
    });


    searchBtn?.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
        sidebar.classList.toggle("open");
        menuBtnChange(); //calling the function(optional)
    });
      
    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
    if(sidebar.classList.contains("open")){
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    }else {
      closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
    }
    }
  });

  return (
    <>
    <div className="sidebar">
    <div className="logo-details">
        <img src="/images/whatlogo.png" alt="" />
          <Link to="/home" style={{ textDecoration: "none" }} className = "logo_name">
            <div className="logo_name">AMILab</div>
          </Link>
        <i className='bx bx-menu' id="btn"></i>
    </div>
    <ul className="nav-list">
      <li>
          <i className='bx-search' ><SearchIcon className="bx-search-icon"/></i>
         <input type="text" placeholder="Search..."></input>
         <span className="tooltip">Search</span>
      </li>
      <li>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <i><DashboardIcon className="icon"/></i>
            <span className="links_name">Dashboard</span>
          </Link>
         <span className="tooltip">Dashboard</span>
      </li>
      <li>

        <Link to="/mydocuments" style={{ textDecoration: "none" }}>
         <i><DriveFolderUploadIcon className="icon"/></i>
         <span className="links_name">My Documents</span>
        </Link>

       <span className="tooltip">My Documents</span>
     </li>
     <li>
        <Link to="/library" style={{ textDecoration: "none" }}>
          <i><LocalLibraryIcon className="icon"/></i>
          <span className="links_name">Library</span>
        </Link>
       <span className="tooltip">Library</span>
     </li>
     <li>
       <Link to="/todo" style={{ textDecoration: "none" }}>
         <i><FactCheckIcon className="icon"/></i>
         <span className="links_name">Todo List</span>
        </Link>
       <span className="tooltip">Todo</span>
     </li>
     <li>
       <Link to="/account" style={{ textDecoration: "none" }}>
         <i><SettingsIcon className="icon"/></i>
         <span className="links_name">Setting</span>
        </Link>
       <span className="tooltip">Setting</span>
     </li>
     <li className="profile">
         <div className="profile-details">
           <img src={avatar} alt="profileImg"></img>
           <div className="name_job">
             <div className="name">{name}</div>
             <div className="mail">{mail}</div>
           </div>
         <Link to="/auth">
         <i id="log_out" >
           <ExitToAppIcon onClick = { () => dispatch(logout())}/>
         </i>
        </Link>  
         </div>
     </li>
     <li>
        <Link to="/aboutus" style={{ textDecoration: "none" }}>
         <i><InfoIcon className="icon"/></i>
         <span className="links_name">About Us!</span>
        </Link>
       <span className="tooltip">About Us!</span>
     </li>
    </ul>
  </div>
  </>
  );
};

export default Sidebar;
