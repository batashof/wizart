import {Room} from "../../types";

export const GET_APPLIED_ROOMS = 'GET_APPLIED_ROOMS';
export const GET_ROOMS_LOADING = 'GET_ROOMS_LOADING';
export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';



export const getRoomsLoading = () => {
    return {
        type: GET_ROOMS_LOADING
    }
};
export const getRoomsSuccess = (rooms: Room[]) => {
    return {
        type: GET_ROOMS_SUCCESS,
        payload: rooms
    }
};


export const getAppliedRooms = (appliedRooms: any) => {
    return {
        type: GET_APPLIED_ROOMS,
        appliedRooms: appliedRooms
    }
};
