import {all, call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

import {apiError, fillUser, inProgress, success} from '../actions/index'

export function* loginUser() {
    yield takeEvery('LOGIN_USER', fetchUserAsync);
}

function* fetchUserAsync(action) {
    try {
        yield put(inProgress());
        console.log(JSON.stringify(action.payload));
        const data = yield call(axios.post, 'http://localhost:8181/login', JSON.stringify({userName: action.payload.userName, password: action.payload.password}), {
            headers: {'Content-Type': 'application/json'}
        });

        //     return fetch('http://localhost:8181/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json;charset=utf-8'
        //         },
        //         body: JSON.stringify(action.payload)
        //     })
        //         .then(res => res.json());
        // })

        yield put(success());
        yield put({type:"FILL_USER", payload: data.data})

        if(data.data.isAdmin) {
            action.payload.history.push('/users');
        } else {
            action.payload.history.push('/chat');
        }

    } catch (error) {
        yield put(apiError(error))
    }
}
