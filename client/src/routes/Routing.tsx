import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash"
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import configRouting from "./configRouting"
import { setUser } from "../actions/authAction"
import { isUserLogged, getTokenApi, logoutApi } from "../api/auth";

// eslint-disable-next-line
import { Route as route, ISetUser } from "../interfaces/global_interfaces"

function Routing({ setUser }: ISetUser) {
  useEffect(()=> {
      if (isUserLogged()){
        setUser(isUserLogged(), getTokenApi()!);
      } else {
        logoutApi()
        setUser(null, getTokenApi()!);
      }
  }, [setUser])

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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    setUser: setUser
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Routing);