import { connect } from 'react-redux';
import Header from "./header";
import {searchArticle, setArticlePage} from "../../store/articles/actions";
import {getArticlesBySearch} from "../../api/articles";


const mapStateToProps = (store: any) => ({
    articlesInCartNumber: store.cart.articlesInCartNumber,
    page: store.articles.page,


});

const mapDispatchToProps = {
    searchArticle,
    getArticlesBySearch,
    setArticlePage

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
