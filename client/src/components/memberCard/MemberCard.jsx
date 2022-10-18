import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


//Import Icon
import FacebookIcon from '@mui/icons-material/Facebook';
import ContactMailIcon from '@mui/icons-material/ContactMail';


export default function MemberCard(props) {
  
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

  return (
    <Card sx={{ maxWidth: 190 }}>
      <CardMedia
        component="img"
        height="220"
        image={props.dataFromParent.avatar}
        alt=""
      />
      <Box sx={{
        width: 190,
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
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 1,
          }}>
            {props.dataFromParent.name}
          </Button>
        <Button size="normal" 
          sx = {{ 
            color: 'white', 
            backgroundColor: useColor.primaryColor,
            fontSize: 9,
            borderRadius: 4,
            marginBottom: 1,
          '&:hover': {
          backgroundColor: useColor.primaryColor,
          opacity: [0.9, 0.8, 0.7],
        },}}>
          {props.dataFromParent.role}
        </Button> 
        <Typography variant="body2" color="text.secondary" 
          sx={{ 
            height: 40,
            marginLeft: 1,
          }}>
          {props.dataFromParent.info}
        </Typography>
        
      </CardContent>
      <CardActions>
        <FacebookIcon sx={{ marginLeft: 1, color: '#4267B2'}} />
        <ContactMailIcon sx={{ marginLeft: 1, color: '#BB001B'}} />
      </CardActions>
    </Card>
  );
}
