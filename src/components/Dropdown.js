// @flow
import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import useDimensions from 'hooks/useDimensions';
import usePortal from 'hooks/usePortal';

export type TriggerContext = {
  isOpen: boolean,
  props: {
    'aria-expanded': boolean,
    'data-toggle': string,
    ref: (el: HTMLElement) => void,
    onClick: () => void,
  },
  reposition: () => void,
};

type Props = {
  children: React.Node,
  onToggle: (isOpen: boolean) => void,
  renderTriggerSlot: (context: TriggerContext) => React.Node,
};

const Content = styled.div`
  position: absolute;
`;

export default function Dropdown({ children, onToggle, renderTriggerSlot }: Props) {
  const [contentRef, contentDimensions] = useDimensions();
  const [triggerRef, triggerDimensions] = useDimensions();
  const withPortal = usePortal();
  const [contentStyle, setContentStyle] = React.useState({});
  const [isOpen, setOpen] = React.useState(false);

  const position = () => {
    console.log('position...', triggerDimensions.bottom, triggerDimensions.left);
    const top = triggerDimensions.bottom;
    const left = triggerDimensions.left;
    if (top !== contentStyle.top || left !== contentStyle.top) setContentStyle({ top, left });
  };

  React.useLayoutEffect(() => {
    if (isOpen) position();
  }, [isOpen, triggerDimensions.bottom, triggerDimensions.left]);

  const toggle = (open: boolean) => {
    setOpen(open);
  };

  return (
    <React.Fragment>
      {renderTriggerSlot({
        isOpen,
        props: {
          'aria-expanded': isOpen,
          'data-toggle': 'dropdown',
          ref: triggerRef,
          onClick: () => setOpen(!isOpen),
        },
        reposition: position,
      })}
      {isOpen && withPortal(<Content style={contentStyle}>{children}</Content>)}
    </React.Fragment>
  );
}
Dropdown.defaultProps = {
  onToggle() {},
  renderTriggerSlot: () => null,
};
