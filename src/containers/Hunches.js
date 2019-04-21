// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';

import useDocumentTitle from 'hooks/useDocumentTitle';
import { HUNCH_VIEW_TYPES } from 'constants/view-types';
import type { ViewType } from 'types/hunch';
import type { RouterProps } from 'types/router';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

import HunchList from 'components/HunchList';
// import TabView from 'src/components/TabView';

type Props = CurrentUserProps & RouterProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  padding-top: ${spacing(2)};
  flex: 1 0 0;
`;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: ${spacing(3)};
  border-bottom: 1px solid ${colors.borders.main};
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
  return (
    <Wrapper>
      <NavList>
        {HUNCH_VIEW_TYPES.map((viewType: ViewType, index: number): React.Node => (
          <NavItem key={viewType.key}>
            <StyledLink exact to={index === 0 ? '/' : `/hunches/${viewType.key.toLowerCase()}`} activeClassName="__activeNavLink__">
              {viewType.title}
            </StyledLink>
          </NavItem>
        ))}
      </NavList>
      <Container>
        <HunchList hunchListType={match.params.type ? match.params.type.toUpperCase() : HUNCH_VIEW_TYPES[0].key} user={currentUser} />
      </Container>
    </Wrapper>
  );
}
Hunches.displayName = 'HunchesContainer';

export default withCurrentUser(Hunches);
