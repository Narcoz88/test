export const FETCH_FORGOT = "FETCH_FORGOT";
export const FETCH_FORGOT_SUCCESS = "FETCH_FORGOT_SUCCESS";
export const FETCH_FORGOT_ERROR = "FETCH_FORGOT_ERROR";

const initialState = {
    forgot: false,
    loading: false,
    error: null
};

export const forgotReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORGOT:
            return {loading: true, error: null, forgot: false};
        case FETCH_FORGOT_SUCCESS:
            return {loading: false, error: null, forgot: action.payload};
        case FETCH_FORGOT_ERROR:
            return {loading: false, error: action.payload, forgot: false};
        default:
            return state;
    }
};