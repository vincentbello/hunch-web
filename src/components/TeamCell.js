// @flow
import * as React from 'react';

import { type Team } from 'types/team';
import { spacing } from 'theme/sizes';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import typography from 'theme/typography';

import { FiCheck } from 'react-icons/fi';
import Image from 'components/Image';

// const styles = StyleSheet.create({
//   Team: {
//     backgroundColor: 'white',
//     borderRadius: 2,
//     padding: 4,
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   Team_muted: {
//     opacity: 0.25,
//   },
//   Team__label: {
//     marginTop: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   Team__labelHeading: {
//     ...Typography.h4,
//     lineHeight: 16,
//     fontWeight: 'bold',
//   },
//   Team__labelSubhead: {
//     ...Typography.h5,
//     lineHeight: 12,
//     fontSize: 12,
//     marginBottom: 2,
//     fontWeight: '500',
//   },
//   Team__selection: {
//     position: 'absolute',
//     right: -32,
//     top: -32,
//     width: 64,
//     height: 64,
//     backgroundColor: Colors.primary.green,
//     transform: [{ rotate: '45deg' }],
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   Team__selectionIcon: {
//     transform: [{ rotate: '-45deg' }],
//     fontWeight: 'bold',
//   }
// });

type Props = {
  away: boolean,
  muted: boolean,
  selected: boolean,
  team: Team,
};

const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 2px;
  padding: ${spacing(1)};
  position: relative;
  overflow: hidden;
  text-align: center;
  ${props => props.muted && `opacity: 0.25;`}
`;

const Label = styled.div`margin-top: ${spacing(1)};`;

const LabelSubhead = styled.div`
  ${typography.h5}
`;

const LabelHeading = styled.div`
  ${typography.h3}
  font-weight: bold;
`;

const Selection = styled.div`
  position: absolute;
  right: -32px;
  top: -32px;
  width: 64px;
  height: 64px;
  background-color: ${colors.primary.green};
  transform: rotate(45deg);
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const StyledFiCheck = styled(FiCheck)`
  font-size: 24px;
  color: ${colors.white};
  transform: rotate(-45deg);
  font-weight: bold;
`;

export default function TeamCell({ away, muted, selected, team }: Props) {
  return (
    <Container muted={muted}>
      <Image src={team.imageUrl} />
      <Label>
        <LabelSubhead>{team.firstName}</LabelSubhead>
        <LabelHeading>{team.lastName}</LabelHeading>
      </Label>
      {selected && (
        <Selection>
          <StyledFiCheck />
        </Selection>
      )}
    </Container>
  );
}
TeamCell.defaultProps = {
  away: false,
  muted: false,
  selected: false,
};
TeamCell.displayName = 'TeamCell';
