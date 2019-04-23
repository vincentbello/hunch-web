// @flow
import * as React from 'react';

import HunchCreationContext, { setBettee } from 'contexts/HunchCreationContext';
import { type StepProps, stepDefaultProps } from 'constants/create-hunch';
import { chain } from 'utils/functions';

import FriendSelect from 'components/FriendSelect';
import UserCard from 'components/UserCard';
import Button from 'components/Button';
import { Container, Content, Heading } from 'components/CreateHunch/Layout';

import { type User } from 'types/user';

export default function Challenger({ valid, goToNext }: StepProps) {
  const [creationState, dispatch] = React.useContext(HunchCreationContext);
  return (
    <Container>
      <Heading snug={valid}>Who do you want to challenge?</Heading>
      {valid && <Button type="tertiary" buttonTitle="Challenge someone else" onClick={() => dispatch(setBettee(null))} />}
      <Content full={valid}>
        <FriendSelect
          autoFocus
          contained
          large
          value={creationState.bettee}
          selectUser={chain((user: User) => dispatch(setBettee(user)), goToNext)}
        />
        {valid && <UserCard display user={creationState.bettee} />}
      </Content>
    </Container>
  );
}
Challenger.defaultProps = stepDefaultProps;
