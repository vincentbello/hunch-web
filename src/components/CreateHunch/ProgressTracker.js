// @flow
import * as React from 'react';
import { FaCaretUp } from 'react-icons/fa';
import { NUM_STEPS } from 'constants/create-hunch';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

const Tracker = styled.div(props => {
  const color = props.valid ? colors.primary.green : colors.borders.focus;
  return `
    position: relative;
    margin-top: ${spacing(2)};
    height: 2px;
    background-color: ${color};
    color: ${color};
  `;
});

const StyledCaret = styled(FaCaretUp, { shouldForwardProp: prop => prop !== 'stepIndex' })(props => `
  position: absolute;
  bottom: -5px;
  font-size: 18px;
  left: calc(${(100 + 200 * props.stepIndex) / (2 * NUM_STEPS)}% - ${4 * (props.stepIndex + 1)}px);
  transition: left 200ms ease;
`);

export default function ProgressTracker({ stepIndex, valid }) {
  return (
    <Tracker valid={valid}>
      <StyledCaret stepIndex={stepIndex} />
    </Tracker>
  );
}
