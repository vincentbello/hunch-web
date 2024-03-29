// @flow
import * as React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import Truncate from 'react-truncate-markup';
import { withRouter } from 'react-router';

import { type RouterProps } from 'types/router';
import { type Hunch } from 'types/hunch';

import styled from '@emotion/styled';
import common from 'theme/common';
import colors from 'theme/colors';
import typography from 'theme/typography';
import { spacing } from 'theme/sizes';

import DivButton from 'components/DivButton';
import DarkLink from 'components/DarkLink';
import HunchResponseActions from 'components/HunchResponseActions';

const StyledDivButton = styled(DivButton)`
  background-color: ${colors.white};
  border-radius: 2px;
  padding: ${spacing(2)};
  display: flex;
  flex-wrap: wrap;
  ${common.shadow}
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

const Footer = styled.footer`
  margin: ${spacing(2, 0, 0)};
  flex: 0 0 100%;
`;

type Props = RouterProps & {
  hunch: Hunch,
  disabled: boolean,
  userId: number,
};

function HunchCell({ disabled, history, hunch, userId }: Props): React.Node {
  const isBettor = userId === hunch.bettor.id;
  const isInvolved = userId === hunch.bettor.id || userId === hunch.bettee.id;
  const displayedImageUrl = ((): string | null => {
    if (isInvolved) return isBettor ? hunch.bettee.imageUrl : hunch.bettor.imageUrl;
    return hunch.bettor.imageUrl;
  })();

  return (
    <StyledDivButton onClick={() => history.push(`/hunch/${hunch.id}`)}>
      <Layout>
        <Image src={displayedImageUrl} />
        <Content>
          <Header>
            <Truncate>
              <HeaderText>
                {isInvolved && isBettor ? <span>You</span> : <DarkLink to={`/user/${hunch.bettor.id}`}>{hunch.bettor.firstName}</DarkLink>}
                <span> challenged </span>
                {isInvolved && !isBettor ? <span>you</span> : <DarkLink to={`/user/${hunch.bettee.id}`}>{hunch.bettee.firstName}</DarkLink>}
              </HeaderText>
            </Truncate>
            <Label>
              {hunch.winnerId !== null && <LabelText>{hunch.winnerId === userId ? 'Won' : 'Lost'}</LabelText>}
              <LabelSuperscript>$</LabelSuperscript>
              <LabelText isComplete={hunch.winnerId !== null} won={hunch.winnerId === userId}>{hunch.amount}</LabelText>
            </Label>
          </Header>
          <Truncate lines={2}>
            <BodyText>{hunch.wager}</BodyText>
          </Truncate>
          <MetaText>{distanceInWordsToNow(hunch.createdAt, { addSuffix: true })}</MetaText>
        </Content>
      </Layout>
      {!hunch.responded && (
        <Footer>
          <HunchResponseActions hunch={hunch} isBettor={isBettor} />
        </Footer>
      )}
    </StyledDivButton>
  );
}

HunchCell.defaultProps = {
  disabled: false,
  onPress() {},
};

export default withRouter(HunchCell);
