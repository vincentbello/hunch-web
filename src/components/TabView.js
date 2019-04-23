// @flow
import * as React from 'react';

import styled from '@emotion/styled';
import { darken } from 'polished';
import colors from 'theme/colors';
import common from 'theme/common';
import { spacing } from 'theme/sizes';

type View = {
  key: string,
  title: string,
};

type Props = {
  views: View[],
  renderScene: (view: View) => React.Node,
};

const Scene = styled.div`height: 100%;`;

const TabList = styled.ul`
  ${common.reset.list}
  margin-bottom: ${spacing(2)};
  overflow-x: auto;
  white-space: nowrap;
`;

const Tab = styled.li`
  ${common.reset.item}
  display: inline-block;
  vertical-align: middle;
  margin-right: ${spacing(2)};

  &:last-of-type {
    margin-right: 0;
  }
`;

const Button = styled.button`
  color: ${colors.brand.primary};
  padding: ${spacing(1)};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 250ms;
  font-weight: ${props => props.selected ? '900' : '500'};
  font-size: 14px;
  max-width: 72px;
  white-space: pre-wrap;
  text-align: center;
  outline: none;

  &:hover {
    color: ${darken(0.25, colors.brand.primary)}
  }
`;

export default function TabView({ views, renderScene }: Props) {
  const [viewIndex, setViewIndex] = React.useState(0);
  return (
    <>
      <TabList>
        {views.map((view: View, index: number) => (
          <Tab key={view.key}>
            <Button onClick={() => setViewIndex(index)} selected={index === viewIndex}>{view.title}</Button>
          </Tab>
        ))}
      </TabList>
      <Scene>{renderScene(viewIndex)}</Scene>
    </>
  );
}
