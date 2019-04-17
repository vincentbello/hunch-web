// @flow
import * as React from 'react';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

export default styled.h4`
  ${typography.h4}
  margin: ${props => spacing(0, props.grow ? 2 : 0, 2, props.padded ? 2 : 0)};
  font-weight: 900;
  ${props => props.grow ? `flex: 1 0 0;` : ''}
`;
