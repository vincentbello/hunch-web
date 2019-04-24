// @flow
import * as React from 'react';
import { cssTransition, ToastContainer } from 'react-toastify';
import Button from 'components/Button';
import { FiX } from 'react-icons/fi';
import { ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';

const StyledButton = styled(Button)`align-self: flex-start;`;

export function CloseButton({ closeToast }) {
  return <StyledButton type="tertiary" icon={<FiX />} onClick={closeToast} />;
}

export default function Toast() {
  return (
    <ClassNames>
      {({ css }) => (
        <ToastContainer
          closeButton={<CloseButton />}
          className={css`
            top: 1em;
            right: 1em;
            z-index: 9999;
            width: 320px;
            box-sizing: border-box;
            position: fixed;
            padding: ${spacing(1)};
            color: ${colors.text.primary};
          `}
          toastClassName={css`
            ${common.shadow}
            background-color: ${colors.white};
            position: relative;
            min-height: 64px;
            box-sizing: border-box;
            margin-bottom: 1rem;
            padding: ${spacing(2)};
            border-radius: 2px;
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            cursor: pointer;
            border-left: 10px solid ${colors.primary.blue};

            &.Toastify__toast--success {
              border-color: ${colors.primary.green};
            }

            &.Toastify__toast--error {
              border-color: ${colors.primary.red};
            }

            &.Toastify__toast--warning {
              border-color: ${colors.primary.orange};
            }
          `}
          bodyClassName={css`
            flex: 1 0 0;
            margin: auto 0;
            line-height: 1.4rem;
          `}
          progressClassName={css`animation: noop linear 1;`}
          transition={cssTransition({
            enter: 'bounceIn',
            exit: 'bounceOut',
            duration: 500,
            appendPosition: false,
          })}
        />
      )}
    </ClassNames>
  );
}
