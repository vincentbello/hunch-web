// @flow
import { useEffect } from 'react';

export default function useUnsavedAlert(alertMessage, passthrough = false) {
  useEffect(() => {
    const alert = evt => {
      evt.preventDefault();
      evt.returnValue = alertMessage;
      return alertMessage;
    };
    if (!passthrough) window.addEventListener('beforeunload', alert);
    return () => {
      if (!passthrough) window.removeEventListener('beforeunload', alert);
    };
  }, [alertMessage, passthrough]);
}
