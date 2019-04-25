// @flow
import * as React from 'react';

import styled from '@emotion/styled';
import { media, spacing } from 'theme/sizes';

import { HUNCH_VIEW_TYPES } from 'constants/view-types';
import GameList from 'containers/GameList';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import HunchList from 'components/HunchList';
import SectionHeader from 'components/SectionHeader';
import UserCard from 'components/UserCard';

const Container = styled.div`
  margin: ${spacing(2, 0, 2, 2)};
  display: flex;

  ${media.tablet(`margin: ${spacing(2)};`)}
`;

const Main = styled.div`
  flex: 2 0 0;
  margin-right: ${spacing(4)};
  ${media.tablet`margin-right: 0;`}
`;
const Aside = styled.aside`
  flex: 1 0 0;
  ${media.tablet`display: none;`}
`;

const Section = styled.section`
  margin-bottom: ${spacing(4)};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

function Home({ currentUser }: CurrentUserProps) {
  return (
    <Container>
      <Main>
        <Section>
          <GameList canCreateHunch next={3} withHeader />
        </Section>
        <Section>
          <SectionHeader>My Active Hunches</SectionHeader>
          <HunchList hunchListType={HUNCH_VIEW_TYPES[0].key} user={currentUser} />
        </Section>
      </Main>
      <Aside>
        <UserCard display isCurrent small user={currentUser} />
      </Aside>
    </Container>
  );
}

export default withCurrentUser(Home);
