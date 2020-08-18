import {
    ADD_ARTICLE_QUANTITY,
    ADD_ARTICLE_TO_CART,
    SUB_ARTICLE_QUANTITY,
    REMOVE_ARTICLE_FROM_CART,
} from "./actions";
import {Cart} from "../../types";


const initialState: any = {
    cart: [],
    total: 0,
    articlesInCartNumber: 0,
};

export const reducer = (state = initialState, action: any) => {
    const fixedPrice: number = 50;
    switch (action.type) {
        case ADD_ARTICLE_TO_CART:
            const addedItem: Cart = state.cart.find((item: Cart) => item.article.uuid === action.payload.uuid);
             return addedItem ? {...state} : {
                ...state,
                cart: [...state.cart, {
                    article: action.payload,
                    total: fixedPrice * action.quantity ,
                    quantity: action.quantity
                }],
                total: state.total + fixedPrice * action.quantity,
                articlesInCartNumber: state.articlesInCartNumber + 1
            };
        case REMOVE_ARTICLE_FROM_CART:
            const itemToRemove: Cart = state.cart.find((item: Cart) => item.article.uuid === action.id);
            const new_items: Cart[] = state.cart.filter((item: Cart) => item.article.uuid !== action.id);

            return {
                ...state,
                cart: new_items,
                total: state.total - itemToRemove.total,
                articlesInCartNumber: state.articlesInCartNumber - 1
            };
        case ADD_ARTICLE_QUANTITY:
            // const addedItemAdd: Cart = state.cart.find((item: Cart) => item.article.uuid === action.id);

            return {
                ...state,
                cart: state.cart.map((item: Cart) => item.article.uuid === action.id ?
                    {...item, quantity: item.quantity + 1, total: item.total + fixedPrice} : item),
                total: state.total + fixedPrice
            };
        case SUB_ARTICLE_QUANTITY:
            const addedItemSub: Cart = state.cart.find((item: Cart) => item.article.uuid === action.id);

            return addedItemSub.quantity > 1 ? {
                ...state,
                cart: state.cart.map((item: Cart) => item.article.uuid === action.id ?
                    {
                        ...item,
                        quantity: item.quantity - 1,
                        total: item.total - fixedPrice
                    } : item),
                total: state.total - fixedPrice
            } : state;
        default:
            return state;
    }
};


