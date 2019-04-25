// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ClassNames } from '@emotion/core';

import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';
import HunchCreationContext, { clearForm } from 'contexts/HunchCreationContext';

import Button from 'components/Button';
import EntityCell from 'components/EntityCell';
import NavIndicator from 'components/NavIndicator';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { media, sizes, spacing } from 'theme/sizes';

const PageContainer = styled.nav`
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.brand.primary};
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: ${spacing(2, 3)};
  box-sizing: border-box;
  width: 100%;
  max-width: ${sizes.desktop}px;
  ${media.mobile`max-width: 100%;`}
`;

const NavList = styled.ul`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NavItem = styled.li`
  display: inline-flex;
  position: relative;
  margin-right: ${spacing(4)};
  list-style-type: none;
  text-align: center;
  ${media.desktop(`margin-right: ${spacing(1)};`)}

  &:last-of-type {
    margin-right: 0;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  transition: color 250ms, background-color 250ms;
  border-radius: 4px;
  font-weight: 600;
  padding: ${spacing(1, 2)};
  color: ${colors.offwhite};

  &:hover {
    color: ${colors.white};
    background-color: ${colors.links.underlay};
  }
`;

const NavButton = styled(Button)`font-size: 16px;`;

const activeClassStyles = `
  font-weight: 700 !important;
  color: ${colors.white} !important;

  &:hover {
    background: none !important;
  }
`;

function Nav({ currentUser }: CurrentUserProps) {
  const [_, dispatch] = React.useContext(HunchCreationContext); // eslint-disable-line no-unused-vars
  return (
    <ClassNames>
      {({ css, cx }) => {
        const activeClassName = css(activeClassStyles);
        return (
          <PageContainer>
            <NavContainer>
              <StyledLink exact to="/" activeClassName={activeClassName}>Home</StyledLink>
              <NavList>
                <NavItem>
                  <StyledLink to="/hunches" activeClassName={activeClassName}>Hunches</StyledLink>
                  <NavIndicator type="hunches" />
                </NavItem>
                <NavItem>
                  <StyledLink exact to="/friends" activeClassName={activeClassName}>Friends</StyledLink>
                  <NavIndicator type="friends" />
                </NavItem>
                <NavItem>
                  <NavButton asLink buttonTitle="Create" to="/hunch/new" type="translucent" onClick={() => dispatch(clearForm())} />
                </NavItem>
                <NavItem>
                  <StyledLink exact to="/me" activeClassName={activeClassName}>
                    <EntityCell lightMode entity={currentUser} small />
                  </StyledLink>
                </NavItem>
              </NavList>
            </NavContainer>
          </PageContainer>
        );
      }}
    </ClassNames>
  );
}
export default withCurrentUser(Nav);
