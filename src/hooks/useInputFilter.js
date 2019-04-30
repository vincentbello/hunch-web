// @flow
import { useMemo } from 'react';
import useInputHandler from 'hooks/useInputHandler';

export default function useInputFilter<T>(items?: T[]) {
  const inputProps = useInputHandler();
  const filteredData = useMemo(() => {
    if (!items) return [];
    const lower = inputProps.value.toLowerCase();
    return items.filter((item: T) => item.firstName.toLowerCase().startsWith(lower) || item.lastName.toLowerCase().startsWith(lower));
  }, [inputProps.value, items]);

  return [filteredData, inputProps];
}
