// @flow
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import { Global, css } from '@emotion/core';
import common from 'theme/common';

import { AuthenticationProvider } from 'contexts/AuthenticationContext';
import { BreakpointProvider } from 'contexts/BreakpointContext';
import { HunchCreationProvider } from 'contexts/HunchCreationContext';
import AppRouter from './routes';
import apolloClient from './apollo/client';

export default function() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthenticationProvider>
        <HunchCreationProvider>
          <BreakpointProvider>
            <Global styles={css(common.global)} />
            <AppRouter />
          </BreakpointProvider>
        </HunchCreationProvider>
      </AuthenticationProvider>
    </ApolloProvider>
  );
}
