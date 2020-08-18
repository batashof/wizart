import {connect} from 'react-redux';
import Cart from "./cart";
import {
    addArticleQuantity,
    addArticleToCart,
    removeArticleFromCart,
    subtractArticleQuantity
} from "../../store/cart/actions";


const mapStateToProps = (store: any) => ({
    cart: store.cart.cart,
    total: store.cart.total,
    articles: store.articles.articles,



});

const mapDispatchToProps = {
    addArticleQuantity,
    removeArticleFromCart,
    subtractArticleQuantity,
    addArticleToCart

};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
