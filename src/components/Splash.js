// @flow
import * as React from 'react';

// import Icon from 'react-native-vector-icons/Feather';

import styled from '@emotion/styled';
import common from 'theme/common';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';

const Container = styled.div(props => `
  ${common.splash}
  ${props.small && `height: auto;`}
`);
const Image = styled.img(props => `
  width: ${props.small ? 67.5 : 90}px;
  height: ${props.small ? 90 : 120}px;
  margin-bottom: ${spacing(props.small ? 2 : 4)};
`);
const Heading = styled.h3`
  ${props => props.small ? typography.h4 : typography.h3}
  ${props => props.small && `margin: ${spacing(1, 0, 2)};`}
  font-weight: ${props => props.small ? 500 : 600};
`;

type VisualType = 'icon' | 'illustration';

type Props = {
  fullScreen: boolean,
  grow: boolean,
  heading: string,
  inTabs: boolean,
  small: boolean,
  visualName: string,
  visualType: VisualType,
  renderSubhead: null | () => React.Node,
};

const Visual = ({ name, small, type }: { name: string, small: boolean, type: VisualType }): React.Node => {
  switch (type) {
    // case 'icon':
    //   return <Icon style={styles.icon} name={name} size={48} color={Colors.textPrimary} />;

    case 'illustration': {
      return <Image small={small} src={`/assets/illustrations/${name}.png`} />;
    }

    default:
      return null;
  }
};

const Splash = ({ heading, small, visualName, visualType, renderSubhead }: Props): React.Node => (
  <Container small={small}>
    <Visual name={visualName} type={visualType} small={small} />
    <Heading small={small}>{heading}</Heading>
    {renderSubhead !== null && renderSubhead()}
  </Container>
);

Splash.defaultProps = {
  grow: false,
  inTabs: false,
  fullScreen: false,
  small: false,
  visualType: 'illustration',
  renderSubhead: null,
};
Splash.displayName = 'Splash';
export default Splash;
