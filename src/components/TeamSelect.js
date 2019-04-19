// @flow
import * as React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import GET_TEAMS from 'graphql/queries/getTeams';
import REMOVE_FAVORITE_TEAM from 'graphql/mutations/removeFavoriteTeam';
import SET_FAVORITE_TEAM from 'graphql/mutations/setFavoriteTeam';
import { LEAGUE_VIEW_TYPES } from 'constants/view-types';

import { type Team } from 'types/Team';
import useInputHandler from 'hooks/useInputHandler';
import { FiSearch } from 'react-icons/fi';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

import { FaStar, FaRegStar } from 'react-icons/fa';

import DerivedStateSplash from 'components/DerivedStateSplash';
import Dropdown, { type TriggerContext } from 'components/Dropdown';
import Image from 'components/Image';
import SectionHeader from 'components/SectionHeader';
import Splash from 'components/Splash';

type Props = {
  removeFavoriteTeam: ({ variables: { teamId: number } }) => void,
  setFavoriteTeam: ({ variables: { teamId: number } }) => void,
};

// const styles = StyleSheet.create({
//   team: {
//     backgroundColor: Colors.white,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: Colors.cellBorder,
//     paddingLeft: 8,
//     paddingRight: 12,
//     paddingTop: 4,
//     paddingBottom: 4,
//   },
//   teamLabel: {
//     flex: 1,
//     fontSize: 15,
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   teamLabel_strong: {
//     fontWeight: 'bold',
//   },
//   sectionHeader: {
//     ...Typography.h4,
//     fontWeight: '900',
//     paddingLeft: 8,
//     paddingRight: 8,
//     paddingTop: 8,
//     paddingBottom: 2,
//   },
// });

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
  const [input, setInput] = useInputHandler();
  const getTeamPressHandler = (team: Team): (() => void) => () => {
    const action = team.isFavorite ? 'removeFavoriteTeam' : 'setFavoriteTeam';
    props[action]({
      optimisticResponse: {
        [action]: { ...team, isFavorite: !team.isFavorite },
      },
      variables: { teamId: team.id },
    });
  };

  const renderTeams = (teams: Team[]) => {
    if (teams.length === 0) return <Splash heading="No matching teams." visualName="search" />;

    let filteredTeams = teams;
    if (input.length > 0) {
      const li = input.toLowerCase();
      filteredTeams = filteredTeams.filter((team: Team) =>
        team.firstName.toLowerCase().startsWith(li) || team.lastName.toLowerCase().startsWith(li));
    }

    return (
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
    );
  };

  return (
    <Dropdown
      preventDefaultClickEvents
      renderTrigger={(context: TriggerContext) => (
        <InputContainer ref={context.props.ref}>
          <Input
            placeholder="Add a team..."
            value={input}
            onChange={setInput}
            onFocus={() => context.toggle(true)}
            onBlur={() => context.toggle(false)}
          />
          <StyledIcon />
        </InputContainer>
      )}
    >
      <DropdownContent>
        <Query query={GET_TEAMS} variables={{ league: props.league }}>
          {({ loading, error, data: { teams } }): React.Node => (
            <DerivedStateSplash loading={loading} error={error}>
              {Boolean(teams) && renderTeams(teams)}
            </DerivedStateSplash>
          )}
        </Query>
      </DropdownContent>
    </Dropdown>
    //   <SectionHeader>My Favorite Teams</SectionHeader>
    //   <FavoritesList
    //     editMode
    //     mine
    //     userId={null}
    //     remove={(teamId: number): void => props.removeFavoriteTeam({ variables: { teamId } })}
    //   />
    //   <SectionHeader>Teams</SectionHeader>
    //   <TeamSelect league={LEAGUE_VIEW_TYPES[viewIndex].key} />
    //   <Query query={GET_TEAMS} variables={{ league: LEAGUE_VIEW_TYPES[viewIndex].key }}>
    //     {({ loading, error, data: { teams } }): React.Node => (
    //       <DerivedStateSplash loading={loading} error={error}>
    //         {Boolean(teams) && (
    //           teams.length === 0 ? <Splash heading="No teams in this league." visualName="search" /> : (
    //               {teams.map((team: Team) => (
    //                 <ListItem
    //               ))}
    //             </List>
    //             <FlatList
    //               data={teams}
    //               keyExtractor={(team: Team): string => `${team.id}`}
    //               renderItem={({ item: team }): React.Node => (
    //                 <TouchableOpacity style={styles.team} onPress={getTeamPressHandler(team)}>
    //                   <Image rounded size="small" url={team.imageUrl} />
    //                   <Text style={styles.teamLabel}>
    //                     {team.firstName}
    //                     {' '}
    //                     <Text style={styles.teamLabel_strong}>{team.lastName}</Text>
    //                   </Text>
    //                   <Icon name={team.isFavorite ? 'star' : 'star-o'} color={team.isFavorite ? Colors.primary.orange : Colors.textSecondary} size={22} />
    //                 </TouchableOpacity>
    //               )}
    //             />
    //           )
    //         )}
    //       </DerivedStateSplash>
    //     )}
    //   </Query>
    // </React.Fragment>
  );
}
TeamSelect.displayName = 'TeamSelect';

export default compose(
  graphql(REMOVE_FAVORITE_TEAM, { name: 'removeFavoriteTeam', options: { refetchQueries: ['GetFavoriteTeams'] } }),
  graphql(SET_FAVORITE_TEAM, { name: 'setFavoriteTeam', options: { refetchQueries: ['GetFavoriteTeams'] } }),
)(TeamSelect);
