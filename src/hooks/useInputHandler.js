// @flow
import { useState } from 'react';

export default function useInputHandler() {
  const [input, setInput] = useState('');
  return [input, (evt: SyntheticEvent<HTMLInputElement>) => setInput(evt.target.value)];
};
