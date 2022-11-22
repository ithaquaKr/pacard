import "./learn.scss";
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

import CardItem from "../../components/cardItem/CardItem"

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

  const initCard = {
    "card": {
      "front": "",
      "back": "",
      "img": "",
      "level": 0,
    }
  }
  const { sets, dispatch } = useContext(SetContext);

  const [currentSet, setCurrentSet] = React.useState(initSet);

  const [currentCard, setCurrentCard] = React.useState(initCard);



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
      field: "card",
      headerName: "Tên Thẻ",
      headerAlign: 'center',
      width: 200,
      editable: false,
      sortable: true,
      filterable: true,
      renderCell: (params) => {
        return (
          // <div className="documentListItem">
          //   {params.row.title}
          // </div>
          <CardItem dataFromParent={params.row}/>
        );
      },
    },
    { field: "level", headerName: "Cấp độ", width: 120 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "desc", headerName: "Mô tả", width: 180 ,editable: false,
    sortable: true,
    filterable: true,},

    {
      field: "action",
      headerName: "Thao tác",
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
                {"Bạn có muốn xóa thẻ này?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Thao tác này sẽ không thể hoàn tác!!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCardDelete}>HỦY</Button>
                <Button onClick={() => handleCardDelete(set_id, params.row._id)} autoFocus sx={{color: "red"}}>
                  XÓA
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
            Học thẻ mới
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Danh sách bộ thẻ" />
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
          {/*<div className="home-info">*/}
          {/*  <div className="home-info-items">*/}
          {/*     <span>🔴  Tên bộ thẻ: {currentSet.set.title}</span>*/}
          {/*  </div>*/}
          {/*  <div className="home-info-items">*/}
          {/*     <span>🟠  Mô tả: {currentSet.set.desc}</span>*/}
          {/*  </div>*/}
          {/*  <div className="home-info-items">*/}
          {/*     <span>🟡  Chủ đề: {currentSet.set.classify.map((tag) => (*/}
          {/*       tag + ", "*/}
          {/*     ))}</span>*/}
          {/*  </div>*/}
          {/*  <div className="home-info-items">*/}
          {/*     <span>🟢  Tác giả: {currentSet.set.uploadBy}</span>*/}
          {/*  </div>*/}
          {/*  <div className="home-info-items">*/}
          {/*    <span>⚪  Đánh giá: {currentSet.set.rating.star} ⭐ </span>*/}
          {/*  </div>*/}
          {/*  <div className="home-info-items">*/}
          {/*    <span>🟤  Trạng thái: {(currentSet.set.shared ? "Công khai" : "Riêng tư")} </span>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
