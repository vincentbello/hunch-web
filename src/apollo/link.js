import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_API_URL}/api` });

const authLink = setContext(async (_, context) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken === null) return context;

  return {
    ...context,
    headers: {
      ...context.headers,
      'x-auth-token': accessToken,
    },
  };
});

export default authLink.concat(httpLink);
