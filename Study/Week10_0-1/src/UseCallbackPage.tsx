import { useState, useCallback } from 'react';
import CountButton from './components/CountButton';
import TextInput from './components/TextInput';

export default function UseCallbackPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleIncreaseCount = useCallback(() => {
    setCount(count + 10);
  }, [count]);

  const handleTextChange = useCallback((value: string) => {
    setText(value);
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
      <h1 className='text-2xl font-bold'>같이 배우는 리액트 UseCallback편</h1>
      
      <h2 className='text-xl'>Text: {text}</h2>

      <CountButton onClick={handleIncreaseCount} count={count} />
      
      <TextInput onChange={handleTextChange} />
    </div>
  );
}
