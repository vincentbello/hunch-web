// @flow
import * as React from 'react';

export default function useBeenOnScreen(ref: React.Ref<HTMLElement>, rootMargin: string = '50px'): boolean {
  // State and setter for storing whether element is visible
  const [hasBeenOnScreen, setHasBeenOnScreen] = React.useState(false);

  React.useEffect((): (() => void) => {
    if (typeof IntersectionObserver === 'undefined' || !IntersectionObserver) {
      setHasBeenOnScreen(true);
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        // Update state when observer callback fires
        if (entry.isIntersecting) setHasBeenOnScreen(true);
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);

    // Cleanup observer on unmount
    return (): void => observer.unobserve(ref.current);
  }, []); // Only run on mount and unmount

  return hasBeenOnScreen;
}
