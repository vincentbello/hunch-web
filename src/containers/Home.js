// @flow
import * as React from 'react';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';

import GameList from 'containers/GameList';

const Container = styled.div`margin: ${spacing(2)};`;

export default function Home() {
  return (
    <Container>
      <GameList canCreateHunch next={5} withHeader />
    </Container>
  );
}
