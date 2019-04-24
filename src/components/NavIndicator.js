// @flow
import * as React from 'react';
import { compose, graphql } from 'react-apollo';

import GET_HUNCHES from 'graphql/queries/getHunches';
import GET_USERS from 'graphql/queries/getUsers';

import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';

type Props = {
  numRequests: number,
  type: 'friends' | 'hunches',
};

const Indicator = styled.span`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  margin: auto;
  background-color: ${colors.brand.secondary};
  animation: ${common.keyframes.pulse} 1s infinite;
`;

const NavIndicator = ({ numRequests }: Props) => numRequests > 0 && <Indicator />;
NavIndicator.displayName = 'NavIndicator';

export default compose(
  graphql(GET_HUNCHES, {
    options: () => ({ variables: { hunchListType: 'REQUESTED' } }),
    props: ({ data: { hunches } }) => ({ numRequests: hunches ? hunches.length : 0 }),
    skip: ({ type }) => type !== 'hunches',
  }),
  graphql(GET_USERS, {
    options: { variables: { userListType: 'FRIEND_REQUESTS' } },
    props: ({ data: { users } }) => ({ numRequests: users ? users.length : 0 }),
    skip: ({ type }) => type !== 'friends',
  }),
)(NavIndicator);
