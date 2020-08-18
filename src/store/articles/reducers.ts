import {
    GET_ARTICLES_SUCCESS,
    GET_ARTICLE_BY_ID_SUCCESS,
    APPLY_ARTICLE_TO_ROOM,
    APPLY_PENDING,
    SEARCH_ARTICLE,
    ARTICLES_LOADING,
    ARTICLE_BY_ID_LOADING,
    SET_ARTICLE_PAGE,
} from "./actions";


const initialState: any = {
    pending: false,
    roomsPending: true,
    applyPending: false,
    articleByIdLoading: false,
    articlesLoading: false,
    articles: [],
    article: {},
    cart: [],
    total: 0,
    articlesInCartNumber: 0,
    image: false,
    searchValue: "",
    page: 1,
    numOfPages: 0
};

export const reducer = (state = initialState, action: any) => {

    switch (action.type) {
        case APPLY_ARTICLE_TO_ROOM:
            return {
                ...state,
                applyPending: false,
                image: action.image
            };
        case APPLY_PENDING:
            return {
                ...state,
                applyPending: true
            };
        case SEARCH_ARTICLE:
            return {
                ...state,
                searchValue: action.payload
            };
        case SET_ARTICLE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                articlesLoading: false,
                articles: action.payload,
                numOfPages: action.numOfPages
            };
        case GET_ARTICLE_BY_ID_SUCCESS:
            return {
                ...state,
                articleByIdLoading: false,
                article: action.payload
            };
        case ARTICLES_LOADING:
            return {
                ...state,
                articlesLoading: true
            };
        case ARTICLE_BY_ID_LOADING:
            return {
                ...state,
                articleByIdLoading: true
            };

        default:
            return state;
    }
};


