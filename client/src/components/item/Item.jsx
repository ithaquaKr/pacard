import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


//Import Icon
import DeleteIcon from '@mui/icons-material/Delete';


///Delete Tab
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Import edit task tab
import Edittask from "../../components/edittask/Edittask"

import { useContext} from "react";
import { TodoContext } from "../../context/todoContext/TodoContext";
import { deleteTodo } from "../../context/todoContext/apiCalls";

export default function Item(props) {
  const { dispatch } = useContext(TodoContext);
  


  const colors = [
    {
        primaryColor : "#5D93E1",
        secondaryColor : "#ECF3FC"
    },
    {
        primaryColor : "#F9D288",
        secondaryColor : "#FEFAF1"
    },
    {
        primaryColor : "#5DC250",
        secondaryColor : "#F2FAF1"
    },
    {
        primaryColor : "#F48687",
        secondaryColor : "#FDF1F1"
    },
    {
        primaryColor : "#B964F7",
        secondaryColor : "#F3F0FD"
    }
  ]
  const useColor = colors[Math.floor(Math.random()*colors.length)];

  const reData = props.dataFromParent;
  // Delete Task
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDelete = (id) => {
    deleteTodo(id, dispatch);
    setOpen(false);
  };
  // const statusColor = "";
    
  // switch(props.dataFromParent.status) {
  //   case "TO LEARN":   
  //   statusColor = "#F48687";
  //   case "LEARNING":   
  //   statusColor = "#5D93E1";
  //   case "LEARNED": 
  //   statusColor = "#5DC250";
  //   default:      
  //   statusColor = "";
  // }
  
  return (
    <Card sx={{ maxWidth: 325 }}>
      <Box sx={{
        width: 325,
        height: 5,
        backgroundColor: useColor.primaryColor,
        '&:hover': {
          backgroundColor: useColor.secondaryColorColor,
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      />
      <CardContent>
        <Button size="normal" 
          sx = {{ 
            color: 'black', 
            backgroundColor: useColor.secondaryColor, 
            borderRadius: 4, 
            '&:hover': {
              backgroundColor: useColor.secondaryColor,
            },
            fontSize: 18,
            marginBottom: 2,
          }}>
            {props.dataFromParent.title}
          </Button>
        <Typography variant="body2" color="text.secondary" 
          sx={{ 
            height: 80,
            marginLeft: 1,
          }}>
          {props.dataFromParent.info}
        </Typography>
          { props.dataFromParent.status === "TO LEARN" &&
        <Button size="normal" 
          sx = {{ 
            color: 'white', 
            backgroundColor:  "#F48687", 
            borderRadius: 4, 
          '&:hover': {
            backgroundColor:  "#F48687", 
            opacity: [0.9, 0.8, 0.7],
          },}}>
          {props.dataFromParent.status}
        </Button> }
        { props.dataFromParent.status === "LEARNING" &&
        <Button size="normal" 
          sx = {{ 
            color: 'white', 
            backgroundColor:  "#5D93E1", 
            borderRadius: 4, 
          '&:hover': {
            backgroundColor:  "#5D93E1", 
            opacity: [0.9, 0.8, 0.7],
          },}}>
          {props.dataFromParent.status}
        </Button> }
        { props.dataFromParent.status === "LEARNED" &&
        <Button size="normal" 
          sx = {{ 
            color: 'white', 
            backgroundColor:  "#5DC250", 
            borderRadius: 4, 
          '&:hover': {
            backgroundColor:  "#5DC250", 
            opacity: [0.9, 0.8, 0.7],
          },}}>
          {props.dataFromParent.status}
        </Button> }
      </CardContent>
      <CardActions>
        <Edittask dataFromParent= {reData}/>
        <Button size="small" startIcon={<DeleteIcon />} sx = {{color: 'red'}}
          onClick={handleClickOpen}>
          DELETE</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Your action cannot be undone!!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={() => handleDelete(props.dataFromParent._id)} autoFocus sx={{color: "red"}}>
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
