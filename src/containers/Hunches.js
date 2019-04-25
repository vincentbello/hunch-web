// @flow
import * as React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';

import useDocumentTitle from 'hooks/useDocumentTitle';
import { HUNCH_VIEW_TYPES } from 'constants/view-types';
import type { ViewType } from 'types/hunch';
import type { RouterProps } from 'types/router';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { media, spacing } from 'theme/sizes';

import HunchList from 'components/HunchList';
import SectionHeader from 'components/SectionHeader';

type Props = CurrentUserProps & RouterProps;

const Container = styled.div`
  margin: ${spacing(3, 0, 2, 2)};
  display: flex;

  ${media.mobile(`flex-direction: column;`)}
`;

const Main = styled.div`
  flex: 2 0 0;
  margin-right: ${spacing(4)};
  ${media.mobile(`order: 2; margin-right: ${spacing(2)};`)}
`;

const Aside = styled.aside`
  flex: 1 0 0;
  ${media.mobile`order: 1;`}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ListContainer = styled.div`
  padding-top: ${spacing(2)};
  flex: 1 0 0;
`;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: ${spacing(2)};
`;

const NavItem = styled.li`
  flex: 1 0 0;
  margin-right: ${spacing(2)};
  list-style-type: none;
  text-align: center;

  &:last-of-type {
    margin-right: 0;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  transition: background-color 250ms;
  border-radius: 4px;
  padding: ${spacing(1, 2)};
  color: ${colors.links.base};

  &:hover {
    background-color: ${colors.links.underlay};
  }

  &.__activeNavLink__ {
    font-weight: bold;

    &:hover {
      background: none;
    }
  }
`;

function Hunches({ currentUser, history, match }: Props): React.Node {
  useDocumentTitle('Hunch');
  if (!match.params.type) return <Redirect to="/hunches/active" />;
  return (
    <Container>
      <Main>
        <Wrapper>
          <SectionHeader>My Hunches</SectionHeader>
          <NavList>
            {HUNCH_VIEW_TYPES.map((viewType: ViewType): React.Node => (
              <NavItem key={viewType.key}>
                <StyledLink exact to={`/hunches/${viewType.key.toLowerCase()}`} activeClassName="__activeNavLink__">
                  {viewType.title}
                </StyledLink>
              </NavItem>
            ))}
          </NavList>
          <ListContainer>
            <HunchList hunchListType={match.params.type ? match.params.type.toUpperCase() : HUNCH_VIEW_TYPES[0].key} user={currentUser} />
          </ListContainer>
        </Wrapper>
      </Main>
      <Aside>
        <SectionHeader>Hunch Requests</SectionHeader>
        <HunchList hunchListType="REQUESTED" user={currentUser} aside />
      </Aside>
    </Container>
  );
}
Hunches.displayName = 'HunchesContainer';

export default withCurrentUser(Hunches);
