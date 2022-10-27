import React from 'react';
import './footer.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';

const Footer = () => {
    
    return (
        <footer>
            {/* <div className='footer_logo'>PACARD</div> */}
            <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "inline-block",
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PACARD
          </Typography>
            <div className="footer_disc">
                <small> PACARD is an online platform that helps users to learn, note your task and find many document.</small>
            </div>
            <div className="footer_socials">
                <a href="http://facebook.com"><FacebookIcon/></a>
                <a href="http://instagram.com"><InstagramIcon/></a>
                <a href="http://twitter.com"><TwitterIcon/></a>
            </div>
            <div className="footer_copyright">
                <small> &copy; PACARD. All rights reserved.</small>
            </div>
        </footer>
    );
};


export default Footer;