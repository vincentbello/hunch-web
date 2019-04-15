// @flow
import * as React from 'react';
import styled from '@emotion/styled';

type Props = { amount: number };

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
`;

const Superscript = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 2px;
  top: -2px;
  position: relative;
`;

const Text = styled.span`
  font-weight: 900;
  font-size: 32px;
`;

export default function Amount({ amount }: Props) {
  return (
    <Wrapper>
      <Superscript>$</Superscript>
      <Text>{amount}</Text>
    </Wrapper>
  );
}
