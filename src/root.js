// @flow
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import common from 'theme/common';

import { AuthenticationProvider } from 'contexts/AuthenticationContext';
import { HunchCreationProvider } from 'contexts/HunchCreationContext';
import AppRouter from './routes';
import apolloClient from './apollo/client';

const Layout = styled.main(common.layout);

export default function() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthenticationProvider>
        <HunchCreationProvider>
          <Global styles={css(common.global)} />
          <Layout>
            <AppRouter />
          </Layout>
        </HunchCreationProvider>
      </AuthenticationProvider>
    </ApolloProvider>
  );
}
