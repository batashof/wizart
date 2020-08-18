import axios from "axios";

export const get = async (url: string, headers = {}) => {
    return await axios.get(url,
        {
            headers: {
                Accept: 'application/json',
                ...headers
            }
        })
        .then((res: any) => {
            return res.data
        });

};

export const remove = (url: string, headers = {}) => {
    return axios.delete(url,
        {
            headers: {
                Accept: 'application/json',
                ...headers
            }
        })

};

export const post = (url: string, body: any, headers = {}) => {
    return axios.post(url, body,
        {
            headers: {
                Accept: 'application/json',
                ...headers
            }
        })

};