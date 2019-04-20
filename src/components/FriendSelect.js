// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import GET_USERS from 'graphql/queries/getUsers';
import { type Error } from 'types/apollo';
import type { User } from 'types/user';
import useInputFilter from 'hooks/useInputFilter';
import { chain } from 'utils/functions';

import { FiX } from 'react-icons/fi';

import Button from 'components/Button';
import DerivedStateSplash from 'components/DerivedStateSplash';
import Dropdown, { type DropdownActions, type TriggerContext } from 'components/Dropdown';
import UserCell from 'components/UserCell';

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
  background-color: ${colors.transparent};
  border: none;
  box-shadow: none;
  font-size: 15px;
  outline: none;
  padding: ${spacing(2)};
`;

const FriendList = styled.ul(common.reset.list);
const FriendItem = styled.li(common.reset.item);

type Props = {
  friendsQuery: {
    loading: boolean,
    error: Error,
    teams: User[],
  },
  value: User | null,
  onSelect: null | (friend: User) => void,
};

function FriendSelect({ friendsQuery, value, onSelect }: Props) {
  const [filteredUsers, inputProps] = useInputFilter(friendsQuery.users);

  // const select = (user: User) => {
  //   onSelect(user);

  // }

  return (
    <Container>
      {value === null ? (
        <Dropdown
          preventDefaultClickEvents
          renderTrigger={(context: TriggerContext) => (
            <Input
              placeholder="Select a friend..."
              ref={context.props.ref}
              onFocus={() => context.toggle(true)}
              onBlur={() => context.toggle(false)}
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
                      <UserCell inList user={user} onClick={chain(() => onSelect(user), () => actions.toggle(false))} />
                    </FriendItem>
                  ))}
                </FriendList>
              </DerivedStateSplash>
            </DropdownContent>
          )}
        </Dropdown>
      ) : (
        <UserCell user={value} renderMeta={() => <Button icon={<FiX />} type="tertiary" onClick={() => onSelect(null)} />} />
      )}
    </Container>
  );
}

export default graphql(GET_USERS, { name: 'friendsQuery', options: { variables: { userListType: 'FRIENDS' } } })(FriendSelect);
