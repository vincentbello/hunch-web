// @flow
import * as React from 'react';
import { compose } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withUserListType from 'hocs/withUserListType';
import withAuth from 'hocs/withAuth';
import LoginContainer from 'containers/Login';
import HunchesContainer from 'containers/Hunches';
import HunchContainer from 'containers/Hunch';
import UserContainer from 'containers/User';
import UserList from 'containers/UserList';
import Nav from 'components/Nav';

const AuthedHunchesContainer = withAuth(HunchesContainer);
const AuthedFriendsContainer = compose(withAuth, withUserListType('FRIENDS'))(UserList);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Route path="/login" component={LoginContainer} />
      <main>
        <Nav />
        <Route path="/" exact component={AuthedHunchesContainer} />
        <Route path="/friends" component={AuthedFriendsContainer} />
        <Route path="/hunches/:type" component={AuthedHunchesContainer} />
        <Route path="/hunch/:id" component={withAuth(HunchContainer)} />
        <Route path="/user/:id" exact component={withAuth(UserContainer)} />
        <Route path="/me" exact component={withAuth(UserContainer)} />
        <Route path="/user/:id/friends" component={AuthedFriendsContainer} />
      </main>
    </BrowserRouter>
  );
}
