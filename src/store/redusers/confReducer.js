export const FETCH_CONF = "FETCH_CONF";
export const FETCH_CONF_SUCCESS = "FETCH_CONF_SUCCESS";
export const FETCH_CONF_ERROR = "FETCH_CONF_ERROR";

const initialState = {
    confirm: false,
    loading: false,
    error: null
};

export const confReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONF:
            return {loading: true, error: null, confirm: false};
        case FETCH_CONF_SUCCESS:
            return {loading: false, error: null, confirm: action.payload};
        case FETCH_CONF_ERROR:
            return {loading: false, error: action.payload, confirm: false};
        default:
            return state;
    }
};