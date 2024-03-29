// @flow
const SPACING_NOTCHES = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 36,
  7: 48,
  8: 64,
};

export const sizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1080,
};

export function spacing(...notches: number[]): string {
  return notches.map((notch: number): string => `${notch < 0 ? '-' : ''}${SPACING_NOTCHES[Math.abs(notch)] || 0}px`).join(' ');
}

export const media = Object.keys(sizes).reduce((acc, label) => ({
  ...acc,
  [label]: (style: string) => `
    @media (max-width: ${sizes[label]}px) {
      ${style}
    }
  `,
}), {});
