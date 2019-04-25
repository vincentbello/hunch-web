// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { type Hunch } from 'types/hunch';
import type { RouterProps } from 'types/router';
import HunchResponseActions from 'components/HunchResponseActions';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { media, spacing } from 'theme/sizes';

type Props = RouterProps & {
  currentId: number,
  hunch: Hunch,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  flex: 1 0 0;
  margin-right: ${spacing(2)};
`;

function HunchActions({ currentId, history, hunch }: Props) {
  const isBettor = hunch.bettor.id === currentId;
  const other = isBettor ? hunch.bettee : hunch.bettor;
  const didWin = hunch.winnerId === currentId;
  return (
    <Container>
      <Label>
        {hunch.winnerId !== null ?
          (didWin ? '🎉 You won!' : '😤 You lost...') :
          (isBettor ? `You challenged ${other.firstName}.` : `${other.firstName} challenged you.`)
        }
      </Label>
      {hunch.responded ? (
        <>
          <div>
            {didWin ? `${other.firstName} owes you ` : `You owe ${other.firstName} `}<strong>${hunch.amount}</strong>.
          </div>
        </>
      ) : (
        <HunchResponseActions hunch={hunch} isBettor={isBettor} onCancel={() => history.push('/hunches')} />
      )}
    </Container>
  );
}
export default withRouter(HunchActions);
