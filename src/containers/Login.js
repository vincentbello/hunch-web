// @flow
import * as React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
// import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/styled';
import { compose, graphql } from 'react-apollo';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { darken } from 'polished';
// import NotificationService from 'services/NotificationService';
// import { Actions } from 'react-native-router-flux';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
// import { API_URL } from 'react-native-dotenv';

import AuthenticationContext from 'contexts/AuthenticationContext';
import GET_CURRENT_USER from 'graphql/queries/getCurrentUser';
import LOGIN from 'graphql/mutations/login';

// import { SocialIcon } from 'react-native-elements';

// import { SplashStyles } from 'theme/app';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

type Props = { login: () => void };

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
  ${props => props.disabled && 'pointer-events: none;'}

  &:hover {
    background-color: ${darken(0.05, colors.thirdParty.facebook)};
  }
`;

function LoginContainer(props: Props): React.Node {
  const [tokens, setTokens] = React.useState({ access: null, refresh: null });
  const [isAuthenticating, setAuthenticating] = React.useState(false);
  const { isAuthenticated, setAuthenticated } = React.useContext(AuthenticationContext);

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
        appId="1508649675817033"
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={onFbLogin}
        render={(fbRenderProps) => (
          <FbButton
            disabled={isAuthenticating}
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
