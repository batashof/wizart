import {connect} from 'react-redux';
import Card from "./card";
import {addArticleToCart} from "../../store/cart/actions";


const mapStateToProps = (store: any) => ({




});

const mapDispatchToProps = {
    addArticleToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
