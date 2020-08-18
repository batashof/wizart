import {Article} from "../../types";

export const ADD_ARTICLE_TO_CART = 'ADD_ARTICLE_TO_CART';
export const REMOVE_ARTICLE_FROM_CART = 'REMOVE_ARTICLE_FROM_CART';
export const SUB_ARTICLE_QUANTITY = 'SUB_ARTICLE_QUANTITY';
export const ADD_ARTICLE_QUANTITY = 'ADD_ARTICLE_QUANTITY';







export const addArticleToCart = (article: Article, quantity: number) => {
    return {
        type: ADD_ARTICLE_TO_CART,
        quantity: quantity,
        payload: article
    }
};
export const removeArticleFromCart = (id: string) => {
    return {
        type: REMOVE_ARTICLE_FROM_CART,
        id
    }
};

export const subtractArticleQuantity = (id: string) => {

    return {
        type: SUB_ARTICLE_QUANTITY,
        id
    }
};

export const addArticleQuantity = (id: string) => {
    return {
        type: ADD_ARTICLE_QUANTITY,
        id
    }
};
