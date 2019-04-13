import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
// import AsyncStorage from '@react-native-community/async-storage';

console.log(process.env);
const httpLink = new HttpLink({ credentials: 'include', uri: `${process.env.REACT_APP_API_URL}/api` });

const authLink = setContext(async (_, context) => {
  // const accessToken = await AsyncStorage.getItem('accessToken');
  // const accessToken = 'foobar';
  // if (accessToken === null) return context;

  return {
    ...context,
    headers: {
      ...context.headers,
      // 'x-auth-token': accessToken,
    },
  };
});

export default authLink.concat(httpLink);
