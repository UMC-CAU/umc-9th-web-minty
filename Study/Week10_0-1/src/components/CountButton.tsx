import { memo } from 'react';

interface ICountButton {
  onClick: () => void;
  count: number;
}

const CountButton = ({ onClick, count }: ICountButton) => {
  console.log("CountButton 렌더링"); // 렌더링 확인용
  
  return (
    <div className='flex flex-col items-center p-4 border rounded-lg gap-2'>
      <div>{count}</div>
      <button 
        onClick={onClick}
        className='border p-2 rounded-lg bg-blue-100 hover:bg-blue-200'
      >
        카운트 증가
      </button>
    </div>
  );
};

export default memo(CountButton);
