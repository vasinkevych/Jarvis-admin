import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from "react-redux";

import store from "./store";

import Layout from "./pages/Layout.jsx";
import Migrations from "./pages/Migrations.jsx";
import Users from "./pages/Users.jsx";
import Sql from "./pages/Sql.jsx";

import 'bootstrap-css-only/css/bootstrap.min.css';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Migrations} />
                <Route path="migrations" component={Migrations}></Route>
                <Route path="users" component={Users}></Route>
                <Route path="sql" component={Sql}></Route>
            </Route>
        </Router>
    </Provider>,
    app);
