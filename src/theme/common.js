// @flow
import { keyframes } from '@emotion/core';
import colors from 'theme/colors';
import { media, spacing } from 'theme/sizes';

export default {
  global: `
    body {
      background-color: ${colors.background};
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
    item: `
      list-style-type: none;
    `,
    link: `
      transition: background-color 200ms;

      &:-webkit-any-link {
        text-decoration: none;
      }
    `,
    list: `
      margin: 0;
      padding: 0;
    `,
  },
  shadow: `
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.15);
    transition: box-shadow 250ms;

    &:hover {
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
    }
  `,
  splash: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    ${media.mobile`width: 100vw;`}
  `,
};
