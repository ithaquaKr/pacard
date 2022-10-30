import * as React from 'react';

import "./learn.scss";
import Grid from '@mui/material/Grid';
// import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CardContext } from "../../context/cardContext/CardContext";
import { getCards } from "../../context/cardContext/apiCalls";

// Import icon
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Import new task tab
// import Newtask from "../../components/newtask/Newtask"

// Import Item
import Item from "../../components/item/Item"


export default function Learn() {
  const { cards, dispatch } = useContext(CardContext);


  // Get Task
  useEffect(() => {
    getCards(dispatch);
  }, [dispatch]);

  return (
    <div className="learn">
      <div className="learn-container">
        <div className="learn-top">
          <LightbulbIcon className="learn-img"/>
            <div className="learn-title">
              Learn
            </div>
          </div>
        {/*<div className="new-document">*/}
        {/*  <Newtask/>*/}
        {/*</div>*/}
        <div className="learn-bottom">
          <div className="learn-data">
            <Grid item xs={6}>
              <Grid container justifyContent="center" spacing={8}>
                {cards.map((value, idx) => (
                  <Grid value={value} key={value._id} item>
                    <Item dataFromParent={value}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
