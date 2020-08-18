import React, {FunctionComponent, useEffect} from 'react';
import '../../styles/styles.scss';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
import {ReactComponent as AppStore} from './../../assets/appstore.svg';
import QR from './../../assets/QR.png';

import Button from "../button/button";
import Grid from "@material-ui/core/Grid/Grid";

interface Props {
    open?: any;
    onChange?: any;


}

const AppStoreModal: FunctionComponent<Props> = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const appStore: any = process.env.REACT_APP_APP_STORE_LINK;

    useEffect(() => {
        setIsOpen(props.open);

    }, [props.open]);

    const closeModal = () => {
        setIsOpen(false);
        props.onChange(false)
    };
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            contentLabel="Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="app-store-modal">
                <CloseIcon style={{float: "right"}} fontSize={"small"} onClick={closeModal}/>
                <Grid container className="container">
                    <Grid item xs={12} sm={6}>
                        <h1>
                            Wizart wall wizard
                        </h1>
                    </Grid>
                    <Grid item xs={12} sm={6}/>

                    <Grid item xs={12} sm={6} >
                        <img src={QR} alt="QR"/>
                    </Grid>
                    <Grid item xs={12} sm={6} className="item" >
                        <p className="text">
                            Mobile application that allows you to see how your interior will look like with new
                            wallpaper
                            and help you to make a choice!
                        </p>
                        <p className="text-qr">
                            use QR to download apps for iOS
                        </p>
                    </Grid>
                    <Grid item xs={12} className="phone" >
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <Button style={{marginTop: "1vw"}} href={appStore} size="large" color="red">
                            <AppStore/>
                            Go to AppStore
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
};

export default AppStoreModal;