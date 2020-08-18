import React, {FunctionComponent} from 'react';
import '../../styles/styles.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const Footer: FunctionComponent = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="element">
                    <div className="title">
                        Address
                    </div>
                    <div className="text">
                        Popovicha, 2B Grodno,<br/> Belarus, 230024
                    </div>

                </div>

                <div className="element">
                    <div className="title">
                        Contacts
                    </div>
                    <div className="text">
                        +375336219017<br/> contact@wizart.tech
                    </div>

                </div>
                <div className="element">
                    <div className="title">

                    </div>
                    <div className="text">
                        <a href="https://www.facebook.com/wizart.tech" target="_blank" rel="noopener noreferrer"><FacebookIcon color="primary"/></a>
                        <a href="https://www.linkedin.com/company/wizart-tech/" target="_blank" rel="noopener noreferrer"><LinkedInIcon
                            style={{color: "#0077b5"}}/></a>
                    </div>

                </div>

                <div className="copyright">
                    © Copyright 2019 - All right reserved - Wizart
                </div>

            </div>

        </footer>
    );
};


export default Footer;