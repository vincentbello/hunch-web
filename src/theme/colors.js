// @flow
import { darken } from 'polished';

export default {
  background: '#E9EBEE',
  black: '#000000',
  borders: {
    main: '#D0D1D5',
    focus: darken(0.25, '#D0D1D5'),
    cell: '#EEEEEE',
  },
  brand: {
    primary: '#3593F2',
    secondary: '#F19935',
  },
  links: {
    base: '#551A8B',
    hover: darken(0.06, '#551A8B'),
    underlay: 'rgba(0,0,0,0.05)',
  },
  primary: {
    orange: '#FFA352',
    blue: '#8CB2D9',
    green: '#73C028',
    red: '#F25F57',
    purple: '#D28BDE',
    gray: '#AAAAAA',
  },
  thirdParty: {
    cashApp: '#28C101',
    facebook: '#3B5998',
    iMessage: '#007AFF',
    venmo: '#3D95CE',
  },
  text: {
    primary: '#222222',
    secondary: '#777777',
    tertiary: '#DDDDDD',
  },
  gold: '#FFD700',
  transparent: 'rgba(0,0,0,0)',
  offwhite: '#EFEFEF',
  white: '#FFFFFF',
};
