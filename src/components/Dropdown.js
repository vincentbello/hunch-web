// @flow
import * as React from 'react';
import styled from '@emotion/styled';
import usePortal from 'hooks/usePortal';

export type DropdownActions = {
  reposition: () => void,
  toggle: (open: boolean) => void,
};

export type TriggerContext = DropdownActions & {
  isOpen: boolean,
  props: {
    'aria-expanded': boolean,
    'data-toggle': string,
    ref: (el: HTMLElement) => void,
    onClick: () => void,
  },
};

type Props = {
  children: React.Node,
  preventDefaultClickEvents: boolean,
  onToggle: (isOpen: boolean) => void,
  renderTrigger: (context: TriggerContext) => React.Node,
};

const Content = styled.div`position: absolute;`;

export default function Dropdown({ children, preventDefaultClickEvents, onToggle, renderTrigger }: Props) {
  const contentRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const withPortal = usePortal();
  const [contentStyle, setContentStyle] = React.useState({});
  const [isOpen, setOpen] = React.useState(false);

  const position = () => {
    if (triggerRef.current === null) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setContentStyle({ top: rect.bottom, left: rect.left });
  };

  React.useLayoutEffect(() => {
    if (isOpen) position();
  }, [isOpen]);

  const toggle = (open: boolean) => {
    setOpen(open);
  };

  const handleClick = (evt: SyntheticClickEvent<>) => {
    if (contentRef.current !== null && contentRef.current.contains(evt.target)) {
      if (preventDefaultClickEvents) evt.preventDefault();
      return;
    }
    toggle(false);
  };

  const actions = { reposition: position, toggle };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      {renderTrigger({
        ...actions,
        isOpen,
        props: {
          'aria-expanded': isOpen,
          'data-toggle': 'dropdown',
          ref: triggerRef,
          onClick: () => setOpen(!isOpen),
        },
      })}
      {isOpen && withPortal(
        <Content ref={contentRef} style={contentStyle}>
          {typeof children === 'function' ? children(actions) : children}
        </Content>
      )}
    </>
  );
}
Dropdown.defaultProps = {
  preventDefaultClickEvents: false,
  onToggle() {},
  renderTrigger: () => null,
};
