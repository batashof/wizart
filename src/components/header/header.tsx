import React, {useEffect, useRef, useState} from 'react';

import '../../styles/styles.scss';
import {ReactComponent as Logo} from './../../assets/logo.svg';
import {ReactComponent as Menu} from './../../assets/menu.svg';
import {ReactComponent as LogoMobile} from './../../assets/logo-mobile.svg';
import {ReactComponent as Catalog} from '../../assets/wallpaper_icon.svg';
import {ReactComponent as Cart} from './../../assets/cart.svg';
import {ReactComponent as AppStore} from './../../assets/app.svg';
import {ReactComponent as AppStoreMobile} from './../../assets/app-mobile.svg';
import SearchIcon from '@material-ui/icons/Search';
import {Link, useHistory} from "react-router-dom";
import AppStoreModal from "../app-store-modal/app-store-modal";
import Modal from 'react-modal';
import CloseIcon from '@material-ui/icons/Close';
import {useLocation} from "react-router";
import EntryPoint from "../web-deployment-kit/entry-point/entry-point"
import {config} from "../../config";


interface Props {
    searchArticle: (searchValue: string) => void,
    articlesInCartNumber: number,
    getArticlesBySearch: (searchValue: any, page: number) => void,
    readonly page: number,
    setArticlePage: (page: number) => void



}

const Header: React.FC<Props> = ({searchArticle, articlesInCartNumber, getArticlesBySearch, page, setArticlePage}) => {
    const customStyles = {
        overlay: {
            background: "rgba(0, 0, 0, 0.75)",
            zIndex: 100
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "100%",
            height: "100%",
            padding: 0,
        }
    };

    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const path: string = useLocation().pathname;


    openMenu || open ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getArticlesBySearch(searchValue, page);
        }

        // return () => {
        //     setSortArticles([]);
        // }

    }, [getArticlesBySearch, searchValue, page]);

    const onChange = (value: boolean) => {
        setOpen(value);
    };

    let history = useHistory();

    const handleChange = (event: any) => {
        // console.log(event.target.value)

        setSearchValue(event.target.value);
        setArticlePage(1);
        history.push("/")

    };
    const menuItemClass: string = `menu-item ${path === "/home" || path === "/" ? "selected" : ""}`;

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/home">
                        <Logo/>
                    </Link>
                </div>

                <div className="logo-mobile">
                    <Link to="/home">
                        <LogoMobile/>
                    </Link>
                </div>
                <div className="menu">
                    <Link to="/home" className={menuItemClass}>
                        Catalog
                    </Link>
                    <a href="https://www.wizart.tech/" className="menu-item not-selected">
                        About Us
                    </a>
                </div>
                <div onClick={() => setOpen(true)} className="app-link">
                    <AppStore/>
                    <span>Mobile App</span>
                </div>
                <div className="search">
                    <SearchIcon fontSize="small" style={{marginRight: 10}}/>
                    <input placeholder="Search articles" onChange={handleChange}/>
                </div>

                {/*<Button onClick={() => openFittingRoom()}*/}
                {/*color="red"*/}
                {/*size="small static">*/}
                {/*<Catalog className="icon"/>*/}
                {/*FITTING ROOM*/}
                {/*</Button>*/}

                    <EntryPoint
                        apiToken={config.TOKEN}
                        title="FITTING ROOM"
                        tooltipPosition="bottom"
                        tooltipTitle="Click to try decoration materials in your own interior"
                        width="129px"
                        height="36px"
                        fontSize="10px"
                        borderRadius="30px"
                        className="entry-point"
                    >
                        <Catalog/>
                    </EntryPoint>
               {/*<div className="cart-and-menu">*/}
                <Link to="/cart" className="cart">
                    <Cart/>
                    <div className="number">
                        {articlesInCartNumber}
                    </div>
                </Link>
                <Menu onClick={() => setOpenMenu(true)} className="menu-mobile"/>
               {/*</div>*/}
            </div>

            <Modal
                isOpen={openMenu}
                ariaHideApp={false}
                style={customStyles}
                contentLabel="Modal"
            >
                <CloseIcon style={{float: "right"}} fontSize={"small"} onClick={() => setOpenMenu(false)}/>
                <div className="modal-container" onClick={() => setOpenMenu(false)}>
                    <Link to="/home" className="modal-item">
                        Catalog
                    </Link>
                    <a href="https://www.wizart.tech/" className="modal-item">
                        About Us
                    </a>
                    <div onClick={() => setOpen(true)} className="modal-app-link">
                        App <AppStoreMobile/>
                    </div>
                </div>

            </Modal>
            <AppStoreModal onChange={onChange} open={open}/>
        </header>
    );
};


export default Header;