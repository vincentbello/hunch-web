// @flow
import { useEffect } from 'react';

export default function useUnsavedAlert(alertMessage, showAlert = false) {
  useEffect(() => {
    const alert = evt => {
      evt.preventDefault();
      evt.returnValue = alertMessage;
      return alertMessage;
    };
    if (showAlert) window.addEventListener('beforeunload', alert);
    return () => {
      if (!showAlert) window.removeEventListener('beforeunload', alert);
    };
  }, [alertMessage, showAlert]);
}
