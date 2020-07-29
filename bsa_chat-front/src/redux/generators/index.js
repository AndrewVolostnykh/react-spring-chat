import {all, call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

import {apiError, fillUser, inProgress, success} from '../actions/index'

export function* loginUser() {
    yield takeEvery('LOGIN_USER', fetchUserAsync);
}

export function* getMessages() {
    yield takeEvery('GET_MESSAGES', fetchMessagesAsync);
}

export function* editMessage() {
    yield takeEvery('EDIT_MESSAGE', fetchMessageEditAsync);
}

export function* addMessage() {
    yield takeEvery('ADD_MESSAGE', addMessageAsync);
}

function* fetchUserAsync(action) {
    try {
        yield put(inProgress());
        const data = yield call(axios.post, 'http://localhost:8181/login', JSON.stringify({userName: action.payload.userName, password: action.payload.password}), {
            headers: {'Content-Type': 'application/json'}
        });

        yield put(success());
        yield put({type:"FILL_USER", payload: data.data})

    } catch (error) {
        yield put(apiError(error))
    }
}

function* fetchMessagesAsync(action) {
    try{
        yield put(inProgress());
        const data = yield call(axios.get, 'http://localhost:8181/messages/' + action.payload );

        yield put(success());
        yield put({type: 'FILL_MESSAGES', payload: data.data})
    } catch (error) {
        yield put(apiError(error))
    }
}

function* fetchMessageEditAsync(action) {
    try {
        yield put(inProgress());
        const data = yield call(axios.post, 'http://localhost:8181/message/edit', JSON.stringify(action.payload.ms), {
            headers: {'Content-Type': 'application/json'}
        });
        yield put(success());
        yield put ({type: 'SUCCESS_MESSAGE_EDIT', payload: data.data})
        action.payload.history.push('/chat');
    } catch (error) {
        yield put(apiError(error))
    }
}

function* addMessageAsync (action) {
    try {
        yield put(inProgress());
        const data = yield call(axios.post, 'http://localhost:8181/message/edit', JSON.stringify(action.payload), {
            headers: {'Content-Type':'application/json'}
        });
        yield put(success());
        yield put({type: 'STORE_ADD_MESSAGE', payload: data.data});
console.log("Message successfully added: ", data.data);
    } catch(error) {
        yield put(apiError(error))
    }
}
