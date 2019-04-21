// @flow
import * as React from 'react';
import { compose } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withUserListType from 'hocs/withUserListType';
import withAuth from 'hocs/withAuth';
import CreateHunchContainer from 'containers/CreateHunch';
import FavoritesContainer from 'containers/Favorites';
import LoginContainer from 'containers/Login';
import HunchesContainer from 'containers/Hunches';
import HunchContainer from 'containers/Hunch';
import UserContainer from 'containers/User';
import UserList from 'containers/UserList';
import Nav from 'components/Nav';

import styled from '@emotion/styled';

const Main = styled.div`height: 100%;`;
const AuthedHunchesContainer = withAuth(HunchesContainer);
const AuthedFriendsContainer = compose(withAuth, withUserListType('FRIENDS'))(UserList);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Main>
          <Nav />
          <Route path="/" exact component={AuthedHunchesContainer} />
          <Route path="/friends" component={AuthedFriendsContainer} />
          <Route path="/hunches/:type" component={AuthedHunchesContainer} />
          <Switch>
            <Route path="/hunch/new" exact component={withAuth(CreateHunchContainer)} />
            <Route path="/hunch/:id" component={withAuth(HunchContainer)} />
          </Switch>
          <Route path="/user/:id" exact component={withAuth(UserContainer)} />
          <Route path="/me" exact component={withAuth(UserContainer)} />
          <Route path="/user/:id/friends" component={AuthedFriendsContainer} />
          <Route path="/favorites" component={withAuth(FavoritesContainer)} />
        </Main>
      </Switch>
    </BrowserRouter>
  );
}
