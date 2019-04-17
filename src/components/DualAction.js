// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';
import Button from 'components/Button';

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ActionItem = styled.div`
  flex: 1 0 0;
  ${props => props.left && `margin-right: ${spacing(2)}`}
`;

const Placeholder = styled.div`
  ${typography.base}
  color: ${colors.text.secondary};
  text-align: center;
`;

type Props = {
  canPerformPrimaryAction: boolean,
  canPerformSecondaryAction: boolean,
  primaryAction: () => void,
  secondaryAction: () => void,
  primaryLabel: string,
  secondaryLabel: string,
  primaryPlaceholder?: string,
  secondaryPlaceholder?: string,
};

const DualAction = ({
  canPerformPrimaryAction,
  canPerformSecondaryAction,
  primaryAction,
  secondaryAction,
  primaryLabel,
  secondaryLabel,
  primaryPlaceholder,
  secondaryPlaceholder,
}: Props): React.Node => (
  <Actions>
    <ActionItem left>
      {canPerformSecondaryAction ? (
        <Button block onClick={secondaryAction} type="secondary" buttonTitle={secondaryLabel} />
      ) : (
        <Placeholder>{secondaryPlaceholder}</Placeholder>
      )}
    </ActionItem>
    <ActionItem>
      {canPerformPrimaryAction ? (
        <Button block onClick={primaryAction} type="primary" buttonTitle={primaryLabel} />
      ) : (
        <Placeholder>{primaryPlaceholder}</Placeholder>
      )}
    </ActionItem>
  </Actions>
);

DualAction.displayName = 'DualAction';
DualAction.defaultProps = {
  primaryPlaceholder: '',
  secondaryPlaceholder: '',
};
export default DualAction;
