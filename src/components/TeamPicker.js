// @flow
import * as React from 'react';
import { type Game } from 'types/game';

import DivButton from 'components/DivButton';
import TeamCell from 'components/TeamCell';

import styled from '@emotion/styled';
import common from 'theme/common';
import { spacing } from 'theme/sizes';

type Props = {
  game: Game,
  pickedTeamId: number | null,
  selectTeam: (teamId: number | null) => void,
};

const Container = styled.div`
  display: flex;
`;

const InlineDivButton = styled(DivButton)`
  ${common.shadow}
  flex: 1 0 0;
  margin-right: ${spacing(3)};

  &:last-of-type {
    margin-right: 0;
  }
`;

export default function TeamPicker({ game, pickedTeamId, selectTeam }: Props) {
  const select = (id: number) => selectTeam(pickedTeamId === null || pickedTeamId !== id ? id : null);
  return (
    <Container>
      <InlineDivButton onClick={() => select(game.awayTeam.id)}>
        <TeamCell
          team={game.awayTeam}
          muted={pickedTeamId !== null && game.awayTeam.id !== pickedTeamId}
          selected={pickedTeamId !== null && game.awayTeam.id === pickedTeamId}
        />
      </InlineDivButton>
      <InlineDivButton onClick={() => select(game.homeTeam.id)}>
        <TeamCell
          team={game.homeTeam}
          muted={pickedTeamId !== null && game.homeTeam.id !== pickedTeamId}
          selected={pickedTeamId !== null && game.homeTeam.id === pickedTeamId}
        />
      </InlineDivButton>
    </Container>
  );
}
TeamPicker.displayName = 'TeamPicker';
