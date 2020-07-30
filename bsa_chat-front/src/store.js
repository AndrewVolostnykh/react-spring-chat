import {createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/reducers";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import {
  loginUser,
  getMessages,
  editMessage,
  addMessage,
  deleteMessage,
  setLike,
  getUsers,
  addUser,
  removeUser,
  editUser
} from "./redux/generators/index";

const sagaMiddleware = createSagaMiddleware();
const composedEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
const initialState = {
  messages: [],
  users: [],
  messagesLength: 0,
  currentUser: {
    userName: "",
    password: "",
    userId: "",
    avatar: null,
    isAdmin: false,
    isLoggedIn: false
  },
  isLoading: false,
  error: "",
  editMessage: {}
}

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

sagaMiddleware.run(loginUser);
sagaMiddleware.run(getMessages);
sagaMiddleware.run(editMessage);
sagaMiddleware.run(addMessage);
sagaMiddleware.run(deleteMessage);
sagaMiddleware.run(setLike);
sagaMiddleware.run(getUsers)
sagaMiddleware.run(addUser);
sagaMiddleware.run(removeUser);
sagaMiddleware.run(editUser);

export default store;
