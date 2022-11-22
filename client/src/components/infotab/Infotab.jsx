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
    sx={{ width: 500 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    >
     <div className="item-container">
      <div className="item-top">
        <InfoIcon className="item-icon"/>
          <div className="item-title">
            Thông tin thẻ
          </div>
      </div>
      <div className="item-bottom">
        <div className="item-info">
            <div className="info-key">Tên thẻ:</div>
            <span className="info-value">{props.dataFromParent.title}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Mô tả:</span>
            <span className="info-value">{props.dataFromParent.desc}</span>
        </div>
        <div className="item-info">
            <span className="info-key">Cấp độ:</span>
            <span className="info-value">{props.dataFromParent.level}</span>
        </div>
          <div className="item-info">
            <span className="info-key">Hình ảnh:</span>
            <img src = {props.dataFromParent.img} alt=""/>
            {/*<span className="info-value">{props.dataFromParent.img}</span>*/}
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
            Chi tiết
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
