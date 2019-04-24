// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'react-apollo';

import useDocumentTitle from 'hooks/useDocumentTitle';
import type { RouterProps } from 'types/router';
import AuthenticationContext from 'contexts/AuthenticationContext';
import GET_CURRENT_USER from 'graphql/queries/getCurrentUser';
import LOGIN from 'graphql/mutations/login';
import FacebookLogin from 'components/Login/Facebook';

import { darken } from 'polished';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

type Props = RouterProps & { login: () => void };

const Splash = styled.main(common.splash);

const SplashImage = styled.img`
  width: 120px;
`;

const Header = styled.h1`
  ${typography.h1}
`;

const FbButton = styled.button`
  ${typography.h4}
  border-radius: 4px;
  font-weight: 600;
  padding: ${spacing(3, 4)};
  color: ${colors.white};
  background-color: ${colors.thirdParty.facebook};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: background-color 250ms;
  cursor: pointer;
  border: none;
  outline: none;
  ${props => props.disabled && 'pointer-events: none;'}

  &:hover {
    background-color: ${darken(0.05, colors.thirdParty.facebook)};
  }
`;

function LoginContainer(props: Props): React.Node {
  useDocumentTitle('Hunch | Log in');
  const [isAuthenticating, setAuthenticating] = React.useState(false);
  const { setAuthenticated } = React.useContext(AuthenticationContext);

  async function onFbLogin(response) {
    if (response.isCancelled) {
      setAuthenticating(false);
      setAuthenticated(false);
      return;
    }

    const { data: { login } } = await props.login({ context: { headers: { access_token: response.accessToken } } });
    localStorage.setItem('accessToken', login.accessToken);
    localStorage.setItem('refreshToken', login.refreshToken);
    setAuthenticating(false);
    setAuthenticated(true);
    props.history.push('/');
  };

  return (
    <Splash>
      <SplashImage src="assets/brand/logo.png" alt="HunchCard" />
      <Header>Welcome to HunchCard!</Header>
      <FacebookLogin
        callback={onFbLogin}
        render={(fbRenderProps) => (
          <FbButton
            disabled={isAuthenticating}
            isMobile
            onClick={() => {
              setAuthenticating(true);
              fbRenderProps.onClick();
            }}
          >
            {isAuthenticating ? 'Logging in...' : 'Log in with Facebook'}
          </FbButton>
        )}
      />
    </Splash>
  );
}

export default graphql(
  LOGIN,
  {
    name: 'login',
    options: {
      update: (cache, { data: { login: currentUser } }) => cache.writeQuery({ query: GET_CURRENT_USER, data: { currentUser } }),
    },
  }
)(LoginContainer);
