// @flow
import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import colors from 'theme/colors';

type Props = {
  bordered: boolean,
  dotted: boolean,
  light: boolean,
  muted: boolean,
  rounded: boolean,
  padded: boolean,
  size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
  src: string | null,
};

export const IMG_SIZES = {
  xxsmall: 24,
  xsmall: 32,
  small: 36,
  medium: 50,
  large: 72,
  xlarge: 128,
};

const defaultProps = {
  bordered: false,
  light: false,
  muted: false,
  padded: false,
  rounded: false,
  size: 'medium',
};

const commonStyles = props => {
  const dimension = IMG_SIZES[props.size];
  return css`
    ${props.bordered && `border: 1px solid ${colors.borders.main};`}
    ${props.rounded && `border-radius: ${dimension / 2}px;`}
    height: ${dimension}px; width: ${dimension}px;
  `;
}

const PaddingContainer = styled.div`
  border: 1px solid ${colors.borders.main};
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => {
    const dimension = IMG_SIZES[props.size] + 3;
    return css`
      ${props.dotted && `border-style: dashed;`}
      ${props.rounded && `border-radius: ${dimension / 2}px;`}
      height: ${dimension}px; width: ${dimension}px;
    `;
  }}
`;

const EmptyImage = styled.div`
  ${commonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
`;

const StyledImage = styled.img`
  ${props => props.muted && `opacity: 0.75;`}
  ${commonStyles}
`;

export default function Image({ bordered, dotted, light, muted, padded, rounded, size, src, ...imgProps }: Props) {
  const image = src === null ? (
    <EmptyImage bordered={bordered} dotted={dotted} rounded={rounded} size={size} className={imgProps.className}>
      {/* <Icon name="user" size={dimension * 2 / 3} color={Colors.textSecondary} /> */}
    </EmptyImage>
  ) : (
    <StyledImage bordered={bordered} muted={muted} rounded={rounded} size={size} src={src} {...imgProps} />
  );
  return padded ? <PaddingContainer dotted={dotted} rounded={rounded} size={size}>{image}</PaddingContainer> : image;
}
Image.defaultProps = defaultProps;
