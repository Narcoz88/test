export const FETCH_REGISTER = "FETCH_REGISTER";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";
export const FETCH_REGISTER_ERROR = "FETCH_REGISTER_ERROR";

const initialState = {
    register: false,
    loading: false,
    error: null,
    name: null,
    mail: null
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REGISTER:
            return {loading: true, error: null, register: false, name: null, mail: null};
        case FETCH_REGISTER_SUCCESS:
            return {loading: false, error: null, register: true, name: action.payload.name, mail: action.payload.email};
        case FETCH_REGISTER_ERROR:
            return {loading: false, error: action.payload, register: false, name: null, mail: null};
        default:
            return state;
    }
};