import React, {useEffect, useState} from 'react';
import '../../styles/styles.scss'
import {openSpecificFittingRoom} from "../../scripts/wizart-integration";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ImageViewer from "../../components/image-viewer/image-viewer";
import Button from "../../components/button/button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs/Breadcrumbs";
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {ReactComponent as CatalogMedium} from './../../assets/catalog-medium.svg';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import Fab from "@material-ui/core/Fab/Fab";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {SnackbarOrigin} from "@material-ui/core/Snackbar";
import {apply} from "../../api/apply";
import {postRoom, removeRoom} from "../../api/rooms";
import {connect} from "react-redux";
import {Article as ArticleT, Room} from "../../types";
import { getArticleByName} from "../../api/articles";
import {config} from "../../config";
import EntryPoint from "../../components/web-deployment-kit/entry-point/entry-point";
import FloatingButton from "../../components/web-deployment-kit/floating-button/floating-button";


export interface State extends SnackbarOrigin {
    open: boolean;
}

interface Props {
    getRooms: () => void,
    addArticleToCart: (article: ArticleT, quantity: number) => void,
    readonly rooms: Room[]
}

const Article: React.FC<Props> = ({rooms, getRooms, addArticleToCart}) => {

    const initArticleState = {
        uuid: "",
        vendor_code: "",
        image_path: "",
        name: "",
        width: 0,
        length: 0,
        availability: "",
        link: "",
        find_store_action: "",
        add_to_cart_action: "",
        layout: "",
        regular_price: 0,
        promotional_price: "",
        rapport: 0,
        rapport_unit_uuid: "",
        rapport_shift: 0,
        rapport_shift_unit_uuid: "",
        width_unit_uuid: "",
        length_unit_uuid: "",
        main_color_uuid: "",
        texture_uuid: "",
        coating_uuid: "",
        basis_uuid: "",
        waterproofness_uuid: "",
        lightproofness_uuid: "",
        kind_of_removal_uuid: "",
        reverse_180: false,
        mural: false,
        type: {}
    };

    const [quantity, setQuantity] = useState(1);
    const [appliedRoom, setAppliedRoom] = useState("");
    const [loading, setLoading] = useState(false);
    //@ts-ignore
    const [article, setArticle] = useState<ArticleT>(initArticleState);
    const {id} = useParams();
    console.log(id)
    console.log("id ")

    const handleChange = (event: any) => {
        setLoading(true);
        postRoom(event.target.files[0])
            .then(() => {
                setLoading(false);
                getRooms();

            })
    };


    const deleteRoom = (id: string) => {
        setLoading(true);
        removeRoom(id)
            .then(() => {
                setLoading(false);
                getRooms();
            })
    };

    const applyWallpaper = (room: Room) => {
        setLoading(true);
        apply(room, article)
            .then((appliedRoom: any) => {
                setAppliedRoom(appliedRoom.data);
                setLoading(false);
            })

    };

    useEffect(() => {

        rooms.map((item: any, id: number) => {
            return item.focused = id === 0;
        });
        getArticleByName(id!)
            .then((article: ArticleT) => {
                console.log(article)
                setArticle(article);
                if (rooms.length !== 0) {
                    apply(rooms[0], article)
                        .then((appliedRoomValue: any) => {
                            setAppliedRoom(appliedRoomValue.data)
                        })
                }
            });

        window.scrollTo(0, 0);

    }, [id, rooms]);

    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const handleClick = (newState: SnackbarOrigin) => () => {
        addArticleToCart(article, quantity)
        setState({open: true, ...newState});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };


    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const {vertical, horizontal, open} = state;


    return (
        <div className="article">
            <div className="grid">
                <div className="left-item">
                    <ImageViewer article={article} rooms={rooms} appliedRoom={appliedRoom}
                                 addImageEvent={handleChange} deleteRoomEvent={deleteRoom} loading={loading}
                                 applyWallpaper={applyWallpaper}/>
                </div>

                <div className="right-item">
                    <div className="breadcrumbs">
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
                            <Link to="/home">
                                CATALOG
                            </Link>
                            <Link to="/">
                                BRAND NAME
                            </Link>
                            <Link to="/">
                                COLLECTION
                            </Link>
                        </Breadcrumbs>
                        <div className="arrows">
                            <div className="arrow"><ArrowBackIcon/></div>
                            <div className="arrow"><ArrowForwardIcon/></div>
                        </div>
                    </div>
                    <h1 className="title">
                        {article.name}
                    </h1>
                    {/*<Button className="button-fitting-room"*/}
                            {/*onClick={() => openSpecificFittingRoom(article.vendor_code)}*/}
                            {/*color="red"*/}
                            {/*size="large">*/}
                        {/*<Catalog width="0.9vw" height="0.9vw"/>*/}
                        {/*Try it in your room!*/}
                    {/*</Button>*/}
                    <div className="price">
                        WZT 50.00
                    </div>
                    <div className="number">
                        Avalaibility:
                        <p>IN STOCK (5)</p>
                    </div>
                    <div className="code">
                        Product code:
                        <p>#565fvf34</p>
                    </div>
                    <div className="button-quantity">
                        <RemoveIcon className="remove-icon"
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}/>
                        {quantity}
                        <AddIcon className="add-icon" onClick={() => setQuantity(quantity + 1)}/>
                        <Button onClick={handleClick({vertical: 'bottom', horizontal: 'right'})}
                                color="white"
                                size="medium">
                            <AddShoppingCartIcon style={{fontSize: "0.9vw", color: "#FA5961"}}/>
                            ADD TO CART
                        </Button>
                    </div>
                    <div className="button-quantity-mobile">
                        <div className="icon-bg"><RemoveIcon className="remove-icon"
                                                             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}/>
                        </div>
                        {quantity}
                        <div className="icon-bg"><AddIcon className="add-icon"
                                                          onClick={() => setQuantity(quantity + 1)}/>
                        </div>
                        <Button onClick={handleClick({vertical: 'bottom', horizontal: 'right'})}
                                color="white"
                                size="small static">
                            <AddShoppingCartIcon style={{fontSize: "16px", color: "#FA5961"}}/>
                            ADD TO CART
                        </Button>
                    </div>
                </div>
                <div className="bottom-item">
                    <div className="grid-bottom">
                        <input defaultChecked id="tab1" type="radio" name="pct"/>
                        <input id="tab2" type="radio" name="pct"/>
                        <EntryPoint
                            apiToken={config.TOKEN}
                            vendorCode={article.vendor_code}
                            title="Try it in your room!"
                            tooltipTitle="Click to try this article in your own interior"
                            tooltipPosition="bottom"
                            width="46vw"
                            className="article-catalog-button"
                        />
                        <FloatingButton
                            apiToken={config.TOKEN}
                            title="Try it in your room!"
                            vendorCode={article.vendor_code}
                            tooltipPosition="bottom"
                            // width="46vw"
                            compact={true}
                            className="article-catalog-button-mobile"
                        />
                        <div className="tabs"><label htmlFor="tab1" className="tab1">Product
                            Description</label><label htmlFor="tab2" className="tab2">Order</label></div>
                        <div className="grid-tab1">

                            <div className="description">
                                Simply beautiful and modern wallpapers is a fantastic way to add colour and design
                                in to your home. Use on one or multiple walls for a quick and dramatic
                                transformation.
                                Classification: Washable, Satisfactory Lightfastness, Wet Removable.
                                Always read and adhere to the manufacturer’s labels for instruction.
                            </div>
                            <div className="item">
                                <p>Roll:</p>
                                <h3> 10.05 x 0.53 Meter </h3>
                            </div>
                            <div className="item">
                                <p>Room Type:</p>
                                <h3> Bedroom</h3>
                            </div>
                            <div className="item">
                                <p>Style:</p>
                                <h3> Modern</h3>
                            </div>
                            <div className="item">
                                <p>Upper material:</p>
                                <h3> Non-woven </h3>
                            </div>
                            <div className="item">
                                <p>Basis:</p>
                                <h3> Flizelin </h3>
                            </div>
                            <div className="item">
                                <p>Application Type:</p>
                                <h3> Non-pasted </h3>
                            </div>
                        </div>
                        <div className="grid-tab2">

                            <div className="tab-item">
                                <p>Pick up at the store (1-2 days)</p>
                                <h2>FREE</h2>
                            </div>
                            <div className="tab-item">
                                <p>Pick up at the store (1-2 days)</p>
                                <h2>30 BYR</h2>
                            </div>
                            <div className="tab-item">
                                <p>Delivery in Belarus (1-2 days)</p>
                                <h2>30 BYR</h2>
                            </div>
                            <div className="tab-item">
                                <p>Shipping to</p>
                                <h2>Hrodna, Belarus</h2>
                            </div>
                        </div>
                        <Fab onClick={() => openSpecificFittingRoom("article.vendor_code")} size="medium"
                             aria-label="add" className="button-catalog">
                            <CatalogMedium/>
                        </Fab>
                    </div>

                </div>
                <div/>
            </div>
            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{vertical, horizontal}}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    Item successfully added to your cart!
                </Alert>
            </Snackbar>
        </div>
    );
};


const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Article);
