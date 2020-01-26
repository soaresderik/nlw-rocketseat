import * as React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

import Login from "./pages/Login";
import Dash from "./pages/Dash";
import Create from "./pages/Create";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dash" component={Dash} />
        <Route path="/new" component={Create} />
      </Switch>
    </Router>
  );
}
