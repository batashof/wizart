import {Article} from '../../types'

export const APPLY_ARTICLE_TO_ROOM = 'APPLY_ARTICLE_TO_ROOM';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLE_BY_ID_SUCCESS = 'GET_ARTICLE_BY_ID_SUCCESS';
export const APPLY_PENDING = 'APPLY_PENDING';
export const SEARCH_ARTICLE = 'SEARCH_ARTICLE';
export const ARTICLES_LOADING = 'ARTICLES_LOADING';
export const ARTICLE_BY_ID_LOADING = 'ARTICLE_BY_ID_LOADING';
export const SET_ARTICLE_PAGE = 'SET_ARTICLE_PAGE';




export const searchArticle = (searchValue: string) => {
    return {
        type: SEARCH_ARTICLE,
        payload: searchValue
    }
};
export const setArticlePage = (page: number) => {
    return {
        type: SET_ARTICLE_PAGE,
        payload: page
    }
};

export const getArticlesSuccess = (articles: any) => {
    return {
        type: GET_ARTICLES_SUCCESS,
        payload: articles.data,
        numOfPages: articles.meta.last_page
    }
};

export const articlesLoading = () => {
    return {
        type: ARTICLES_LOADING
    }
};


