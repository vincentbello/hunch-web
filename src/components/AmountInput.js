// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

const getInputSize = (amount: number): number => Math.min(amount.toString().length, 3) * 68;
const darkGreen = darken(0.05, colors.primary.green);

const Input = styled.input`
  background-color: ${colors.transparent};
  color: ${props => props.valid ? darkGreen : colors.text.secondary};
  border: none;
  box-shadow: none;
  font-size: 110px;
  outline: none;
  font-weight: 600;
  padding: 0;
  height: 90px;
  width: ${props => `${getInputSize(props.amount)}px`};
  text-align: center;
  transition: color 200ms;
`;

const Label = styled.label`
  margin-left: ${spacing(2)};
  position: relative;
  color: ${props => props.valid ? darkGreen : colors.text.secondary};
  display: block;
  transition: color 200ms;
`;

const Superscript = styled.span`
  position: absolute;
  top: 0;
  font-size: 48px;
  left: -28px;
`;

type Props = {
  autoFocus: boolean,
  amount: number,
  valid: boolean,
  setAmount: (number: number) => void,
};

function AmountInput({ amount, autoFocus, valid, setAmount }: Props) {
  const onChange = (evt) => {
    const value = parseInt(evt.target.value || '0', 10);
    if (!isNaN(value) && value < 1000) setAmount(value);
  };

  return (
    <Label htmlFor="amount" valid={valid}>
      <Superscript>$</Superscript>
      <Input
        autoFocus={autoFocus}
        amount={amount}
        placeholder="0"
        value={amount || ''}
        onChange={onChange}
        id="amount"
        maxLength="3"
        valid={valid}
      />
    </Label>
  );
}
AmountInput.defaultProps = { autoFocus: false, valid: false };

export default AmountInput;
