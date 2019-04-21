// @flow
import * as React from 'react';
import { FiRotateCw } from 'react-icons/fi';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';

import GameList from 'containers/GameList';
import Button from 'components/Button';
import SectionHeader from 'components/SectionHeader';

const Container = styled.div`margin: ${spacing(2)};`;
const Header = styled.header`display: flex;`;

export default function Home() {
  return (
    <Container>
      <Header>
        <SectionHeader grow>Upcoming Games</SectionHeader>
        <Button onClick={() => console.log('gamesQuery.refetch')} type="tertiary" icon={<FiRotateCw />} />
      </Header>
      <GameList canCreateHunch next={5} />
    </Container>
  );
}
