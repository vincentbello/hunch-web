// @flow
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import { AuthenticationProvider } from 'contexts/AuthenticationContext';
import AppRouter from './routes';
import apolloClient from './apollo/client';

export default function() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthenticationProvider>
        <AppRouter />
      </AuthenticationProvider>
    </ApolloProvider>
  );
}
