// @flow
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withAuth from 'hocs/withAuth';
import CreateHunchContainer from 'containers/CreateHunch';
import FriendsContainer from 'containers/Friends';
import LoginContainer from 'containers/Login';
import HomeContainer from 'containers/Home';
import HunchesContainer from 'containers/Hunches';
import HunchContainer from 'containers/Hunch';
import UserContainer from 'containers/User';
import Nav from 'components/Nav';

import styled from '@emotion/styled';
import common from 'theme/common';

const Main = styled.div(common.layout);
const Content = styled.main`flex: 1 0 0;`;
const AuthedFriendsContainer = withAuth(FriendsContainer);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Main>
          <Nav />
          <Content>
            <Route path="/" exact component={withAuth(HomeContainer)} />
            <Route path="/friends" component={AuthedFriendsContainer} />
            <Route path="/hunches/:type?" component={withAuth(HunchesContainer)} />
            <Switch>
              <Route path="/hunch/new" exact component={withAuth(CreateHunchContainer)} />
              <Route path="/hunch/:id" component={withAuth(HunchContainer)} />
            </Switch>
            <Route path="/user/:id" exact component={withAuth(UserContainer)} />
            <Route path="/me" exact component={withAuth(UserContainer)} />
            <Route path="/user/:id/friends" component={AuthedFriendsContainer} />
          </Content>
        </Main>
      </Switch>
    </BrowserRouter>
  );
}
