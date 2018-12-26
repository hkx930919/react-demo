import React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "@pages/Login";
import App from "@pages/App";
export default () => (
    <HashRouter>
        <Switch>
            <Route path="/login"exact component={Login} />
            <Route path="/" exact component={App} />
        </Switch>
    </HashRouter>
);
