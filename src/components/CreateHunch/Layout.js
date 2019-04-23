// @flow
import styled from '@emotion/styled';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Heading = styled.h1`
  ${typography.h1}
  text-align: center;
  margin: ${props => spacing(2, 0, props.snug ? 3 : 6)};
`;

export const Content = styled.div`
  box-sizing: border-box;
  flex: 1 0 0;
  width: ${props => props.full ? '100%' : 'auto'};
  padding: ${props => props.padded ? spacing(2) : 0};
`;
