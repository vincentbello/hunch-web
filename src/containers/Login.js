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

import GET_CURRENT_USER from 'graphql/queries/getCurrentUser';
import LOGIN from 'graphql/mutations/login';

// import { SocialIcon } from 'react-native-elements';

// import { SplashStyles } from 'theme/app';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

type Props = { login: () => void };

const Splash = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

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

  async function onFbLogin(response) {
    if (response.isCancelled) {
      setAuthenticating(false);
      return;
    }

    const { data: { login } } = await props.login({ context: { headers: { access_token: response.accessToken } } });
    setAuthenticating(false);
    props.history.push('/');
  };

  // const retrieveTokens = async () => {
  //   const [[_1, access], [_2, refresh]] = await AsyncStorage.multiGet(['accessToken', 'refreshToken']);
  //   setTokens({ access, refresh });
  // };

  // React.useEffect(() => {
  //   retrieveTokens();
  // }, []);

  // const loginToFacebook = async () => {
  //   await LoginManager.logOut();
  //   setAuthenticating(true);
  //   const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']);
  //   if (result.isCancelled) {
  //     setAuthenticating(false);
  //     return;
  //   }

  //   const { accessToken } = await AccessToken.getCurrentAccessToken();
  //   const { data: { login } } = await login({ context: { headers: { access_token: accessToken } } });
  //   await AsyncStorage.multiSet([['accessToken', login.accessToken], ['refreshToken', login.refreshToken]]);
  //   new NotificationService(({ os, token }): void => {
  //     if (os && token) registerDevice({ variables: { os: os.toUpperCase(), token } });
  //   });
  //   Actions.main();
  // };

  // const renderAdminInfo = (): React.Node => (
  //   <React.Fragment>
  //     <Text style={{ fontSize: 10 }}>API URL: {API_URL}</Text>
  //     <Text style={{ fontSize: 10 }}>Access Token: {tokens.access}</Text>
  //     <Text style={{ fontSize: 10 }}>Refresh Token: {tokens.refresh}</Text>
  //   </React.Fragment>
  // );

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
    // <View style={SplashStyles}>
    //   <Text>API url: {API_URL}</Text>
    //   <Text style={{ ...Typography.h1, marginBottom: 16 }}>Welcome to Hunch!</Text>
    //   <TouchableOpacity
    //     disabled={isAuthenticating}
    //     onPress={loginToFacebook}
    //   >
    //     {isAuthenticating ? (
    //       <Text>Logging In...</Text>
    //     ) : (
    //       <SocialIcon
    //         button
    //         style={{ borderRadius: 4, padding: 16 }}
    //         title="Log in with Facebook"
    //         type="facebook"
    //       />
    //     )}
    //   </TouchableOpacity>
    // </View>
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
