export const FETCH_AUTH = "FETCH_AUTH";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_ERROR = "FETCH_AUTH_ERROR";
export const correctMail = "example@example.com";
export const correctPass = "password2021";

const initialState = {
    auth: false,
    loading: false,
    error: null,
    correctMail: correctMail,
    correctPass: correctPass
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTH:
            return {loading: true, error: null, auth: false};
        case FETCH_AUTH_SUCCESS:
            return {loading: false, error: null, auth: action.payload};
        case FETCH_AUTH_ERROR:
            return {loading: false, error: action.payload, auth: false};
        default:
            return state;
    }
};