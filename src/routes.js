// @flow
import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import withAuth from 'hocs/withAuth';
import LoginContainer from 'containers/Login';
import HunchesContainer from 'containers/Hunches';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HunchesContainer} />
      <Route path="/login" component={LoginContainer} />
    </BrowserRouter>
  );
}
