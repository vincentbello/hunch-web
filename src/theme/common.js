// @flow
import { keyframes } from '@emotion/core';
import colors from 'theme/colors';
import { media, sizes, spacing } from 'theme/sizes';

export default {
  global: `
    body {
      background-color: ${colors.background};
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
    html, body, #root {
      height: 100%;
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
    shake: keyframes`
      0% {
          transform: rotate(-1deg);
      }
      50% {
          transform: rotate(1.5deg);
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
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${sizes.desktop}px;
    height: 100%;
    flex: 1 0 0;
  `,
  main: `
    height: 100%;
    display: flex;
    flex-direction: column;
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
