import {config} from "../config";
import {get} from "./fetch";
import {
    articlesLoading,
    getArticlesSuccess
} from "../store/articles/actions";
import {Dispatch} from "redux";


export const getArticles = (page: number) => {
    return (dispatch: Dispatch) => {
        dispatch(articlesLoading());
        get(`${config.PIM_HOST}/api/articles?page=${page}&locale=en`, {Authorization: config.TOKEN})
            .then((res: any) => {
                dispatch(getArticlesSuccess(res));
                return res;
            })
    }
};

export const getArticlesBySearch  = (searchValue: any, page: number) => {
    return (dispatch: Dispatch) => {
        dispatch(articlesLoading());
        // console.log(searchValue)

          return get(`${config.PIM_HOST}/api/articles/search?name=${searchValue}&page=${page}&locale=en`, {Authorization: config.TOKEN})
            .then((res: any) => {
                console.log(searchValue)
                dispatch(getArticlesSuccess(res));
                return res;
            })
    }
};

export const getArticlesByVendor = (searchValue: any) => {
    return  get(`${config.PIM_HOST}/api/articles/search?vendor_code=${searchValue}&locale=en`, {Authorization: config.TOKEN})


};
export const getArticleByName = (searchValue: any) => {
    return  get(`${config.PIM_HOST}/api/articles/search?name=${searchValue}&locale=en`, {Authorization: config.TOKEN})
        .then((res: any) => {
            console.log(res.data[0])
            return res.data[0];
        })


};
export const getArticleById = (id: string) => {
    return get(`${config.PIM_HOST}/api/articles/${id}?locale=en`, {Authorization: config.TOKEN})
        .then((res: any) => {
            return res.data;
        })
};



