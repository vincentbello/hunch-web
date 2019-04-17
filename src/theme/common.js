// @flow
import { keyframes } from '@emotion/core';
import colors from 'theme/colors';
import { media, spacing } from 'theme/sizes';

export default {
  global: `
    body {
      background-color: ${colors.background};
    }

    .ReactModal__Content {
      width: calc(100% - 30px);
      min-height: 100px;
    }
  `,
  keyframes: {
    pulseAndShake: keyframes`
      0% {
        transform: scale(1);
      }
      30% {
        transform: scale(.9);
      }
      70% {
        transform: scale(1);
      }
      75% {
        transform: rotate(0deg);
      }
      80% {
        transform: rotate(-5deg);
      }
      85% {
        transform: rotate(5deg);
      }
      90% {
        transform: rotate(-5deg);
      }
      95% {
        transform: rotate(5deg);
      }
      100% {
        transform: rotate(0deg);
      }
    `,
  },
  box: `
    background-color: ${colors.white};
    border-radius: 2px;
    padding: ${spacing(1)};
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
