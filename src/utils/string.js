// @flow
export function getPronoun(gender) {
  if (gender === null) return 'them';
  return gender === 'M' ? 'him' : 'her';
}
