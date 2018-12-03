import React from "react";

import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "@pages/Login";
import App from "@pages/App";
export default () => (
    <HashRouter>
        <div className="router">
            <Route path="/login"exact component={Login} />
            <Route path="/" exact component={App} />
        </div>
    </HashRouter>
);
