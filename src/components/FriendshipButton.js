// @flow
import * as React from 'react';
import Button from 'components/Button';
import { type UserFriendship, type FriendshipStatus } from 'types/user';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';

type ButtonAttrs = {
  disabled: boolean,
  icon: null | React.Node,
  label: string,
  primary: boolean,
  targetStatus: null | FriendshipStatus,
  confirmation: null | string,
};

type Props = {
  name: string,
  friendship: UserFriendship,
  userId: number,
  updateFriendshipStatus: (status: FriendshipStatus) => void,
};

const getButtonAttrs = (friendship: UserFriendship, userId: number): null | ButtonAttrs => {
  if (!friendship || friendship.status === 'DELETED' || (friendship.status === 'REJECTED' && friendship.userId !== userId)) {
    return {
      disabled: false,
      icon: <FiUserPlus />,
      label: 'Add Friend',
      primary: true,
      targetStatus: 'PENDING',
      confirmation: null,
    };
  }

  if (friendship.status === 'ACTIVE') {
    return {
      disabled: false,
      icon: <FiUserCheck />,
      label: 'Friends',
      primary: false,
      targetStatus: 'DELETED',
      confirmation: 'UNFRIEND',
    };
  }

  if (friendship.status === 'PENDING') {
    return {
      disabled: friendship.userId === userId,
      icon: null,
      label: friendship.userId === userId ? 'Received Request' : 'Requested',
      primary: false,
      targetStatus: friendship.userId === userId ? null : 'DELETED',
      confirmation: 'CANCEL_REQUEST',
    };
  }

  return null;
};

function FriendshipButton({ name, friendship, userId, updateFriendshipStatus }: Props): React.Node {
  const onPressHandler = (targetStatus: FriendshipStatus | null, confirmation: string | null): (() => void) => () => {
    if (targetStatus === null) return;
    if (confirmation !== null) {
      const unfriend = confirmation === 'UNFRIEND';
      // ActionSheetIOS.showActionSheetWithOptions({
      //   options: ['Cancel', unfriend ? 'Unfriend' : 'Cancel Request'],
      //   cancelButtonIndex: 0,
      //   destructiveButtonIndex: 1,
      //   message: unfriend ? `Are you sure you want to remove ${name} from your friends? You will not be able to challenge them anymore.` : `Are you sure you want to cancel your friend request to ${name}?`,
      // },
      // (buttonIndex: number) => {
      //   if (buttonIndex === 1 && targetStatus !== null) updateFriendshipStatus(targetStatus);
      // });
      return;
    }

    updateFriendshipStatus(targetStatus);
  };

  const buttonAttrs = getButtonAttrs(friendship, userId);
  if (buttonAttrs === null) return null;
  return (
    <Button
      disabled={buttonAttrs.disabled}
      leftIcon={buttonAttrs.icon}
      title={buttonAttrs.label}
      type={buttonAttrs.primary ? 'primary' : 'secondary'}
      onClick={onPressHandler(buttonAttrs.targetStatus, buttonAttrs.confirmation)}
    />
  );
}

FriendshipButton.displayName = 'FriendshipButton';
export default FriendshipButton;
