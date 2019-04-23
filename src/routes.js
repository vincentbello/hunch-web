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

const Main = styled.div(common.main);
const Content = styled.main(common.layout);
const AuthedNav = withAuth(Nav);
const AuthedFriendsContainer = withAuth(FriendsContainer);
const AuthedCreateHunchContainer = withAuth(CreateHunchContainer);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Main>
        <Switch>
          <Route path="/login" component={LoginContainer} />
          <>
            <AuthedNav />
            <Content>
              <Route path="/" exact component={withAuth(HomeContainer)} />
              <Route path="/friends" component={AuthedFriendsContainer} />
              <Route path="/hunches/:type?" component={withAuth(HunchesContainer)} />
              <Switch>
                <Route path="/hunch/new/:step?" exact component={AuthedCreateHunchContainer} />
                <Route path="/hunch/:id" component={withAuth(HunchContainer)} />
              </Switch>
              <Route path="/user/:id" exact component={withAuth(UserContainer)} />
              <Route path="/me" exact component={withAuth(UserContainer)} />
              <Route path="/user/:id/friends" component={AuthedFriendsContainer} />
            </Content>
          </>
        </Switch>
      </Main>
    </BrowserRouter>
  );
}
