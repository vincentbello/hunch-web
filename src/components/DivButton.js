// @flow
import * as React from 'react';
import { isDescendantOfElementNames } from 'utils/dom';
import styled from '@emotion/styled';

type Props = {
  children: React.Node,
  onClick: (evt: SyntheticEvent<HTMLDivElement>) => void,
};

const Div = styled.div`cursor: pointer;`;

export default function DivButton({ children, onClick, ...buttonProps }: Props) {
  const clickHandler = (evt: SyntheticEvent<HTMLDivElement>) => {
    if (!isDescendantOfElementNames(evt.target, ['button', 'a', 'input'])) {
      onClick(evt);
      evt.stopPropagation();
    }
  };

  return (
    <Div role="button" {...buttonProps} onClick={clickHandler}>
      {children}
    </Div>
  );
}
