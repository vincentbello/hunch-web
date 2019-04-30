// @flow
import { keyframes } from '@emotion/core';
import colors from 'theme/colors';
import { media, sizes, spacing } from 'theme/sizes';

export default {
  global: `
    body {
      background-color: ${colors.background};
      width: 100%;
      margin: 0;
      overflow-x: hidden;
    }

    * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }

    html, body, #root {
      height: 100%;
    }

    @keyframes bounceIn {
      from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      }
      from {
        opacity: 0;
        transform: translate3d(3000px, 0, 0);
      }
      60% {
        opacity: 1;
        transform: translate3d(-25px, 0, 0);
      }
      75% {
        transform: translate3d(10px, 0, 0);
      }
      90% {
        transform: translate3d(-5px, 0, 0);
      }
      to {
        transform: none;
      }
    }

    @keyframes bounceOut {
      20% {
        opacity: 1;
        transform: translate3d(-20px, 0, 0);
      }
      to {
        opacity: 0;
        transform: translate3d(2000px, 0, 0);
      }
    }

    @keyframes noop {}
  `,
  keyframes: {
    pulse: keyframes`
      from {
        transform: scale(1);
      }
      40% {
        transform: scale(1.15);
      }
      to {
        transform: scale(1);
      }
    `,
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
    ${media.tablet`max-width: 100%;`}
  `,
  main: `
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  reset: {
    button: `
      background: none;
      padding: 0;
      margin: 0;
      box-shadow: 0;
      cursor: pointer;
    `,
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
  `,
};
