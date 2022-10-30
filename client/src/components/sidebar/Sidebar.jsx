import "./sidebar.scss";

//Import Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from '@mui/icons-material/Search';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
// import { logout } from "../../context/authContext/AuthActions";


const Sidebar = () => {
  const {dispatch } = useContext(AuthContext);
  // const name = JSON.parse(window.localStorage.getItem('user')).username;
  // const mail = JSON.parse(window.localStorage.getItem('user')).email;
  // const avatar = JSON.parse(window.localStorage.getItem('user')).avatar;

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
        <img src="/images/logo.svg" alt="" />
          <Link to="/home" style={{ textDecoration: "none" }} className = "logo_name">
            <div className="logo_name">PACARD</div>
          </Link>
      </div>

    <ul className="nav-list">

      {/*<li>*/}
      {/*  <i className='bx-search' ><SearchIcon className="bx-search-icon"/></i>*/}
      {/*  <input type="text" placeholder="Tìm kiếm ..."></input>*/}
      {/*  <span className="tooltip">Tìm kiếm</span>*/}
      {/*</li>*/}

      <li>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <i><DashboardIcon className="icon"/></i>
          <span className="links_name">Bảng điều khiển</span>
        </Link>
      </li>

      {/*<li>*/}
      {/*  <Link to="/mydocuments" style={{ textDecoration: "none" }}>*/}
      {/*    <i><DriveFolderUploadIcon className="icon"/></i>*/}
      {/*    <span className="links_name">My Documents</span>*/}
      {/*  </Link>*/}
      {/*  <span className="tooltip">My Documents</span>*/}
      {/*</li>*/}

      <li>
        <Link to="/learn" style={{ textDecoration: "none" }}>
          <i><LightbulbIcon className="icon"/></i>
          <span className="links_name">Học từ mới</span>
        </Link>
        <span className="tooltip">Học từ mới</span>
      </li>

      <li>
        <Link to="/practice" style={{ textDecoration: "none" }}>
          <i><DriveFileRenameOutlineIcon className="icon"/></i>
          <span className="links_name">Ôn tập</span>
        </Link>
        <span className="tooltip">Ôn tập</span>
      </li>

      <li>
        <Link to="/library" style={{ textDecoration: "none" }}>
          <i><LocalLibraryIcon className="icon"/></i>
          <span className="links_name">Thư viện</span>
        </Link>
        <span className="tooltip">Thư viện</span>
      </li>



      {/*<li>*/}
      {/*  <Link to="/account" style={{ textDecoration: "none" }}>*/}
      {/*    <i><SettingsIcon className="icon"/></i>*/}
      {/*    <span className="links_name">Setting</span>*/}
      {/*  </Link>*/}
      {/*  <span className="tooltip">Setting</span>*/}
      {/*</li>*/}

      {/*<li className="profile">*/}
      {/*  <div className="profile-details">*/}
      {/*     /!* <img src={avatar} alt="profileImg"></img>*/}
      {/*     <div className="name_job">*/}
      {/*       <div className="name">{name}</div>*/}
      {/*       <div className="mail">{mail}</div>*/}
      {/*     </div> *!/*/}
      {/*    <Link to="/auth">*/}
      {/*      <i id="log_out" >*/}
      {/*        <ExitToAppIcon onClick = { () => dispatch(logout())}/>*/}
      {/*      </i>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</li>*/}

      <li>
        <Link to="/info" style={{ textDecoration: "none" }}>
          <i><InfoIcon className="icon"/></i>
          <span className="links_name">Thông tin</span>
        </Link>
        <span className="tooltip">Thông tin</span>
      </li>

      <i className='bx bx-menu' id="btn"></i>

    </ul>
  </div>
  </>
  );
};

export default Sidebar;
