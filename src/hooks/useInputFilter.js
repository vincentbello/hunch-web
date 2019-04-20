// @flow
import { useMemo } from 'react';
import useInputHandler from 'hooks/useInputHandler';

export default function useInputFilter<T>(items?: T[]) {
  const [value, setValue] = useInputHandler();
  const filteredData = useMemo(() => {
    if (!items) return [];
    const lower = value.toLowerCase();
    return items.filter((item: T) => item.firstName.toLowerCase().startsWith(lower) || item.lastName.toLowerCase().startsWith(lower));
  }, [value, items]);

  return [filteredData, { value, onChange: setValue }];
}
