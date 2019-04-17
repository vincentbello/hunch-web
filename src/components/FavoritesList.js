// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_FAVORITE_TEAMS from 'graphql/queries/getFavoriteTeams';

import { type Team } from 'types/Team';

import styled from '@emotion/styled';
import { darken } from 'polished';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

import { FiMinus } from 'react-icons/fi';

import DerivedStateSplash from 'components/DerivedStateSplash';
import Image from 'components/Image';

const StyledFiMinus = styled(FiMinus)`
  color: ${colors.white};
  font-size: 15px;
`;

const EmptyText = styled.div`
  ${typography.h4}
  padding: ${spacing(2)};
  align-items: center;
  justify-content: center;
`;

const HorizontalList = styled.ul`
  margin: 0;
  overflow-x: auto;
  padding: ${props => props.padded ? spacing(3, 0, 0) : spacing(0, 0, 0, 1)};
`;

const ListItem = styled.li`
  width: 80px;
  margin: ${props => spacing(0, props.padded ? 4 : 2, 0, 1)};
  padding: ${spacing(2)};
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  background-color: ${colors.primary.red};
  transition: background-color 250ms;
  cursor: pointer;
  outline: none;
  position: absolute;
  padding: 0;
  top: ${spacing(-3)};
  right: ${spacing(-3)};
  height: ${spacing(5)};
  width: ${spacing(5)};
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background-color: ${darken(0.06, colors.primary.red)};
  }
  &:active {
    background-color: ${darken(0.12, colors.primary.red)};
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

type Props = {
  editMode: boolean,
  favoriteTeamsQuery: {
    loading: boolean,
    error: Error,
    favoriteTeams: Array<Team>,
  },
  mine: boolean,
  userId: number | null,
  remove: (teamId: number) => void,
};

const FavoritesList = ({ editMode, favoriteTeamsQuery: { loading, error, favoriteTeams }, mine, userId, remove }): React.Node => (
  <DerivedStateSplash size="small" loading={loading} error={error}>
    {Boolean(favoriteTeams) && (
      favoriteTeams.length === 0 ? (
        <EmptyText>{editMode ? 'Add favorite teams below.' : 'No favorite teams.'}</EmptyText>
      ) : (
        <HorizontalList padded={editMode}>
          {favoriteTeams.map((team: Team) => (
            <ListItem key={team.id} padded={editMode}>
              {editMode && (
                <RemoveButton onClick={(): void => remove(team.id)}>
                  <StyledFiMinus />
                </RemoveButton>
              )}
              <Image rounded src={team.imageUrl} />
              <Label>{team.abbreviation}</Label>
            </ListItem>
          ))}
        </HorizontalList>
      )
    )}
  </DerivedStateSplash>
);

export default graphql(GET_FAVORITE_TEAMS, {
  name: 'favoriteTeamsQuery',
  options: ({ userId }: Props) => ({ variables: { userId } }),
})(FavoritesList);
