// @flow
import colors from 'theme/colors';
import { media } from 'theme/sizes';

export default {
  global: `
    body {
      background-color: ${colors.background};
    }
  `,
  layout: `
    margin: 0 auto;
    max-width: 1080px;
    height: 100vh;

    ${media.mobile`width: 100%;`}
  `,
  reset: {
    link: `
      &:-webkit-any-link {
        color: inherit;
        text-decoration: none;
      }
    `,
  },
  splash: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100vw;
  `,
};
