// @flow
import * as React from 'react';

// import { HUNCH_VIEW_TYPES } from 'constants/view-types';
// import { getViewIndex, getHunchListType } from 'selectors/hunches';
import withCurrentUser, { type CurrentUserProps } from 'hocs/withCurrentUser';

import { type HunchListType } from 'types/hunch';

import HunchList from 'components/HunchList';
// import TabView from 'src/components/TabView';

type Props = {}; // CurrentUserProps;

function Hunches({ currentUser }: Props): React.Node {
  return (
    <HunchList hunchListType="ACTIVE" user={currentUser} />
    // <TabView
    //   navigationState={{
    //     index: viewIndex,
    //     routes: HUNCH_VIEW_TYPES,
    //   }}
    //   onIndexChange={actions.setViewIndex}
    //   renderScene={(): React.Node => <HunchList hunchListType={hunchListType} user={currentUser} />}
    // />
  );
}
Hunches.displayName = 'HunchesContainer';

export default withCurrentUser(Hunches);
