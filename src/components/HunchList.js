// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_HUNCHES from 'graphql/queries/getHunches';

import { type Error } from 'types/apollo';
import { type Hunch, type HunchListType } from 'types/hunch';
import { type RouterProps } from 'types/router';
import { type User } from 'types/user';

import styled from '@emotion/styled';
import { spacing } from 'theme/sizes';

import { FiPlus } from 'react-icons/fi';
import Button from 'components/Button';
import HunchCell from 'components/HunchCell';
import DerivedStateSplash from 'components/DerivedStateSplash';
import Splash from 'components/Splash';

type Props = RouterProps & {
  aside: boolean,
  hunchesQuery: {
    loading: boolean,
    error: Error,
    data: Array<Hunch>,
    networkStatus: number,
    refetch: () => void,
  },
  hunchListType: HunchListType,
  user: User,
};

const UnorderedList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: ${spacing(2)};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

function HunchList({ aside, hunchesQuery: { hunches, error, loading, networkStatus, refetch }, hunchListType, user }: Props): React.Node {
  const renderHunches = (hunches: Array<Hunch>): React.Node => {
    if (hunches.length === 0) {
      return (
        <Splash
          heading={`You have no ${hunchListType.toLowerCase()} hunches.`}
          small={aside}
          visualName="meh-lightbulb"
          visualType="illustration"
          renderSubhead={hunchListType === 'ACTIVE' ? (): React.Node => (
            <Button
              asLink
              to="/hunch/new"
              buttonTitle="Create One"
              leftIcon={<FiPlus />}
              type="tertiary"
              size="large"
            />
          ) : null}
        />
      );
    }

    return (
      <UnorderedList>
        {hunches.map((hunch: Hunch): React.Node => (
          <ListItem key={hunch.id}>
            <HunchCell hunch={hunch} userId={user.id} />
          </ListItem>
        ))}
      </UnorderedList>
    );
  };

  return (
    <DerivedStateSplash error={error} loading={loading} withCachedData={Boolean(hunches)}>
      {Boolean(hunches) && renderHunches(hunches)}
    </DerivedStateSplash>
  );
}
HunchList.displayName = 'HunchList';
HunchList.defaultProps = { aside: false };

export default graphql(GET_HUNCHES, {
  name: 'hunchesQuery',
  options: ({ hunchListType }) => ({
    notifyOnNetworkStatusChange: true,
    variables: { hunchListType },
  }),
})(HunchList);
