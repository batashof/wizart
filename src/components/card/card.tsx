import React from 'react';
import '../../styles/styles.scss'
import CardUI from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {ReactComponent as CartIcon} from './../../assets/cart-icon1.svg';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import {ReactComponent as CatalogMedium} from './../../assets/catalog-medium.svg';
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {Link} from "react-router-dom";
import {config} from "../../config";
import {Article} from "../../types";
import EntryPoint from "../web-deployment-kit/entry-point/entry-point";

interface Props {
    readonly article: Article;
    readonly nextArticle: Article;
    readonly prevArticle: Article;
    addArticleToCart?: (article: Article, quantity: number) => void
}

export interface State extends SnackbarOrigin {
    open: boolean;
}

const Card: React.FC<Props> = ({article, addArticleToCart, nextArticle, prevArticle}) => {
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const [dot, setDot] = React.useState("none");
    const handleClick = (newState: SnackbarOrigin) => () => {
        //@ts-ignore
        addArticleToCart(article, 1);
        setState({open: true, ...newState});
        setDot("inline")
    };

    const handleClose = () => {
        setState({...state, open: false});
    };

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const {vertical, horizontal, open} = state;
    const link = `/article/${article.name}`;
    // const linkNext = `/article/${article.uuid}`;
    // const linkPrev = `/article/${article.uuid}`;
    return (
        <CardUI className="card">
            <EntryPoint
                apiToken={config.TOKEN}
                title="SEE IT IN MY ROOM"
                vendorCode={article.vendor_code}
                borderRadius="50%"
                tooltipTitle="Click to try this article in your own interior"
                className="catalog"
            >
                <CatalogMedium width="1vw" height="1vw"/>
            </EntryPoint>
            <Link to={link}>

                <CardMedia
                    className="media"
                    image={config.STATIC_HOST + "/" + article.image_path}
                    title="Paella dish"
                />
            </Link>
            <CardContent className="content">


                <Typography className="name" color="textSecondary">
                    {article.name.length > 30 ? article.name.slice(0, 27) + "..." : article.name}
                </Typography>
                <div className="bottom-content">
                    <Typography className="price" color="textSecondary">
                        WZT 50.00
                    </Typography>
                    <button onClick={handleClick({vertical: 'bottom', horizontal: 'right'})}
                            className="card-button">
                        <p>Add</p>
                        <CartIcon className="card-button-icon"/>
                        <div style={{display: dot}} className="card-button-dot"/>
                    </button>
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
            </CardContent>

        </CardUI>
    );
};

export default Card;