import gql from 'graphql-tag';
import gameFragment from 'graphql/fragments/game';

export default gql`
  ${gameFragment}

  query UpcomingGames($date: String, $next: Int, $league: LeagueType!) {
    upcomingGames(date: $date, next: $next, league: $league) {
      ...gameFields
    }
  }
`;
