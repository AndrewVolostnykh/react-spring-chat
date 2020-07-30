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

export function* deleteMessage() {
    yield takeEvery('DELETE_MESSAGE', deleteMessageAsync);
}

export function* setLike() {
    yield takeEvery('SET_LIKE', setLikeAsync);
}

export function* getUsers() {
    yield takeEvery('GET_USERS', getUsersAsync);
}

export function* addUser() {
    yield takeEvery('CREATE_USER', createUserAsync);
}

export function* removeUser() {
    yield takeEvery('DELETE_USER', removeUserAsync);
}

export function* editUser() {
    yield takeEvery('EDIT_USER', createUserAsync);
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
    } catch(error) {
        yield put(apiError(error))
    }
}

function* deleteMessageAsync(action) {
    try {
        yield put(inProgress());
        const data = yield call(axios.delete, 'http://localhost:8181/message/delete/' + action.payload );
        yield put(success());
        yield put({type: "SUCCESS_DELETE_MESSAGE", payload: action.payload});
    } catch (error) {
        yield put(apiError(error));
    }
}

function* setLikeAsync(action) {
    try {
        console.log("Generator started: " + action.payload);
        yield put(inProgress());
        const data = yield call(axios.put, 'http://localhost:8181/message/like/' + action.payload );
        yield put(success());
        yield put({type: "SUCCESS_SET_LIKE", payload: action.payload});
        console.log(data.data);
    } catch (error) {
        yield put(apiError(error));
    }
}

function* getUsersAsync(action) {
    try {
        console.log("Generator started: " + action.payload);
        yield put(inProgress());
        const data = yield call(axios.get, 'http://localhost:8181/userList/' + action.payload );
        yield put(success());
        yield put({type: "SUCCESS_USERS_GET", payload: data.data});
        console.log(data.data);
    } catch (error) {
        yield put(apiError(error));
    }
}

function* createUserAsync(action) {
    try {
        yield put(inProgress());
        const data = yield call(axios.post, 'http://localhost:8181/user/edit', JSON.stringify(action.payload), {
            headers: {'Content-Type':'application/json'}
        });
        yield put(success());
        console.log(data.data)
        if(action.userId != null) {
            yield put({type: 'SUCCESS_USER_CREATING', payload: data.data});
        } else {
            yield put({type: 'SUCCESS_USER_EDITING', payload: data.data});
        }
    } catch(error) {
        yield put(apiError(error))
    }
}

function* removeUserAsync(action) {
    try {
        yield put(inProgress());
        yield call(axios.delete, 'http://localhost:8181/user/delete/' + action.payload );
        yield put(success());
        yield put({type: "SUCCESS_USER_DELETED", payload: action.payload});
    } catch (error) {
        yield put(apiError(error));
    }
}

