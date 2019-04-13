// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import withApolloClient from 'hocs/withApolloClient';
import GET_CURRENT_USER from 'graphql/queries/getCurrentUser';
import REFRESH_AUTH from 'graphql/mutations/refreshAuth';

export default function withAuth(ComponentToProtect): React.ComponentType<> {
  function Protected(props): React.Node {
    const [state, setState] = React.useState({ checking: false, redirect: false });

    async function checkAuth() {
      try {
        await props.apolloClient.mutate({
          mutation: REFRESH_AUTH,
          // variables: { refreshToken }, REFRESHTOKEN FROM COOKIES
          update: (cache, { data: { refreshAuth: currentUser } }) => cache.writeQuery({ query: GET_CURRENT_USER, data: { currentUser } }),
        });
        // SET ACCESSTOKEN AND REFRESHTOKEN COOKIES
        setState({ ...state, checking: false });
      } catch (err) {
        console.log('Refresh auth error', err);
        setState({ checking: false, redirect: true });
      }
    }

    React.useEffect(() => {
      checkAuth();
    }, []);

    if (state.checking) return null;
    if (state.redirect) return <Redirect to="login" />;
    return <ComponentToProtect {...props} />;
  }

  return withApolloClient(Protected);
}
