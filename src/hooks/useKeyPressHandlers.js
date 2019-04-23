// @flow
import * as React from 'react';
import { isDescendantOfElementNames } from 'utils/dom';

let handlers = [];
let cachedHandlers = [];

type Handler = (evt: SyntheticKeyboardEvent<>) => void;

type KeycodeHandlers = {
  [keyCode: number | string]: () => void,
};

type Options = {
  deps?: *[],
  passthrough?: boolean,
  unique?: boolean,
};

/**
 * Hook for setting keypress handlers according to a map of handler functions. Handlers can respond to number keycodes, or to hotkeys such
 * as "mod+k" or "alt+n".
 * Handlers will be ignored if focus is inside an input, a textarea or a contenteditable element, since the documentument should relinquish
 * control to the user in that case.
 * The "unique" option allows the consuming component to ignore all other event handlers and only use the ones in its codeHandlers. This is
 * useful in the case of the Modal, where the escape key should close the modal, but any other keypress handlers set by components in its
 * background should be disabled. However, we can store the "background" handlers and re-enable them in the effect's cleanup function.
 */
export default function useKeyPressHandlers(codeHandlers: KeycodeHandlers, { deps = [], passthrough = false, unique = false }: Options = {}) {
  function handler(evt: SyntheticKeyboardEvent<>) {
    // Ignore event when inside an input, textarea, or contenteditable element
    if (!passthrough && (isDescendantOfElementNames(evt.target, ['input', 'textarea']) || evt.target.getAttribute('contenteditable') === 'true')) return;
    Object.keys(codeHandlers).forEach((key: string) => {
      // If specific key or hotkey, run handler
      if (key.length > 1 && key == evt.keyCode) { // eslint-disable-line eqeqeq
        evt.preventDefault();
        codeHandlers[key]();
      }
    });
  }

  React.useEffect((): (() => void) => {
    // If codeHandlers are unique, remove any existing handlers but cache them at the module level
    if (unique && handlers.length > 0) {
      cachedHandlers = [...handlers];
      handlers.forEach((cachedHandler: Handler) => {
        document.removeEventListener('keydown', cachedHandler);
      });
    }

    // Set the handler
    document.addEventListener('keydown', handler);
    handlers.push(handler);

    return () => {
      document.removeEventListener('keydown', handler);

      // If codeHandlers were unique, add the previous cached handlers back
      if (unique && cachedHandlers.length > 0) {
        cachedHandlers.forEach((cachedHandler: Handler) => {
          document.addEventListener('keydown', cachedHandler);
        });
        handlers = [...cachedHandlers];
      } else {
        handlers = [];
      }

      cachedHandlers = [];
    };
  }, deps);
}
