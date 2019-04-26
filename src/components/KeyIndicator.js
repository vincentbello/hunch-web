// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';
import colors from 'theme/colors';
import { media } from 'theme/sizes';

type Props = { char: string, tint: string };

const Key = styled.span(props => `
  padding: 0 2px;
  border: 1px solid ${lighten(0.1, props.tint)};
  border-radius: 2px;
  color: ${props.tint};
  font-size: 10px;

  ${media.mobile`display: none;`}
`);

export default function KeyIndicator({ char, tint }: Props) {
  return <Key tint={tint}>{char}</Key>;
}

KeyIndicator.defaultProps = { tint: colors.text.secondary };
