// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { darken, lighten } from 'polished';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

export type Props = {
  asLink: boolean,
  block: boolean,
  buttonTitle: string,
  disabled: boolean,
  children: React.Node,
  leftIcon: React.Node,
  icon: React.Node,
  rightIcon: React.Node,
  size: 'small' | 'medium' | 'large' | 'xlarge',
  tint: string,
  type: 'primary' | 'secondary' | 'tertiary' | 'translucent',
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
  tint: colors.brand.primary,
  type: 'primary',
};

const SIZE_STYLES = {
  small: {
    fontSize: 13,
    padding: spacing(1, 2),
  },
  medium: {
    fontSize: 15,
    padding: '8px 10px',
  },
  large: {
    fontSize: 18,
    padding: spacing(3),
  },
  xlarge: {
    fontSize: 22,
    padding: spacing(4),
  },
};

const getTypeStyles = (type, tint) => {
  switch (type) {
    case 'primary':
      return {
        borderColor: tint,
        backgroundColor: tint,
        color: colors.white,
      };

    case 'secondary':
      return {
        borderColor: tint,
        backgroundColor: colors.white,
        color: tint,
      };

    case 'tertiary':
      return {
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        color: tint,
        hoverColor: darken(0.25, tint),
      };

    default: {
      const bg = lighten(0.15, tint);
      const hoverBg = lighten(0.25, tint);
      return {
        borderColor: bg,
        backgroundColor: bg,
        color: colors.white,
        hoverBorderColor: hoverBg,
        hoverBackgroundColor: hoverBg,
      };
    }
  }
};

const commonStyles = props => {
  const sizeStyles = SIZE_STYLES[props.size];
  const typeStyles = getTypeStyles(props.type, props.tint);
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
    transition: border-color 200ms, color 200ms, background-color 200ms;
    cursor: pointer;
    ${props.disabled ? `
      pointer-events: none;
      opacity: 0.65;
      cursor: default;
    ` : ''}
    &:hover {
      background-color: ${'hoverBackgroundColor' in typeStyles ? typeStyles.hoverBackgroundColor : darken(0.06, typeStyles.backgroundColor)};
      ${'hoverBorderColor' in typeStyles ? `border-color: ${typeStyles.hoverBorderColor};` : ''}
      ${'hoverColor' in typeStyles ? `color: ${typeStyles.hoverColor};` : ''}
    }
    &:active {
      background-color: ${'hoverBackgroundColor' in typeStyles ? typeStyles.hoverBackgroundColor : darken(0.12, typeStyles.backgroundColor)};
      ${'hoverBorderColor' in typeStyles ? `border-color: ${typeStyles.hoverBorderColor};` : ''}
      ${'hoverColor' in typeStyles ? `color: ${typeStyles.hoverColor};` : ''}
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
