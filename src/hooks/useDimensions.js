// @flow
import { useState, useCallback, useLayoutEffect } from 'react';

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(node.getBoundingClientRect().toJSON())
        );
      measure();

      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure);

      return () => {
          window.removeEventListener("resize", measure);
          window.removeEventListener("scroll", measure);
      };
    }
  }, [node]);

  return [ref, dimensions, node];
}
