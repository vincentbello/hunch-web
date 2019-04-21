// @flow
import * as React from 'react';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { getPronoun } from 'utils/string';
import type { UserFriendship, FriendshipStatus, User } from 'types/user';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';
import UserCell from 'components/UserCell';

type ButtonAttrs = {
  disabled: boolean,
  icon: null | React.Node,
  label: string,
  primary: boolean,
  targetStatus: null | FriendshipStatus,
  confirmation: null | string,
};

type Props = {
  friendship: UserFriendship,
  user: User,
  updateFriendshipStatus: (status: FriendshipStatus) => void,
};

const ModalContent = styled.div(typography.h4);
const ModalFooter = styled.div`text-align: right;`;
const OffsetButton = styled(Button)`margin-left: ${spacing(1)}`;

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

function FriendshipButton({ friendship, user, updateFriendshipStatus }: Props): React.Node {
  const [isConfirming, setConfirm] = React.useState(false);
  const buttonAttrs = getButtonAttrs(friendship, user.id);
  if (buttonAttrs === null) return null;

  const { disabled, icon, label, primary, targetStatus, confirmation } = buttonAttrs;
  const unfriend = confirmation === 'UNFRIEND';
  const close = () => setConfirm(false);
  const open = () => {
    if (targetStatus === null) return;
    if (confirmation === null) {
      updateFriendshipStatus(targetStatus);
    } else {
      setConfirm(true);
    }
  };
  const confirm = () => {
    if (targetStatus !== null) updateFriendshipStatus(targetStatus);
    close();
  };

  return (
    <>
      <Button
        disabled={disabled}
        leftIcon={icon}
        buttonTitle={label}
        type={primary ? 'primary' : 'secondary'}
        onClick={open}
      />
      <Modal
        isOpen={isConfirming}
        close={close}
        renderFooter={() => (
          <ModalFooter>
            <Button type="secondary" buttonTitle="Cancel" onClick={close} />
            <OffsetButton
              type="primary"
              tint={unfriend ? colors.primary.red : undefined}
              buttonTitle={unfriend ? 'Unfriend' : 'Cancel Request'}
              onClick={confirm}
            />
          </ModalFooter>
        )}
      >
        {() => (
          <ModalContent>
            <UserCell emphasized user={user} />
            {unfriend ? (
              <>Are you sure you want to remove <strong>{user.firstName}</strong> from your friends? You will not be able to challenge {getPronoun(user.gender)} anymore.</>
            ) : (
              <>Are you sure you want to cancel your friend request to <strong>{user.firstName}</strong>?</>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  );
}

FriendshipButton.displayName = 'FriendshipButton';
export default FriendshipButton;
