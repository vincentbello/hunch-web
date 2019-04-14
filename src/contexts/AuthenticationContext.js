// @flow
import * as React from 'react';

const AuthenticationContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated() {},
});

export function AuthenticationProvider(props): React.Node {
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
