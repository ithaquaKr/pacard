import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import { logout } from "../../context/authContext/AuthActions";
import {Link, redirect, useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Tài khoản', 'Đăng xuất'];

function ResponsiveAppBar() {

  const {dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAccount = (e) => {
    e.preventDefault();
      redirect("/account")
  }


  return (
    <AppBar position="static" sx={{ backgroundColor: '#E4E9F7'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: { md: 'flex'}, justifyContent: 'right'}}>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 3 }}>
                <Avatar alt="" src="/images/avatar/default-ava.png" />
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
                <Typography textAlign="center" >Tài khoản</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>
                <Typography textAlign="center" >Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
