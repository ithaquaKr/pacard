import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import InfoIcon from '@mui/icons-material/Info';

import "./infotab.scss"

export default function Infotab(props) {
const [state, setState] = React.useState({
    right: false,
});

const toggleDrawer = (anchor, open) => (event) => {
    if (
    event &&
    event.type === 'keydown' &&
    (event.key === 'Tab' || event.key === 'Shift')
    ) {
    return;
    }

    setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
    <Box
    sx={{ width: 300 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    >
     <div className="item-container">
      <div className="item-top">
        <InfoIcon className="item-icon"/>
          <div className="item-title">
            Infomation
          </div>
      </div>
      <div className="item-bottom">
        <div className="item-info">
            <div className="info-key">Title:</div>
            <span className="info-value">{props.dataFromParent.title}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Author:</span>
            <span className="info-value">{props.dataFromParent.author}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Year:</span>
            <span className="info-value">{props.dataFromParent.year}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Classify:</span>
            <span className="info-value">{props.dataFromParent.classify}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Description:</span>
            <span className="info-value">{props.dataFromParent.desc}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Upload By:</span>
            <span className="info-value">{props.dataFromParent.uploadby}</span>
        </div>
      </div>
    </div>
    </Box>
);

return (
    <div>
    {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        <button className="documentListEdit" onClick={toggleDrawer(anchor, true)}>
            Info
        </button>
        <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
        >
            {list(anchor)}
        </SwipeableDrawer>
        </React.Fragment>
    ))}
    </div>
);
}
