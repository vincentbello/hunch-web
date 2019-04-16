// @flow
import * as React from 'react';
import styled from '@emotion/styled';

const ImageBackground = styled.div`
  height: 280px;
  width: 100%;
  display: flex;
  ${props => `background: ${props.dimmed ? 'linear-gradient(rgba(0,0,0,0.6), ' : ''}rgba(0,0,0,0.6)), url(${props.src}) center bottom;`}
`;

type Props = {
  children: React.Node,
  dimmed: boolean,
  src: string,
};

const ImageSplash = ({ children, ...otherProps }: Props): React.Node => (
  <ImageBackground {...otherProps}>{children}</ImageBackground>
);

ImageSplash.defaultProps = { dimmed: false };
ImageSplash.displayName = 'ImageSplash';
export default ImageSplash;
