import * as React from 'react';

import Grid from '@mui/material/Grid';

// Import Item
import MemberCard from "../../components/memberCard/MemberCard"
import Footer from "../../components/footer/Footer"
import "./info.scss";

const Info = () => {

  // const members = [
  //   {
  //       id   : "1",
  //       name : "Nguyen Tuan Hiep",
  //       role : "Product Owner",
  //       info : "Huh ?",
  //       avatar: "https://firebasestorage.googleapis.com/v0/b/ptit-learn-app.appspot.com/o/member%2FTuanHiep.JPG?alt=media&token=2a04129f-b63a-476d-ad92-bfd3adf0ed34"
  //   },
  //   {
  //       id   : "2",
  //       name : "Phan Duc Anh",
  //       role : "Software Developer",
  //       info : "#Hehe ?",
  //       avatar: "https://firebasestorage.googleapis.com/v0/b/ptit-learn-app.appspot.com/o/member%2FDucAnh.jpg?alt=media&token=b486c4e0-5f0c-4fef-a51d-f06f571ddd9e"
  //   },
  //   {
  //       id   : "3",
  //       name : "Nguyen Van Tung",
  //       role : "Software Tester",
  //       info : "#Heh ?",
  //       avatar: "https://firebasestorage.googleapis.com/v0/b/ptit-learn-app.appspot.com/o/member%2FVanTung.jpg?alt=media&token=0a4e1eca-7766-4ce1-b3ba-0e1dae24752c"
  //   },
  //   {
  //       id   : "4",
  //       name: "Nguyen Cong Dung",
  //       role : "Product Designer",
  //       info : "#wut ?",
  //       avatar: "https://firebasestorage.googleapis.com/v0/b/ptit-learn-app.appspot.com/o/member%2FCongDung.jpg?alt=media&token=223ac899-96b2-490a-b669-cdb988d9bf3c"
  //   },
  //   {
  //       id   : "5",
  //       name: "Doan Van Hung",
  //       role : "Content Creator",
  //       info : "#why ?",
  //       avatar: "https://firebasestorage.googleapis.com/v0/b/ptit-learn-app.appspot.com/o/member%2FVanHung.jpg?alt=media&token=c4ac6cb7-5f05-48d9-91cf-273de10108ec"
  //   },
  // ]



  return (
    <div className="aboutus">
      <div className="aboutus-container">
      {/*<div className="aboutus-top">*/}
      {/*    /!* <img src="images/bg-left.png" alt="" className="info-img" /> *!/*/}
      {/*    <div className="aboutus-title">*/}
      {/*      PACARD*/}
      {/*    </div>*/}

      {/*</div>*/}
              <Footer/>

      {/* <div className="ourteam">
          <div className="ourteam-title">
            OUR TEAM
          </div>
      </div> */}
      <div className="aboutus-bottom">
        <div className="member-list">
          {/*<Grid item xs={6}>*/}
          {/*    <Grid container justifyContent="center" spacing={6}>*/}
          {/*      {members.map((value, idx) => (*/}
          {/*        <Grid value={value} key={value.id} item>*/}
          {/*          <MemberCard dataFromParent={value}/>*/}
          {/*        </Grid>*/}
          {/*      ))}*/}
          {/*    </Grid>*/}
          {/*</Grid>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
