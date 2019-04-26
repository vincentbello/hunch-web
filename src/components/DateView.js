// @flow
import * as React from 'react';
import { addDays, format, isAfter, isToday, subDays } from 'date-fns';
import BreakpointContext from 'contexts/BreakpointContext';

import Button from 'components/Button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import styled from '@emotion/styled';
import typography from 'theme/typography';
import { media, spacing } from 'theme/sizes';

type Props = {
  past: boolean,
  renderScene: (date: string, today: boolean) => React.Node,
};

export const formatToDayStr = (date: Date): string => format(date, 'MMDDYYYY');
export const formatToReadableStr = (date: Date): string => format(date, 'ddd MMM D');

const Scene = styled.div`height: 100%;`;

const Actions = styled.div`
  margin: 0 auto ${spacing(2)};
  text-align: center;
`;

const Label = styled.div`
  ${typography.h3}
  display: inline-block;
  font-weight: 600;
  margin: ${spacing(0, 5)};

  ${media.mobile(`
    margin: ${spacing(0, 3)};
    ${typography.h4}
  `)}
`;


export default function DateView({ past, renderScene }: Props) {
  const breakpoint = React.useContext(BreakpointContext);
  const [date, setDate] = React.useState(() => new Date());
  const meta = React.useMemo(() => ({
    before: subDays(date, 1),
    after: addDays(date, 1),
    today: isToday(date),
  }), [date]);
  const buttonSize = breakpoint === 'mobile' ? 'small' : 'medium';
  return (
    <>
      <Actions>
        <Button
          buttonTitle={format(meta.before, 'ddd MMM D')}
          disabled={!past && isAfter(new Date(), meta.before)}
          leftIcon={<FiChevronLeft />}
          type="tertiary"
          size={buttonSize}
          onClick={() => setDate(meta.before)}
        />
        <Label>{format(date, breakpoint === 'mobile' ? 'ddd MMM D' : 'dddd MMMM D')}</Label>
        <Button
          buttonTitle={format(meta.after, 'ddd MMM D')}
          rightIcon={<FiChevronRight />}
          type="tertiary"
          size={buttonSize}
          onClick={() => setDate(meta.after)}
        />
      </Actions>
      <Scene>{renderScene(formatToDayStr(date), meta.today)}</Scene>
    </>
  );
}
DateView.defaultProps = { past: false };
