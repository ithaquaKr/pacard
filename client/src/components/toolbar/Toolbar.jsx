import "./toolbar.scss";
import * as React from 'react';

//Import Icon
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from '@mui/icons-material/Search';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DataUsageIcon from '@mui/icons-material/DataUsage';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import {logout} from "../../context/authContext/AuthActions";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Toolbar = () => {

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const name = JSON.parse(window.localStorage.getItem('user')).username;
  // const mail = JSON.parse(window.localStorage.getItem('user')).email;
  const avatar = JSON.parse(window.localStorage.getItem('user')).avatar;

  return (
    <>
    <div className="toolbar">
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{
            height: 1,
            right: 13,
          }} >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={avatar} variant="rounded" sx={{ ml: 0.8, width: 28, height: 28 }}/>
          </StyledBadge>
          {/*<Avatar alt="Huong" src="/images/default-ava.png" variant="rounded"/>*/}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => navigate("/account")}>
            <AccountCircleIcon sx={{color: "#191919"}}/>
            <Typography textAlign="center" color="#191919" variant="caption" sx={{ pl: 1 }}>
              Tài khoản
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(logout())}>
            <ExitToAppIcon sx={{color: "#191919"}}/>
            <Typography textAlign="center" color="#191919" variant="caption" sx={{ pl: 1 }}>
              Đăng xuất
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

    <ul className="tool-list">

      <li>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <i><DashboardIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Bảng điều khiển</span>
      </li>

      <li>
        <Link to="/learn" style={{ textDecoration: "none" }}>
          <i><LightbulbIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Học từ mới</span>
      </li>

      <li>
        <Link to="/practice" style={{ textDecoration: "none" }}>
          <i><DriveFileRenameOutlineIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Ôn tập</span>
      </li>

      <li>
        <Link to="/library" style={{ textDecoration: "none" }}>
          <i><LocalLibraryIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Thư viện</span>
      </li>

      <li>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <i><DataUsageIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Kết quả học tập</span>
      </li>

      <li>
        <Link to="#" style={{ textDecoration: "none" }}>
          <i><SearchIcon className="icon" onClick={handleClickOpen}/>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Tìm kiếm"
                type="email"
                fullWidth
                variant="standard"
              />
              <img alt="" src="images/bg-left.png"/>
              <DialogContentText variant="caption">
                Để tìm kiếm thẻ, bộ thẻ mà bạn mong muốn, vui lòng nhập từ khóa liên quan vào hộp thoại dưới đây.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ĐÓNG</Button>
              <Button onClick={handleClose}>TÌM KIẾM</Button>
            </DialogActions>
          </Dialog>
          </i>
        </Link>
        <span className="tooltip">Tìm kiếm</span>
      </li>

    </ul>
    <ul className="tool-footer">
      <li>
        <Link to="#" style={{ textDecoration: "none" }}>
          <i><NotificationsIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Thông báo</span>
      </li>

      <li>
        <Link to="/info" style={{ textDecoration: "none" }}>
          <i><HelpIcon className="icon"/></i>
        </Link>
        <span className="tooltip">Thông tin</span>
      </li>
    </ul>
  </div>
  </>
  );
};

export default Toolbar;
