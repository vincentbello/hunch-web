// @flow
import * as React from 'react';
import { Prompt } from 'react-router';
import { Mutation } from 'react-apollo';
import { chain } from 'utils/functions';
import CREATE_HUNCH_REQUEST from 'graphql/mutations/createHunchRequest';
import GET_HUNCHES from 'graphql/queries/getHunches';

import useUnsavedAlert from 'hooks/useUnsavedAlert';

import { FiSend } from 'react-icons/fi';
import Button from 'components/Button';

const onHunchCreate = (cache, { data: { createHunchRequest } }) => {
  const pendingHunchesQuery = { query: GET_HUNCHES, variables: { hunchListType: 'PENDING' } };
  try {
    const { hunches: pendingHunches } = cache.readQuery(pendingHunchesQuery);
    cache.writeQuery({ ...pendingHunchesQuery, data: { hunches: [...pendingHunches, createHunchRequest] } });
  } catch (err) {}
};

const UNSAVED_CHANGES_MESSAGE = 'Your Hunch has not been sent, are you sure you want to leave?';

type Props = {
  data: {},
  onCreated: () => void,
};

export default function CreateHunchButton({ data: { amount, bettee, bettorPickTeamId, gameId, wager }, onCreated }: Props) {
  const [creating, setCreating] = React.useState(false);
  const isFormCompleted = bettee !== null && amount > 0 && gameId !== null && bettorPickTeamId !== null;
  const variables = {
    variables: isFormCompleted ? { amount, betteeId: bettee.id, gameId, bettorPickTeamId, type: 'MONEY_LINE', wager } : {},
  };
  // useUnsavedAlert(UNSAVED_CHANGES_MESSAGE, isFormCompleted && !creating);

  return (
    <>
      {/* <Prompt when={isFormCompleted && !creating} message={UNSAVED_CHANGES_MESSAGE} /> */}
      <Mutation mutation={CREATE_HUNCH_REQUEST} update={onHunchCreate} onCompleted={onCreated}>
        {(createHunchRequest, { called, loading }): React.Node => (
          <Button
            block
            buttonTitle={called ? `${loading ? 'Sending...' : 'Sent!'}` : `Send${bettee ? ` ${bettee.firstName} a` : ''} Hunch Request`}
            disabled={called || !isFormCompleted}
            leftIcon={<FiSend />}
            size="large"
            onClick={chain(() => setCreating(true), () => createHunchRequest(variables))}
          />
        )}
      </Mutation>
    </>
  );
}
