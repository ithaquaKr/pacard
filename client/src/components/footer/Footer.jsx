import React from 'react';
import './footer.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    
    return (
        <footer>
            <div className='footer_logo'>AMILab</div>
            <div className="footer_disc">
                <small> AMILab is an online platform that helps users to learn, note your task and find many document.</small>
            </div>
            <div className="footer_socials">
                <a href="http://facebook.com"><FacebookIcon/></a>
                <a href="http://instagram.com"><InstagramIcon/></a>
                <a href="http://twitter.com"><TwitterIcon/></a>
            </div>
            <div className="footer_copyright">
                <small> &copy; AMILab. All rights reserved.</small>
            </div>
        </footer>
    );
};


export default Footer;