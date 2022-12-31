import {takeEvery, put, call, fork, all} from "redux-saga/effects";
import {correctMail, correctPass, FETCH_AUTH_SUCCESS, FETCH_AUTH_ERROR} from "../redusers/authReducer.js";
import {FETCH_REGISTER_SUCCESS, FETCH_REGISTER_ERROR} from "../redusers/registerReducer.js";
import {FETCH_CONF_SUCCESS, FETCH_CONF_ERROR} from "../redusers/confReducer.js";
import {FETCH_FORGOT, FETCH_FORGOT_SUCCESS, FETCH_FORGOT_ERROR} from "../redusers/forgotReducer.js";

// убираем комментарии когда появляется куда отправлять данные
// import axios from "axios";

// const sendLogin = async(values) => {
//     await axios.post('url', {...values})
// };

// const sendRegister = async(values) => {
//     await axios.post('url', {...values})
// };

// const sendConf = async(values) => {
//     await axios.post('url', {...values})
// };

const sendForgot = async(values) => {
    // await axios.post('url', {...values})
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    })
};

export function* workerSagaLogin(action) {
    try {
        // запускаем когда есть куда отправлять
        // yield call(sendLogin, action.payload);
        if (action.payload.email === correctMail && action.payload.password === correctPass) {
            console.log("Верные данные");
            yield put({
                type: FETCH_AUTH_SUCCESS,
                payload: true
            });
            console.log('сработало');
            localStorage.setItem("auth", "true");
        } else {
            console.log("Отклонено");
            yield put({
                type: FETCH_AUTH_ERROR,
                payload: "Не верный логин или пароль"
            });
        }
    } catch (e) {
        console.log('ошибка', e);
        localStorage.removeItem("auth");
        yield put({
            type: FETCH_AUTH_ERROR,
            payload: "Error: Произошла ошибка при авторизации."
        });
    }
}

export function* workerSagaRegister(action) {
    try {
        // запускаем когда есть куда отправлять
        // yield call(sendRegister, action.payload);
        console.log("payload", action.payload);
        localStorage.setItem("name", action.payload.name);
        localStorage.setItem("mail", action.payload.email);
        yield put({
            type: FETCH_REGISTER_SUCCESS,
            payload: action.payload
        });
        console.log('сработало');
    } catch (e) {
        console.log('ошибка', e);
        yield put({
            type: FETCH_REGISTER_ERROR,
            payload: "Error: Произошла ошибка при рэгистрации."
        });
    }
}

export function* workerSagaConf(action) {
    try {
        // запускаем когда есть куда отправлять
        // yield call(sendConf, action.payload);
        yield put({
            type: FETCH_CONF_SUCCESS,
            payload: true
        });
        console.log('сработало');
    } catch (e) {
        console.log('ошибка', e);
        localStorage.removeItem("auth");
        yield put({
            type: FETCH_CONF_ERROR,
            payload: "Error: Произошла ошибка при авторизации."
        });
    }
}

export function* workerSagaForgot(action) {
    try {
        // запускаем когда есть куда отправлять

        if (action.payload.email === correctMail) {
            yield put({
                type: FETCH_FORGOT
            });
            yield console.log("Грузится");
            yield call(sendForgot, action.payload);
            yield console.log("Загрузилось");
            yield console.log("Верные данные");
            yield put({
                type: FETCH_FORGOT_SUCCESS,
                payload: true
            });
            yield console.log('сработало');
        } else {
            yield console.log("Отклонено");
            yield put({
                type: FETCH_FORGOT_ERROR,
                payload: "Не верный e-mail"
            });
        }
    } catch (e) {
        console.log('ошибка', e);
        localStorage.removeItem("auth");
        yield put({
            type: FETCH_FORGOT_ERROR,
            payload: "Error: Произошла ошибка при авторизации."
        });
    }
}

export function* watchLoginSaga() {
    yield takeEvery("LOGIN", workerSagaLogin);
}
export function* watchRegisterSaga() {
    yield takeEvery("REGISTER", workerSagaRegister);
}
export function* watchConfSaga() {
    yield takeEvery("CONF", workerSagaConf);
}
export function* watchForgotSaga() {
    yield takeEvery("FORGOT", workerSagaForgot);
}
export default function* rootSaga() {
    yield all([
        fork(watchLoginSaga),
        fork(watchRegisterSaga),
        fork(watchConfSaga),
        fork(watchForgotSaga)
    ])
}