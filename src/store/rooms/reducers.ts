import {
    GET_ROOMS_LOADING,
    GET_ROOMS_SUCCESS,
} from "./actions";


const initialState: any = {
    roomsPending: true,
    rooms: [],
};

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ROOMS_LOADING:
            return {
                ...state,
                roomsPending: true
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                roomsPending: false,
                rooms: action.payload
            };

        default:
            return state;
    }
};

