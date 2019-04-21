// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { Mutation } from 'react-apollo';
import LOGOUT from 'graphql/mutations/logout';
import { FiLogOut } from 'react-icons/fi';

import { darken } from 'polished';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

import Button from 'components/Button';
import Modal from 'components/Modal';

const ModalContent = styled.div(typography.h4);
const ModalFooter = styled.div`text-align: right;`;
const OffsetButton = styled(Button)`margin-left: ${spacing(1)}`;

function LogoutButton({ history }) {
  const [isConfirming, setConfirming] = React.useState(false);
  const close = () => setConfirming(false);
  return (
    <Mutation mutation={LOGOUT}>
      {(logout, { client, loading }): React.Node => (
        <>
          <Button
            block
            buttonTitle="Log Out"
            disabled={loading}
            leftIcon={<FiLogOut />}
            tint={colors.primary.red}
            type="tertiary"
            size="large"
            onClick={() => setConfirming(true)}
          />
          <Modal
            isOpen={isConfirming}
            close={close}
            renderFooter={() => (
              <ModalFooter>
                <Button type="secondary" buttonTitle="Cancel" onClick={close} />
                <OffsetButton
                  buttonTitle="Log Out"
                  tint={colors.primary.red}
                  onClick={async (): Promise<void> => {
                    await logout();
                    client.resetStore();
                    setConfirming(false);
                    history.push('/login');
                  }}
                />
              </ModalFooter>
            )}
          >
            {() => <ModalContent>Are you sure you want to log out?</ModalContent>}
          </Modal>
        </>
      )}
    </Mutation>
  );
}

LogoutButton.displayName = 'LogoutButton';
export default withRouter(LogoutButton);
