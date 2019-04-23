// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_USERS from 'graphql/queries/getUsers';
import { type Error } from 'types/apollo';
import type { User } from 'types/user';
import useInputFilter from 'hooks/useInputFilter';
import { chain } from 'utils/functions';

import DerivedStateSplash from 'components/DerivedStateSplash';
import Dropdown, { type DropdownActions, type TriggerContext } from 'components/Dropdown';
import EntityCell from 'components/EntityCell';

import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

const Container = styled.div`
  flex: 1 0 0;
`;

const DropdownContent = styled.div`
  width: 300px;
  max-height: 400px;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid ${colors.borders.main};
  background-color: ${colors.white};
`;

const Input = styled.input`
  ${props => props.large ? `width: 300px;` : ''}
  background-color: ${props => props.contained ? colors.white : colors.transparent};
  border: ${props => props.contained ? `1px solid ${colors.borders.main}` : 'none'};
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;
  font-size: ${props => props.large ? 20 : 15}px;
  outline: none;
  padding: ${props => spacing(props.large ? 3 : 2)};
`;

const FriendList = styled.ul(common.reset.list);
const FriendItem = styled.li(common.reset.item);

type Props = {
  autoFocus: boolean,
  contained: boolean,
  friendsQuery: {
    loading: boolean,
    error: Error,
    teams: User[],
  },
  large: boolean,
  value: User | null,
  selectUser: null | (friend: User) => void,
  renderUser: () => React.Node,
};

function FriendSelect({ autoFocus, contained, friendsQuery, large, value, selectUser, renderUser }: Props) {
  const [filteredUsers, inputProps] = useInputFilter(friendsQuery.users);
  return (
    <Container>
      {value === null ? (
        <Dropdown
          preventDefaultClickEvents
          renderTrigger={(context: TriggerContext) => (
            <Input
              autoFocus={autoFocus}
              contained={contained}
              large={large}
              placeholder="Select a friend..."
              ref={context.props.ref}
              onFocus={() => context.toggle(true)}
              // onBlur={() => context.toggle(false)}
              {...inputProps}
            />
          )}
        >
          {(actions: DropdownActions) => (
            <DropdownContent>
              <DerivedStateSplash loading={friendsQuery.loading} error={friendsQuery.error}>
                <FriendList>
                  {filteredUsers.map((user: User) => (
                    <FriendItem key={user.id}>
                      <EntityCell inList entity={user} onClick={chain(() => selectUser(user), () => actions.toggle(false))} />
                    </FriendItem>
                  ))}
                </FriendList>
              </DerivedStateSplash>
            </DropdownContent>
          )}
        </Dropdown>
      ) : renderUser()}
    </Container>
  );
}
FriendSelect.defaultProps = {
  contained: false,
  large: false,
  renderUser: () => null,
};

export default graphql(GET_USERS, { name: 'friendsQuery', options: { variables: { userListType: 'FRIENDS' } } })(FriendSelect);
