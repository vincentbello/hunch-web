// @flow
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withAuth from 'hocs/withAuth';
import LoginContainer from 'containers/Login';
import HunchesContainer from 'containers/Hunches';
import HunchContainer from 'containers/Hunch';

const AuthedHunchesContainer = withAuth(HunchesContainer);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Route path="/login" component={LoginContainer} />
      <Switch>
        <Route path="/" exact component={AuthedHunchesContainer} />
        <Route path="/hunches/:type" component={AuthedHunchesContainer} />
        <Route path="/hunch/:id" component={withAuth(HunchContainer)} />
      </Switch>
    </BrowserRouter>
  );
}
