import React, { Component, useEffect } from 'react';
import {Provider} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import store from "./store";
import Chat from './pages/Chat';
import LoginPage from './pages/Login';
import EditMessagePage from "./pages/EditMessage";
import UserEditOrAdd from "./components/UserEditOrAdd";
import UsersList from "./components/UsersList";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/chat" component={Chat} onEnter={ !store.currentUser.isLoggedIn && <Redirect to={{pathname: '/login'}}/> }/>
                        <Route path="/message/:id" component={EditMessagePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/user/edit" component={UserEditOrAdd} />
                        <Route path="/users" component={UsersList} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;