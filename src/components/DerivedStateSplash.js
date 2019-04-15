// @flow
import * as React from 'react';
import { type Error } from 'types/apollo';

import styled from '@emotion/styled';
import colors from 'theme/colors';
import common from 'theme/common';

import Spinner from 'react-spinkit';

type Props = {
  children: React.Node,
  error?: Error,
  loading: boolean,
  size: 'small' | 'medium' | 'large',
  withCachedData: boolean,
};

const defaultProps = {
  loading: false,
  error: undefined,
  size: 'large',
  withCachedData: false,
};

const Splash = styled.main(common.splash);
const StyledSpinner = styled(Spinner)`
  height: 50px;
  width: 50px;
`;

const DerivedStateSplash = ({ children, error, loading, size, withCachedData }: Props): React.Node => {
  if (withCachedData) return children;

  if (loading) return <Splash><StyledSpinner name="double-bounce" color={colors.brand.primary} fadeIn="none" /></Splash>;

  return Boolean(error) ? (
    // <Splash heading={error.errors.length > 0 ? error.errors[0].message : 'An error occurred.'} visualName="alert-triangle" />
    <div>{JSON.stringify(error)}</div>
  ) : children;
};

DerivedStateSplash.defaultProps = defaultProps;
DerivedStateSplash.displayName = 'DerivedStateSplash';
export default DerivedStateSplash;
