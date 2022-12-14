import "./home.scss";
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import { useContext, useEffect } from "react";
import { SetContext } from "../../context/setContext/SetContext"
import { getAllSetsUser, deleteSet, deleteCard } from "../../context/setContext/apiCalls";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Import new document tab
// import AddCard from "../../components/newdocs/AddCard"

// Import Create Set tab
import CreateSet from "../../components/createSet/CreateSet";

// Import Update Set tab
import UpdateSet from "../../components/updateSet/UpdateSet";

// Import info tab
import Infotab from "../../components/infotab/Infotab";

// Immport Addcard tab
import AddCard from "../../components/addCard/AddCard"

// Import Read tab
// import Readdocs from "../../components/readdocs/Readdocs";

// Import Edit tab
// import Editdocs from "../../components/editdocs/Editdocs";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Home = () => {

  const initSet = {
    "set": {
      "title": "",
      "classify": [],
      "desc": "",
      "rating": "",
      "uploadBy": "",
      "cards": []
  }
  }

  const { sets, dispatch } = useContext(SetContext);

  const [currentSet, setCurrentSet] = React.useState(initSet);

  useEffect(() => {
    getAllSetsUser(dispatch);
  }, [dispatch]);


  const handleSetChoose = (value) => {
    setCurrentSet(value);
  };

  const set_id = currentSet.set._id;

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [openCardDelete, setOpenCardDelete] = React.useState(false);

  const handleOpenCardDelete = () => {
    setOpenCardDelete(true);
  };

  const handleCloseCardDelete = () => {
    setOpenCardDelete(false);
  };

  const handleCardDelete = (set_id, id) => {
    deleteCard(set_id, id, dispatch);
    setOpenSetDelete(false);
  };

  const [openSetDelete, setOpenSetDelete] = React.useState(false);

  const handleOpenSetDelete = () => {
    setOpenSetDelete(true);
  };

  const handleCloseSetDelete = () => {
    setOpenSetDelete(false);
  };

  const handleSetDelete = (id) => {
    deleteSet(id, dispatch);
    setOpenSetDelete(false);
  };

  const columns = [
    {
      field: "front",
      headerName: "M???t tr?????c",
      headerAlign: 'center',
      width: 200,
      editable: false,
      sortable: true,
      filterable: true,
      renderCell: (params) => {
        return (
          <div className="documentListItem">
            {params.row.front}
          </div>
        );
      },
    },
    { field: "back", headerName: "M???t sau", width: 180 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "level", headerName: "C???p ?????", width: 180 ,editable: false,
    sortable: true,
    filterable: true,},
    {
      field: "action",
      headerName: "Thao t??c",
      headerAlign: 'center',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {/*<Readdocs dataFromParent={params.row} />*/}
            <Infotab dataFromParent={params.row}/>
            {/*<Editdocs dataFromParent={params.row} />*/}
            <DeleteOutlineIcon
              className="documentListDelete"
              onClick={handleOpenCardDelete}
            />
            <Dialog
              open={openCardDelete}
              onClose={handleCloseCardDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"B???n c?? mu???n x??a th??? n??y?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Thao t??c n??y s??? kh??ng th??? ho??n t??c!!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCardDelete}>H???Y</Button>
                <Button onClick={() => handleCardDelete(set_id, params.row._id)} autoFocus sx={{color: "red"}}>
                  X??A
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
    },
  ];


  return (
    <div className="home">
      <List
        sx={{ width: '100%', maxWidth: 240, height: '100%', minHeight: "100vh", bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Thao t??c
          </ListSubheader>
        }
      >
        <ListItemButton>
          <CreateSet/>
          <ListItemText primary="T???o b??? th???" />
        </ListItemButton>
        <ListItemButton>
          <UpdateSet dataFromParent= {currentSet.set}/>
          <ListItemText primary="S???a b??? th???" />
        </ListItemButton>
        <ListItemButton>
          <Button onClick={handleOpenSetDelete} sx={{color: 'red'}} endIcon={<DeleteIcon sx={{ height: 24, width: 24, }} />} ></Button>
          <ListItemText primary="X??a b??? th???" />
        </ListItemButton>
        <Dialog
            open={openSetDelete}
            onClose={handleCloseSetDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"C???nh b??o ?????? ?????? ??????"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                B???n ??ang x??a b??? th??? {currentSet.set.title}.
                Thao t??c n??y s??? kh??ng th??? ho??n t??c!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSetDelete}>H???Y</Button>
              <Button onClick={() => handleSetDelete(currentSet.set._id)} autoFocus sx={{color: "red"}}>
                X??A
              </Button>
            </DialogActions>
          </Dialog>
          <ListItemButton>
            <AddCard dataFromParent= {currentSet.set}/>
            <ListItemText primary="Th??m th??? m???i" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Danh s??ch b??? th???" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {sets.map((set) => (
              <ListItemButton sx={{ pl: 4 }} onClick={() => handleSetChoose({set})}>
                <ListItemText >{set.title}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      <div className="home-container">
        <div className="home-top">
          <div className="home-info">
            <div className="home-info-items">
               <span>????  T??n b??? th???: {currentSet.set.title}</span>
            </div>
            <div className="home-info-items">
               <span>????  M?? t???: {currentSet.set.desc}</span>
            </div>
            <div className="home-info-items">
               <span>????  Ch??? ?????: {currentSet.set.classify.map((tag) => (
                 tag + ", "
               ))}</span>
            </div>
            <div className="home-info-items">
               <span>????  T??c gi???: {currentSet.set.uploadBy}</span>
            </div>
            <div className="home-info-items">
              <span>???  ????nh gi??: {currentSet.set.rating.star} ??? </span>
            </div>
            <div className="home-info-items">
              <span>????  Tr???ng th??i: {(currentSet.set.shared ? "C??ng khai" : "Ri??ng t??")} </span>
            </div>
          </div>
        </div>
        <div className="home-bottom">
          <div className="datatable-data">
            <DataGrid
              rows={currentSet.set.cards}
              disableSelectionOnClick
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5,10,15]}
              checkboxSelection
              getRowId={(e) => e._id}
              rowHeight={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
