// @flow
import * as React from 'react';

import { type StepProps, stepDefaultProps } from 'constants/create-hunch';

import HunchCreationContext, { setAmount } from 'contexts/HunchCreationContext';

import AmountInput from 'components/AmountInput';
import { Container, Content, Heading } from 'components/CreateHunch/Layout';

export default function Amount({ valid }: StepProps) {
  const [creationState, dispatch] = React.useContext(HunchCreationContext);
  return (
    <Container>
      <Heading>{`How much do you want to bet${creationState.bettee === null ? '' : ` ${creationState.bettee.firstName}`}?`}</Heading>
      <Content>
        <AmountInput
          autoFocus
          amount={creationState.amount}
          valid={valid}
          setAmount={(amount: number) => dispatch(setAmount(amount))}
        />
      </Content>
    </Container>
  );
}
Amount.defaultProps = stepDefaultProps;
