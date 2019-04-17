// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

type Props = {
  block: boolean,
  disabled: boolean,
  children: React.Node,
  leftIcon: React.Node,
  icon: React.Node,
  rightIcon: React.Node,
  size: 'small' | 'medium' | 'large',
  title: string,
  type: 'primary' | 'secondary' | 'tertiary',
};

const defaultProps = {
  block: false,
  disabled: false,
  leftIcon: null,
  icon: null,
  rightIcon: null,
  size: 'medium',
  title: '',
  type: 'primary',
};

const SIZE_STYLES = {
  small: {
    fontSize: 13,
    padding: spacing(1, 2),
  },
  medium: {
    fontSize: 15,
    padding: spacing(2, 2),
  },
  large: {
    fontSize: 18,
    padding: spacing(3),
  },
};

const TYPE_STYLES = {
  primary: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.brand.primary,
    color: colors.white,
  },
  secondary: {
    borderColor: colors.brand.primary,
    backgroundColor: colors.white,
    color: colors.brand.primary,
  },
  tertiary: {
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
    color: colors.brand.primary,
  },
};

const StyledButton = styled.button(props => {
  const sizeStyles = SIZE_STYLES[props.size];
  const typeStyles = TYPE_STYLES[props.type];
  return `
    display: ${props.block ? 'block' : 'inline-flex'};
    ${props.block ? `width: 100%;` : ''}
    border: 1px solid ${typeStyles.borderColor};
    border-radius: 4px;
    padding: ${sizeStyles.padding};
    outline: none;
    align-items: center;
    background-color: ${typeStyles.backgroundColor};
    color: ${typeStyles.color};
    font-size: ${sizeStyles.fontSize}px;
    font-weight: 600;
    transition: background-color 250ms;
    cursor: pointer;
    ${props.disabled ? `
      pointer-events: none;
      opacity: 0.75;
      cursor: default;
    ` : ''}
    &:hover {
      background-color: ${darken(0.065, typeStyles.backgroundColor)};
    }
    &:active {
      background-color: ${darken(0.125, typeStyles.backgroundColor)};
    }
  `;
});

const IconContainer = styled.span`
  position: relative;
  top: 2px;
  margin-${props => props.right ? 'left' : 'right'}: ${spacing(2)};
`;

const Button = React.forwardRef((props: Props, ref: (el: HTMLButtonElement) => void) => (
  <StyledButton {...props} ref={ref}>
    {(props.title || props.icon) ? (
      <React.Fragment>
        {props.leftIcon !== null && <IconContainer>{props.leftIcon}</IconContainer>}
        {props.title || props.icon}
        {props.rightIcon !== null && <IconContainer right>{props.rightIcon}</IconContainer>}
      </React.Fragment>
    ) : (
      props.children
    )}
  </StyledButton>
));
Button.defaultProps = defaultProps;
export default Button;
