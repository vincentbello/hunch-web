// @flow
import * as React from 'react';

// import Icon from 'react-native-vector-icons/Feather';

import styled from '@emotion/styled';
import common from 'theme/common';
import { spacing } from 'theme/sizes';
import typography from 'theme/typography';
// import Colors from 'theme/colors';
// import { SplashStyles, SplashStylesWithNav } from 'theme/app';

const Container = styled.div(common.splash);
const Image = styled.img`
  width: 90px;
  height: 120px;
  margin-bottom: ${spacing(4)};
`;
const Heading = styled.h3`
  ${typography.h3}
  font-weight: 600;
`;

// const styles = StyleSheet.create({
//   splash: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   splash_tabs: {
//     height: SplashStylesWithNav.height - 64,
//   },
//   icon: {
//     marginBottom: 16,
//   },
//   image: {
//     width: 90,
//     height: 120,
//     marginBottom: 16,
//   },
//   heading: {
//     ...Typography.h3,
//     fontWeight: '500',
//     color: Colors.textPrimary,
//   },
// });

type VisualType = 'icon' | 'illustration';

type Props = {
  fullScreen: boolean,
  grow: boolean,
  heading: string,
  inTabs: boolean,
  visualName: string,
  visualType: VisualType,
  renderSubhead: null | () => React.Node,
};

const Visual = ({ name, type }: { name: string, type: VisualType }): React.Node => {
  switch (type) {
    // case 'icon':
    //   return <Icon style={styles.icon} name={name} size={48} color={Colors.textPrimary} />;

    case 'illustration': {
      return <Image src={`/assets/illustrations/${name}.png`} />;
    }

    default:
      return null;
  }
};

const Splash = ({ heading, visualName, visualType, renderSubhead }: Props): React.Node => (
  <Container>
    <Visual name={visualName} type={visualType} />
    <Heading>{heading}</Heading>
    {renderSubhead !== null && renderSubhead()}
  </Container>
);

Splash.defaultProps = {
  grow: false,
  inTabs: false,
  fullScreen: false,
  visualType: 'illustration',
  renderSubhead: null,
};
Splash.displayName = 'Splash';
export default Splash;
