import { memo } from 'react';

interface ITextInput {
  onChange: (text: string) => void;
}

const TextInput = ({ onChange }: ITextInput) => {
  console.log("TextInput 렌더링"); // 렌더링 확인용

  return (
    <input 
      type="text"
      onChange={(e) => onChange(e.target.value)}
      className='border p-4 rounded-lg'
      placeholder="텍스트를 입력하세요"
    />
  );
};

export default memo(TextInput);
