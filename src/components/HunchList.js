// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_HUNCHES from 'graphql/queries/getHunches';

import { type Error } from 'types/apollo';
import { type Hunch, type HunchListType } from 'types/hunch';
import { type RouterProps } from 'types/router';
import { type User } from 'types/user';

import styled from '@emotion/styled';

import { FiPlus } from 'react-icons/fi';
import Button from 'components/Button';
import HunchCell from 'components/HunchCell';
import DerivedStateSplash from 'components/DerivedStateSplash';
import Splash from 'components/Splash';

type Props = RouterProps & {
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
`;

function HunchList({ history, hunchesQuery: { hunches, error, loading, networkStatus, refetch }, hunchListType, user }: Props): React.Node {
  const renderHunches = (hunches: Array<Hunch>): React.Node => {
    if (hunches.length === 0) {
      return (
        <Splash
          heading={`You have no ${hunchListType.toLowerCase()} hunches.`}
          visualName="meh-lightbulb"
          visualType="illustration"
          renderSubhead={hunchListType === 'ACTIVE' ? (): React.Node => (
            <Button
              buttonTitle="Create One"
              leftIcon={<FiPlus />}
              type="tertiary"
              size="large"
              onClick={() => history.push('/hunch/new')}
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

export default graphql(GET_HUNCHES, {
  name: 'hunchesQuery',
  options: ({ hunchListType }) => ({
    notifyOnNetworkStatusChange: true,
    variables: { hunchListType },
  }),
})(HunchList);
