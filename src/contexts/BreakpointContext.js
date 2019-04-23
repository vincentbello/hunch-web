// @flow
import * as React from 'react';
import { sizes } from 'theme/sizes';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function lockToBreakpoint(width: number): Breakpoint {
  if (width <= sizes.mobile) return 'mobile';
  if (width <= sizes.tablet) return 'tablet';
  return 'desktop';
}

const BreakpointContext = React.createContext();

export function BreakpointProvider(props): React.Node {
  const [breakpoint, setBreakpoint] = React.useState(lockToBreakpoint(window.innerWidth));

  React.useEffect(() => {
    function handler() {
      const currBreakpoint = lockToBreakpoint(window.innerWidth);
      if (currBreakpoint !== breakpoint) setBreakpoint(currBreakpoint);
    }

    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);

    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, [breakpoint]);

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {props.children}
    </BreakpointContext.Provider>
  );
}

export default BreakpointContext;
