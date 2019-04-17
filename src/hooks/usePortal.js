// @flow
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function usePortal() {
  const portalRef = useRef(null);
  useEffect(() => {
    const portalEl = document.createElement('div');
    portalRef.current = portalEl;
    document.body.appendChild(portalEl);
    return () => document.body.removeChild(portalEl);
  }, []);

  return node => portalRef.current !== null && createPortal(node, portalRef.current);
}
