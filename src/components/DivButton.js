// @flow
import * as React from 'react';
import { isDescendantOfElementNames } from 'utils/dom';

type Props = {
  children: React.Node,
  onClick: (evt: SyntheticEvent<HTMLDivElement>) => void,
};

export default function DivButton({ children, onClick, ...buttonProps }: Props) {
  const clickHandler = (evt: SyntheticEvent<HTMLDivElement>) => {
    if (!isDescendantOfElementNames(evt.target, ['button', 'a', 'input'])) {
      onClick(evt);
      evt.stopPropagation();
    }
  };

  return (
    <div role="button" {...buttonProps} onClick={clickHandler}>
      {children}
    </div>
  );
}
