// @flow
import * as React from 'react';
import queryString from 'query-string';

const APP_ID = '1508649675817033';
const FIELDS = 'name,email,picture';
const SCOPE = 'public_profile,user_friends';
const RETURN_SCOPES = false;
const XFBML = false;
const COOKIE = false;
const AUTH_TYPE = '';
const VERSION = '3.1';
const LANGUAGE = 'en_US';

type Props = {
  callback: () => void,
  onFailure: () => void,
  render: () => React.Node,
};

function useMountedState(initialVal) {
  const mountRef = React.useRef(false);
  const [val, setVal] = React.useState(initialVal);

  React.useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);

  const setIfMounted = React.useCallback(newVal => {
    if (mountRef.current) setVal(newVal);
  }, [mountRef.current]);
  return [val, setIfMounted];
}

function isRedirectedFromFb() {
  const parsedParams = queryString.parse(window.location.search);
  const parsedHash = queryString.parse(window.location.hash);
  return [parsedParams, parsedHash].some(p => Boolean(p.access_token) || Boolean(p.granted_scopes));
}

function loadSdkAsynchronously() {
  ((d, s, id) => {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = `https://connect.facebook.net/${LANGUAGE}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

function FacebookLogin({ callback, onFailure, render }: Props) {
  const [isSdkLoaded, setSdkLoaded] = useMountedState(false);
  const [isProcessing, setProcessing] = useMountedState(false);

  function checkLoginState(fbResponse) {
    setProcessing(false);
    if (fbResponse.authResponse) {
      window.FB.api('/me', { locale: LANGUAGE, fields: FIELDS }, me => callback({ ...me, ...fbResponse.authResponse }));
    } else {
      onFailure(fbResponse.status);
    }
  }

  function checkLoginAfterRefresh(fbResponse) {
    if (fbResponse.status === 'connected') {
      checkLoginState(fbResponse);
    } else {
      window.FB.login(loginResponse => checkLoginState(loginResponse), true);
    }
  }

  function setFbAsyncInit() {
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${VERSION}`,
        appId: APP_ID,
        xfbml: XFBML,
        cookie: COOKIE,
      });
      setSdkLoaded(true);
      if (isRedirectedFromFb()) window.FB.getLoginStatus(checkLoginAfterRefresh);
    };
  };

  React.useEffect(() => {
    if (document.getElementById('facebook-jssdk')) {
      setSdkLoaded(true);
      return;
    }
    setFbAsyncInit();
    loadSdkAsynchronously();
    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
  }, []);


  function onClick(evt) {
    if (!isSdkLoaded || isProcessing) return;
    setProcessing(true);
    window.FB.login(checkLoginState, { scope: SCOPE, return_scopes: RETURN_SCOPES, auth_type: AUTH_TYPE });
  };

  return render({ onClick, isProcessing, isSdkLoaded });
}
FacebookLogin.defaultProps = {
  onFailure() {},
};

export default FacebookLogin;
