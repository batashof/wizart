import {connect} from 'react-redux';
import Main from "./main";
import {getArticles} from "../../api/articles";
import {setArticlePage} from "../../store/articles/actions";


const mapStateToProps = (store: any) => ({
    articles: store.articles.articles,
    articlesLoading: store.articles.articlesLoading,
    searchValue: store.articles.searchValue,
    page: store.articles.page,
    numOfPages: store.articles.numOfPages


});

const mapDispatchToProps = {
    getArticles,
    setArticlePage

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
