// @flow
import * as React from 'react';

import styled from '@emotion/styled';
import { media, spacing } from 'theme/sizes';

import BreakpointContext from 'contexts/BreakpointContext';
import GameList from 'containers/GameList';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import UserCard from 'components/UserCard';

const Container = styled.div`
  margin: ${spacing(2, 0)};
  display: flex;

  ${media.mobile`margin: ${spacing(2)};`}
`;

const Main = styled.div`
  flex: 2 0 0;
  margin-right: ${spacing(4)};
  ${media.mobile`margin-right: 0;`}
`;
const Aside = styled.aside`flex: 1 0 0;`;

function Home({ currentUser }: CurrentUserProps) {
  const breakpoint = React.useContext(BreakpointContext);
  return (
    <Container>
      <Main>
        <GameList canCreateHunch next={5} withHeader />
      </Main>
      <Aside>
        {breakpoint !== 'mobile' && <UserCard display isCurrent small user={currentUser} />}
      </Aside>
    </Container>
  );
}

export default withCurrentUser(Home);
