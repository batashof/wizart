import {connect} from 'react-redux';
import Article from "./article";
import {getArticleById} from "../../api/articles";
import {getRooms} from "../../api/rooms";
import {addArticleToCart} from "../../store/cart/actions";


const mapStateToProps = (store: any) => ({
    article: store.articles.article,
    rooms: store.rooms.rooms,
    searchValue: store.articles.searchValue,


});

const mapDispatchToProps = {
    getArticleById,
    getRooms,
    addArticleToCart


};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
