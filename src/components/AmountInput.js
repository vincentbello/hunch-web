// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

function getInputSize(amount: number): number {
  if (amount < 10) return 32;
  if (amount < 100) return 42;
  return 56;
}

const Container = styled.div`
  margin-left: ${spacing(2)};
`;

const Input = styled.input`
  background-color: ${colors.transparent};
  border: none;
  box-shadow: none;
  font-size: 20px;
  outline: none;
  font-weight: 800;
  padding: 0;
  width: ${props => `${getInputSize(props.amount)}px`};
  text-align: right;
`;

const Label = styled.label`
  color: ${colors.text.primary};
  font-size: 15px;
`;

type Props = {
  value: number,
  onChange: (number: number) => void,
};

function AmountInput({ amount, setAmount }: Props) {
  const onChange = (evt) => {
    const value = parseInt(evt.target.value || '0', 10);
    if (!isNaN(value) && value < 1000) setAmount(value);
  };

  return (
    <Container>
      <Label htmlFor="amount">
        $
        <Input amount={amount} placeholder="0" value={amount || ''} onChange={onChange} type="number" id="amount" min="0" max="1000" />
      </Label>
    </Container>
  );
}

export default AmountInput;
