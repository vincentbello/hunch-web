// @flow
import * as React from 'react';

export default function DivButton({ children, ...buttonProps }: {}) {
  return (
    <div role="button" {...buttonProps}>
      {children}
    </div>
  );
}
