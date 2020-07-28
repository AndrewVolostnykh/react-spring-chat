import {createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const initialState = {
  messages: [],
  users: [],
  messagesLength: 0,
  currentUser: {
    user: "Andrew",
    userId: "121314",
    avatar: null
  },
  isLoading: true,
  editMessage: {}
}

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
);

// sagaMiddleware.run(watchFetchDog);

export default store;
