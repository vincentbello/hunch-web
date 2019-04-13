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

export function spacing(...notches: number[]): string {
  return notches.map((notch: number): string => `${SPACING_NOTCHES[notch] || 0}px`).join(' ');
}
