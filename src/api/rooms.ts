import {config} from "../config";
import {get, post, remove} from "./fetch";
import {Dispatch} from "redux";
import {v4 as uuidv4} from "uuid";
import {getRoomsLoading, getRoomsSuccess} from "../store/rooms/actions";

if (localStorage.getItem("uuid") === null) {
    localStorage.setItem("uuid", uuidv4())
}


export const getRooms = () => {
    const uuid: any = localStorage.getItem("uuid");
    return (dispatch: Dispatch) => {
        dispatch(getRoomsLoading());
        get(`${config.INTERIORS_HOST}/api/rooms`, {'device-token': uuid})
            .then((res: any) => {
                dispatch(getRoomsSuccess(res.data));
                return res.data;
            })
    }
};
export const removeRoom = (id: string) => {
    const uuid: any = localStorage.getItem("uuid");
    return remove(`${config.INTERIORS_HOST}/api/rooms/${id}`, {'device-token': uuid})
        .then((res: any) => {
            return res.data;
        })

};
export const postRoom = (file: any) => {
    const data = new FormData();
    data.append('image', file);
    const uuid: any = localStorage.getItem("uuid");
    return post(`${config.INTERIORS_HOST}/api/rooms`, data, {'device-token': uuid})
        .then((res: any) => {
            return res.data;
        })

};



