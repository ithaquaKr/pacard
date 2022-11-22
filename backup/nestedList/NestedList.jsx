import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useContext, useEffect } from "react";
import { SetContext } from "../../client/src/context/setContext/SetContext"
import { getAllSetsUser } from "../../client/src/context/setContext/apiCalls";

const NestedList = () => {
  const { sets, dispatch } = useContext(SetContext);

  useEffect(() => {
    getAllSetsUser(dispatch)
  }, [dispatch]);


  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 240, height: '100%', minHeight: "100vh", bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Danh sách
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Đang học" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Danh sách bộ thẻ" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sets.map((set) => (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText>{set.title}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default NestedList;
