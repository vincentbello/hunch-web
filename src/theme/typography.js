// @flow
function lineHeight(fontSize) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}

const baseFontSize = 14;

export default {
  base: `
    font-size: ${baseFontSize}px;
    line-height: ${lineHeight(baseFontSize)}px;
  `,
  h1: `
    font-size: ${baseFontSize * 1.75}px;
    line-height: ${lineHeight(baseFontSize * 2)}px;
  `,
  h2: `
    font-size: ${baseFontSize * 1.5}px;
    line-height: ${lineHeight(baseFontSize * 1.75)}px;
  `,
  h3: `
    font-size: ${baseFontSize * 1.25}px;
    line-height: ${lineHeight(baseFontSize * 1.5)}px;
  `,
  h4: `
    font-size: ${baseFontSize * 1.1}px;
    line-height: ${lineHeight(baseFontSize * 1.25)}px;
  `,
  h5: `
    font-size: ${baseFontSize}px;
    line-height: ${lineHeight(baseFontSize)}px;
  `,
};
