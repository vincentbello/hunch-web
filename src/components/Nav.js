// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ClassNames } from '@emotion/core';

import HunchCreationContext, { clearForm } from 'contexts/HunchCreationContext';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

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
    color: ${colors.links.hover};
    background-color: ${colors.links.underlay};
  }

  &.__activeNavLink__ {
    font-weight: bold;

    &:hover {
      background: none;
    }
  }
`;

export default function Nav() {
  const [_, dispatch] = React.useContext(HunchCreationContext); // eslint-disable-line no-unused-vars
  return (
    <ClassNames>
      {({ css, cx }) => {
        const activeClassName = css`
          font-weight: bold;

          &:hover {
            background: none;
          }
        `;
        return (
          <NavList>
            <NavItem>
              <StyledLink exact to="/" activeClassName={activeClassName}>Home</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink exact to="/hunches/active" activeClassName={activeClassName}>Hunches</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink exact to="/friends" activeClassName={activeClassName}>Friends</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink exact to="/me" activeClassName={activeClassName}>Me</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink exact to="/hunch/new" activeClassName={activeClassName} onClick={() => dispatch(clearForm())}>Create</StyledLink>
            </NavItem>
          </NavList>
        );
      }}
    </ClassNames>
  );
}
