// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import AuthenticationContext from 'contexts/AuthenticationContext';
import withApolloClient from 'hocs/withApolloClient';
import GET_CURRENT_USER from 'graphql/queries/getCurrentUser';
import REFRESH_AUTH from 'graphql/mutations/refreshAuth';

export default function withAuth(ComponentToProtect): React.ComponentType<> {
  function Protected(props): React.Node {
    const mountRef = React.useRef();
    const refreshTimeout = React.useRef(null);
    const [state, setState] = React.useState({ checking: true, redirect: false });
    const { isAuthenticated, setAuthenticated } = React.useContext(AuthenticationContext);

    async function checkAuth() {
      if (mountRef.current === null) return;
      if (isAuthenticated) {
        setState({ checking: false, redirect: false });
        return;
      }

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken === null) {
        setState({ checking: false, redirect: true });
      } else {
        try {
          const { data: { refreshAuth } } = await props.apolloClient.mutate({
            mutation: REFRESH_AUTH,
            variables: { refreshToken },
            update: (cache, { data: { refreshAuth: currentUser } }) => cache.writeQuery({ query: GET_CURRENT_USER, data: { currentUser } }),
          });
          localStorage.setItem('accessToken', refreshAuth.accessToken);
          localStorage.setItem('refreshToken', refreshAuth.refreshToken);
          setAuthenticated(true);
          setState({ ...state, checking: false });
          refreshTimeout.current = setTimeout(checkAuth, 1000 * 60 * 60); // Refresh auth every hour
        } catch (err) {
          console.log('Refresh auth error', err);
          setAuthenticated(false);
          setState({ checking: false, redirect: true });
        }
      }
    }

    React.useEffect(() => {
      mountRef.current = true;
      checkAuth();
      return () => {
        mountRef.current = false;
        if (refreshTimeout !== null) clearTimeout(refreshTimeout);
      };
    }, []);

    if (state.checking) return null;
    if (state.redirect) return <Redirect to="/login" />;
    return <ComponentToProtect {...props} />;
  }

  return withApolloClient(Protected);
}
