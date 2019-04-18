// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { darken } from 'polished';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

export type Props = {
  asLink: boolean,
  block: boolean,
  disabled: boolean,
  children: React.Node,
  leftIcon: React.Node,
  icon: React.Node,
  rightIcon: React.Node,
  size: 'small' | 'medium' | 'large',
  buttonTitle: string,
  type: 'primary' | 'secondary' | 'tertiary' | 'danger',
};

const defaultProps = {
  asLink: false,
  block: false,
  buttonTitle: '',
  disabled: false,
  leftIcon: null,
  icon: null,
  rightIcon: null,
  size: 'medium',
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
  danger: {
    borderColor: colors.primary.red,
    backgroundColor: colors.primary.red,
    color: colors.white,
  }
};

const commonStyles = props => {
  const sizeStyles = SIZE_STYLES[props.size];
  const typeStyles = TYPE_STYLES[props.type];
  return `
    display: ${props.block ? 'block' : 'inline-flex'};
    ${props.block ? `width: 100%;` : ''}
    border: 1px solid ${typeStyles.borderColor};
    border-radius: 3px;
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
      background-color: ${darken(0.06, typeStyles.backgroundColor)};
    }
    &:active {
      background-color: ${darken(0.12, typeStyles.backgroundColor)};
    }
  `;
};

const StyledButton = styled.button(commonStyles);

const StyledLink = styled(Link, { shouldForwardProp: prop => ['children', 'to'].includes(prop) })`
  ${common.reset.link}
  ${commonStyles}
`;

const IconContainer = styled.span`
  position: relative;
  top: 2px;
  margin-${props => props.right ? 'left' : 'right'}: ${spacing(2)};
`;

const Button = React.forwardRef((props: Props, ref: (el: HTMLButtonElement) => void) => {
  const Comp = props.asLink ? StyledLink : StyledButton;
  return (
    <Comp {...props} ref={ref}>
      {(props.buttonTitle || props.icon) ? (
        <>
          {props.leftIcon !== null && <IconContainer>{props.leftIcon}</IconContainer>}
          {props.buttonTitle || props.icon}
          {props.rightIcon !== null && <IconContainer right>{props.rightIcon}</IconContainer>}
        </>
      ) : (
        props.children
      )}
    </Comp>
  );
});
Button.defaultProps = defaultProps;
export default Button;
