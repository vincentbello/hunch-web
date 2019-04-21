// @flow
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import GET_TEAMS from 'graphql/queries/getTeams';
import REMOVE_FAVORITE_TEAM from 'graphql/mutations/removeFavoriteTeam';
import SET_FAVORITE_TEAM from 'graphql/mutations/setFavoriteTeam';

import { type Error } from 'types/apollo';
import { type Team } from 'types/Team';
import useInputFilter from 'hooks/useInputFilter';
import { FiSearch } from 'react-icons/fi';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

import { FaStar, FaRegStar } from 'react-icons/fa';

import DerivedStateSplash from 'components/DerivedStateSplash';
import Dropdown, { type TriggerContext } from 'components/Dropdown';
import Image from 'components/Image';

type Props = {
  teamsQuery: {
    loading: boolean,
    error: Error,
    teams: Team[],
  },
  removeFavoriteTeam: ({ variables: { teamId: number } }) => void,
  setFavoriteTeam: ({ variables: { teamId: number } }) => void,
};

const InputContainer = styled.div`
  position: relative;
  width: 300px;
`;

const DropdownContent = styled.div`
  width: 300px;
  max-height: 400px;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid ${colors.brand.primary};
  border-top: none;
  border-radius: 0 0 2px 2px;
  background-color: ${colors.white};
`;

const Input = styled.input`
  padding: ${spacing(2, 5, 2, 3)};
  padding-right: 32px;
  border-radius: 2px;
  border: 1px solid ${colors.borders.main};
  box-shadow: none;
  font-size: 15px;
  outline: none;
  transition: border-color 250ms;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${colors.brand.primary};
  }
`;

const StyledIcon = styled(FiSearch)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TeamList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const TeamItem = styled.li`
  list-style-type: none;
  padding: ${spacing(1, 3, 1, 2)};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${colors.offwhite};
  }
`;

const Label = styled.div`
  margin-left: ${spacing(2)};
  flex: 1 0 0;
`;

const StyledFaStar = styled(FaStar)`color: ${colors.gold};`;
const StyledFaRegStar = styled(FaRegStar)`color: ${colors.gold};`;

const IconButton = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0 6px;
  transition: transform 250ms;

  &:hover {
    transform: scale(1.2);
  }
`;

function TeamSelect(props: Props): React.Node {
  const [filteredTeams, inputProps] = useInputFilter(props.teamsQuery.teams);
  const getTeamPressHandler = (team: Team): (() => void) => () => {
    const action = team.isFavorite ? 'removeFavoriteTeam' : 'setFavoriteTeam';
    props[action]({
      optimisticResponse: {
        [action]: { ...team, isFavorite: !team.isFavorite },
      },
      variables: { teamId: team.id },
    });
  };

  return (
    <Dropdown
      preventDefaultClickEvents
      renderTrigger={(context: TriggerContext) => (
        <InputContainer ref={context.props.ref}>
          <Input
            placeholder="Add a team..."
            onFocus={() => context.toggle(true)}
            onBlur={() => context.toggle(false)}
            {...inputProps}
          />
          <StyledIcon />
        </InputContainer>
      )}
    >
      <DropdownContent>
        <DerivedStateSplash loading={props.teamsQuery.loading} error={props.teamsQuery.error}>
          {Boolean(props.teamsQuery.teams) && (
            <TeamList>
              {filteredTeams.map((team: Team) => (
                <TeamItem key={team.id}>
                  <Image rounded size="small" src={team.imageUrl} />
                  <Label>{team.firstName} <strong>{team.lastName}</strong></Label>
                  <IconButton onClick={getTeamPressHandler(team)}>
                    {team.isFavorite ? <StyledFaStar /> : <StyledFaRegStar />}
                  </IconButton>
                </TeamItem>
              ))}
            </TeamList>
          )}
        </DerivedStateSplash>
      </DropdownContent>
    </Dropdown>
  );
}
TeamSelect.displayName = 'TeamSelect';

export default compose(
  graphql(GET_TEAMS, { name: 'teamsQuery' }),
  graphql(REMOVE_FAVORITE_TEAM, { name: 'removeFavoriteTeam', options: { refetchQueries: ['GetFavoriteTeams'] } }),
  graphql(SET_FAVORITE_TEAM, { name: 'setFavoriteTeam', options: { refetchQueries: ['GetFavoriteTeams'] } }),
)(TeamSelect);
