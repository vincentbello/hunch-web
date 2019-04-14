// @flow
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withAuth from 'hocs/withAuth';
import LoginContainer from 'containers/Login';
import HunchesContainer from 'containers/Hunches';

const AuthedHunchesContainer = withAuth(HunchesContainer);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Route path="/login" component={LoginContainer} />
      <Switch>
        <Route path="/" exact component={AuthedHunchesContainer} />
        <Route path="/hunches/:type" component={AuthedHunchesContainer} />
      </Switch>
    </BrowserRouter>
  );
}
