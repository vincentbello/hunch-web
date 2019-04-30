// @flow
import { useState } from 'react';

export default function useInputHandler() {
  const [value, setValue] = useState('');
  return { value, onChange: (evt: SyntheticEvent<HTMLInputElement>) => setValue(evt.target.value) };
};
