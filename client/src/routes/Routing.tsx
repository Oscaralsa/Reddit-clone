import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash"

import configRouting from "./configRouting"
// eslint-disable-next-line
import { Route as route } from "../interfaces/global_interfaces"

export default function Routing() {
  return(
    <Router>
      <Switch>
        {map(configRouting, (route: route, index: number) => {
          return(
            <Route key={index} path={route.path} exact={route.exact}>
              <route.page/>
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}
