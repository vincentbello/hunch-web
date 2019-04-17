// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

const StatContainer = styled.div`width: 100%;`;

const StatRow = styled.div`
  display: flex;
  margin-top: ${props => spacing(props.first ? 0 : 4)};
`;

const StatCard = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatContent = styled.div`
  padding: ${spacing(1)};
  display: flex;
  align-items: center;
`;

const StatLabel = styled.div`
  ${typography.base}
  color: ${colors.text.secondary};
`;

const StatSuperscript = styled.span`
  font-size: 14px;
  position: relative;
  top: -4px;
  margin-right: 4px;
`;

const Stat = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.success ? colors.primary.green : props.error ? colors.primary.red : colors.text.primary};
`;

type Props = {
  stats: StatsGroup,
};

const UserStats = ({ stats }: Props): React.Node => (
  <StatContainer>
    <StatRow first>
      <StatCard>
        <StatContent>
          <Stat success={stats.won > 0}>{stats.won}</Stat>
        </StatContent>
        <StatLabel>Hunches Won</StatLabel>
      </StatCard>
      <StatCard>
        <StatContent>
          <Stat error={stats.played > stats.won}>
            {stats.played - stats.won}
          </Stat>
        </StatContent>
        <StatLabel>Hunches Lost</StatLabel>
      </StatCard>
      <StatCard>
        <StatContent>
          <Stat success={2 * stats.won > stats.played} error={2 * stats.won < stats.played}>
            {`${stats.won}-${stats.played - stats.won}`}
          </Stat>
        </StatContent>
        <StatLabel>Record</StatLabel>
      </StatCard>
    </StatRow>
    <StatRow>
      <StatCard>
        <StatContent>
          <StatSuperscript>$</StatSuperscript>
          <Stat>{stats.amountWon}</Stat>
        </StatContent>
        <StatLabel>Total Won</StatLabel>
      </StatCard>
      <StatCard>
        <StatContent>
          <StatSuperscript>$</StatSuperscript>
          <Stat>{stats.amountLost}</Stat>
        </StatContent>
        <StatLabel>Total Lost</StatLabel>
      </StatCard>
      <StatCard>
        <StatContent>
          <StatSuperscript>$</StatSuperscript>
          <Stat success={stats.amountWon > stats.amountLost} error={stats.amountWon < stats.amountLost}>
            {stats.amountWon === stats.amountLost ? '0' : (
              `${stats.amountWon > stats.amountLost ? '+' : '-'}${Math.abs(stats.amountWon - stats.amountLost)}`
            )}
          </Stat>
        </StatContent>
        <StatLabel>Net</StatLabel>
      </StatCard>
    </StatRow>
  </StatContainer>
);

UserStats.displayName = 'UserStats';
export default UserStats;
