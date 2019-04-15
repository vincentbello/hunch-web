// @flow
import * as React from 'react';

// import { type Game } from 'types/game';
// import { type Message } from 'types/message';
// import { type User } from 'types/user';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
// import common from 'theme/common';
import colors from 'theme/colors';
// import Typography from 'theme/typography';
// import { spacing } from 'theme/sizes';

type Props = {
  bordered: boolean,
  dotted: boolean,
  light: boolean,
  muted: boolean,
  rounded: boolean,
  padded: boolean,
  size: 'xsmall' | 'small' | 'medium' | 'large',
  src: string | null,
};

const SIZES = {
  xsmall: 32,
  small: 36,
  medium: 50,
  large: 72,
};

const defaultProps = {
  bordered: false,
  light: false,
  muted: false,
  padded: false,
  rounded: false,
  size: 'medium',
};

// const styles = StyleSheet.create({
//   Image: {},
//   wrapper: {
//     borderWidth: 1,
//     padding: 3,
//     borderColor: Colors.primary.gray,
//     backgroundColor: Colors.white,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   wrapper_dotted: {
//     borderStyle: 'dashed',
//   },
//   Image_bordered: {
//     borderWidth: 1,
//     borderColor: Colors.primary.gray,
//   },
//   Image_dotted: {
//     borderStyle: 'dashed',
//   },
//   Image_empty: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors.background,
//   },
//   Image_muted: {
//     opacity: 0.75,
//   },
// });

const commonStyles = props => {
  const dimension = SIZES[props.size];
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
    const dimension = SIZES[props.size] + 3;
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
  ${props => props.dotted && `border-style: dashed;`}
  ${props => props.muted && `opacity: 0.75;`}
  ${commonStyles}
`;

export default function Image({ bordered, dotted, light, muted, padded, rounded, size, src }: Props) {
  const image = src === null ? (
    <EmptyImage bordered={bordered} dotted={dotted} rounded={rounded} size={size}>
      {/* <Icon name="user" size={dimension * 2 / 3} color={Colors.textSecondary} /> */}
    </EmptyImage>
  ) : (
    <StyledImage bordered={bordered} dotted={dotted} muted={muted} rounded={rounded} size={size} src={src} />
  );
  return padded ? <PaddingContainer dotted={dotted} rounded={rounded} size={size}>{image}</PaddingContainer> : image;
}
Image.defaultProps = defaultProps;
