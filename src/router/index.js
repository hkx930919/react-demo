import React from "C:/Users/13732/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react";

import { HashRouter, Route, Switch } from "C:/Users/13732/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router-dom";
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
