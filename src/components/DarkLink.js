import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from 'theme/colors';
import common from 'theme/common';

export default styled(Link)`
  ${common.reset.link}
  color: ${colors.text.primary};
  font-weight: 800;
  padding: 2px 0;
  border-radius: 2px;

  &:hover {
    background-color: ${colors.links.underlay};
  }
`;
