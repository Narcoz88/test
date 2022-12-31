import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {registerReducer} from "./registerReducer";
import {confReducer} from "./confReducer";
import {forgotReducer} from "./forgotReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    conf: confReducer,
    forgot: forgotReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;