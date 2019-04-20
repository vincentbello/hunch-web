// @flow
import * as React from 'react';
import { compose, graphql, Query } from 'react-apollo';
import REMOVE_FAVORITE_TEAM from 'graphql/mutations/removeFavoriteTeam';
import { LEAGUE_VIEW_TYPES } from 'constants/view-types';
import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';
import FavoritesList from 'components/FavoritesList';
import SectionHeader from 'components/SectionHeader';
import TeamSelect from 'components/TeamSelect';

type Props = {
  removeFavoriteTeam: ({ variables: { teamId: number } }) => void,
};

const Content = styled.div`margin: ${spacing(2)};`;
const Container = styled.div`margin-bottom: ${spacing(4)};`;

function Favorites(props: Props): React.Node {
  const [viewIndex] = React.useState(0);
  return (
    <Content>
      <Container>
        <SectionHeader>My Favorite Teams</SectionHeader>
        <FavoritesList
          editMode
          mine
          userId={null}
          remove={(teamId: number): void => props.removeFavoriteTeam({ variables: { teamId } })}
        />
      </Container>
      <SectionHeader>Teams</SectionHeader>
      <TeamSelect />
    </Content>
  );
}
Favorites.displayName = 'FavoritesContainer';

export default graphql(REMOVE_FAVORITE_TEAM, { name: 'removeFavoriteTeam', options: { refetchQueries: ['GetFavoriteTeams'] } })(Favorites);
