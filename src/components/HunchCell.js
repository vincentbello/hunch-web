// @flow
import * as React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import Truncate from 'react-truncate';

import { type Hunch } from 'types/hunch';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

// import HunchActions from 'components/HunchActions';
// import Image from 'components/Image';

const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 2px;
  margin: ${spacing(0, 2, 2)};
  padding: ${spacing(2)};
  display: flex;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.15);
`;

const Image = styled.img`
  border: 1px solid ${colors.borders.main};
  border-radius: 50%;
  height: 50px;
  width: 50px;
  align-self: flex-start;
`;

const Layout = styled.div`
  background-color: ${colors.white};
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex: 1 0 0;
`;

const Content = styled.div`
  flex: 1 0 0;
  margin-left: ${spacing(2)};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`;

const HeaderText = styled.span`
  ${typography.base}
  flex: 1 0 0;
  margin-right: ${spacing(1)};
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BodyText = styled.div`
  flex: 1 0 0;
  font-size: 13px;
`;

const MetaText = styled.div`
  text-align: right;
  font-size: 12px;
`;

const LabelSuperscript = styled.span`
  font-size: 14px;
  margin-left: 5px;
  margin-right: 1px;
`;

const LabelText = styled.span`
  font-size: 18px;
  font-weight: 600;
  ${props => props.isComplete && `color: ${props.won ? 'green' : 'red'};`}
`;
// const styles = StyleSheet.create({
//   hunch: {
//     backgroundColor: Colors.white,
//     borderRadius: 2,
//     marginLeft: 8,
//     marginRight: 8,
//     marginBottom: 8,
//     paddingLeft: 8,
//     paddingRight: 8,
//     paddingTop: 6,
//     paddingBottom: 6,
//   },
//   container: {
//     flexDirection: 'row',
//     backgroundColor: Colors.white,
//     borderRadius: 2,
//     alignItems: 'center',
//   },
//   image: {
//     alignSelf: 'flex-start',
//   },
//   content: {
//     flex: 1,
//     marginLeft: 8,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 2,
//   },
//   link: {
//     fontWeight: '800',
//   },
//   label: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   labelText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: Colors.textPrimary,
//   },
//   labelText_green: {
//     fontSize: 20,
//     fontWeight: '900',
//     color: Colors.primary.green,
//   },
//   labelText_red: {
//     fontSize: 20,
//     fontWeight: '900',
//     color: Colors.primary.red,
//   },
//   labelSuperscript: {
//     fontSize: 14,
//     marginLeft: 5,
//     marginRight: 1,
//   },
//   headerText: {
//     flex: 1,
//     color: Colors.textPrimary,
//     marginRight: 4,
//     ...Typography.base,
//   },
//   body: {
//     flex: 1,
//     fontSize: 13,
//     color: Colors.textSecondary,
//   },
//   meta: {
//     textAlign: 'right',
//     fontSize: 12,
//     color: Colors.primary.gray,
//   },
//   footer: {
//     paddingTop: 4,
//     paddingBottom: 4,
//   },
// });

type Props = {
  hunch: Hunch,
  disabled: boolean,
  userId: number,
};

export default function HunchCell({ disabled, hunch, userId }: Props): React.Node {
  const isBettor = userId === hunch.bettor.id;
  const isInvolved = userId === hunch.bettor.id || userId === hunch.bettee.id;
  const displayedImageUrl = ((): string | null => {
    if (isInvolved) return isBettor ? hunch.bettee.imageUrl : hunch.bettor.imageUrl;
    return hunch.bettor.imageUrl;
  })();

  return (
    <Container>
      <Layout>
        <Image src={displayedImageUrl} />
        <Content>
          <Header>
            <HeaderText>
              <Truncate>
                {isInvolved && isBettor ? <span>You</span> : <a>{hunch.bettor.firstName}</a>}
                <span> challenged </span>
                {isInvolved && !isBettor ? <span>you</span> : <a>{hunch.bettee.firstName}</a>}
              </Truncate>
            </HeaderText>
            <Label>
              {hunch.winnerId !== null && <LabelText>{hunch.winnerId === userId ? 'Won' : 'Lost'}</LabelText>}
              <LabelSuperscript>$</LabelSuperscript>
              <LabelText isComplete={hunch.winnerId !== null} won={hunch.winnerId === userId}>{hunch.amount}</LabelText>
            </Label>
          </Header>
          <BodyText>
            <Truncate lines={2}>{hunch.wager}</Truncate>
          </BodyText>
          <MetaText>{distanceInWordsToNow(hunch.createdAt, { addSuffix: true })}</MetaText>
        </Content>
      </Layout>
      {/* {!hunch.responded && (
        <View style={styles.footer}>
          <HunchActions hunch={hunch} isBettor={isBettor} />
        </View>
      )} */}
    </Container>
  );
}

HunchCell.defaultProps = {
  disabled: false,
  onPress() {},
};
