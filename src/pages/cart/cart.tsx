import React, {useCallback, useEffect} from 'react';
import '../../styles/styles.scss';
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Table from "@material-ui/core/Table/Table";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from "../../components/button/button";
import {config} from "../../config";
import {Article, Cart as CartType} from "../../types";
import {useLocation} from "react-router-dom";
import {getArticlesByVendor} from "../../api/articles";


interface Props {
    readonly cart: CartType[],
    readonly total: number,
    readonly articles: Article[],
    addArticleQuantity: (id: string) => void,
    removeArticleFromCart: (id: string) => void,
    subtractArticleQuantity: (id: string) => void,
    addArticleToCart?: (article: Article, quantity: number) => void


}


const Cart: React.FC<Props> = ({addArticleQuantity, removeArticleFromCart, articles, addArticleToCart, subtractArticleQuantity, cart, total}) => {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const vendorCodes = query.getAll("vendorCode");
    const quantity = query.getAll("quantity");

    useEffect(() => {
        memoizedCallback();

    }, []);

    const memoizedCallback = useCallback(
        () => {
            vendorCodes.map((vendorCode: string, id: number)=> {
                return getArticlesByVendor(vendorCode)
                    .then((res: any) => {
                        //@ts-ignore
                        addArticleToCart(res.data[0], Number(quantity[id]));
                    });
            });
            window.history.pushState('', '', "/cart");

        },
        [addArticleToCart, vendorCodes, quantity],
    );


    const removeFromCart = (id: string) => {
        removeArticleFromCart(id)

    };

    const increment = (id: string) => {
        addArticleQuantity(id);
    };


    const decrement = (id: string) => {
        subtractArticleQuantity(id)
    };

    return (
        <div className="cart">
            <div className="title">
                Cart
            </div>
            <TableContainer component={Paper} className="table-container">
                <Table aria-label="simple table">
                    <TableBody>
                        {cart.map((row: CartType) => (
                            <TableRow className="table-row" key={row.article.uuid}>
                                <TableCell component="th" scope="row">
                                    <img src={config.STATIC_HOST + "/" + row.article.image_path + "?resize=xsmall"}
                                         style={{width: "3.13vw", height: "3.13vw"}}
                                         alt={row.article.image_path}/>
                                </TableCell>
                                <TableCell align="left" className="cell">{row.article.name}</TableCell>
                                <TableCell style={{width: 100}} className="cell"
                                           align="left"><span>Price: </span>50</TableCell>
                                <TableCell style={{width: 140}} className="cell"
                                           align="left">
                                    <span>Quantity: </span>
                                    <RemoveIcon id={row.article.uuid} className="remove-icon"
                                                onClick={() => decrement(row.article.uuid)}/>
                                    {row.quantity}
                                    <AddIcon id={row.article.uuid} className="add-icon"
                                             onClick={() => increment(row.article.uuid)}/>
                                </TableCell>
                                <TableCell className="cell"
                                           align="left"><span>{row.article.vendor_code}</span></TableCell>
                                <TableCell style={{width: 116}} className="cell"
                                           align="right"><span>In total: </span>{row.total}</TableCell>
                                <TableCell className="cell" align="right"><CloseIcon style={{fontSize: "1.5vw"}}
                                                                                     id={row.article.uuid}
                                                                                     onClick={() => removeFromCart(row.article.uuid)}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} className="table-container-mobile">
                <Table aria-label="simple table">
                    <TableBody>
                        {cart.map((row: CartType) => (
                            <TableRow className="table-row" key={row.article.uuid}>
                                <TableCell component="th" scope="row">
                                    <div className="row-item">
                                        <img src={config.STATIC_HOST + "/" + row.article.image_path + "?resize=xsmall"}
                                             style={{width: 60, height: 60}}
                                             alt={row.article.image_path}/>
                                        <h2>{row.article.name}</h2>
                                        <CloseIcon
                                            id={row.article.uuid}
                                            onClick={() => removeFromCart(row.article.uuid)}/>
                                    </div>
                                    <div className="row-item"><span>Price: </span><h1>{row.article.length} WZT</h1>
                                    </div>
                                    <div className="row-item">
                                        <span>Quantity: </span>
                                        <div className="counter">
                                            <RemoveIcon id={row.article.uuid} className="remove-icon"
                                                        onClick={() => decrement(row.article.uuid)}/>
                                            <h1>{row.quantity}</h1>
                                            <AddIcon id={row.article.uuid} className="add-icon"
                                                     onClick={() => increment(row.article.uuid)}/>
                                        </div>
                                    </div>
                                    <div className="row-item"><span>{row.article.vendor_code}</span></div>
                                    <div className="row-item"><span>In total: </span><h1>{row.total} WZT</h1></div>


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="cart-footer">
                <div className="container">
                    <div className="item">
                        <p>Subtotal</p>
                        <h1>WZT {total}</h1>
                    </div>
                    <div className="item">
                        <p>Shipping</p>
                        <h1>Free</h1>
                    </div>
                    <div className="item">
                        <p>Shipping to</p>
                        <h1>Hrodna,Belarus</h1>
                    </div>
                    <div className="item">
                        <p>Cart totals</p>
                        <h1>WZT {total}</h1>
                    </div>
                </div>
            </div>
            <div className="checkout-button">
                <Button
                    color="red"
                    size="large static">
                    <AddShoppingCartIcon style={{fontSize: 18}}/>
                    PROCEED TO CHECKOUT
                </Button>
            </div>

        </div>
    );
};

export default Cart;