import React, { useState, useMemo } from "react";
import { findPrimes } from "./utils/math"; 

export default function UseMemoPage() {
  const [limit, setLimit] = useState(10000);
  const [text, setText] = useState("");

  console.log("UseMemoPage 컴포넌트 렌더링");

  const primes = useMemo(() => {
    console.log(`findPrimes 함수 실행 (limit: ${limit})`);
    return findPrimes(limit);
  }, [limit]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">같이 배우는 리액트 - useMemo 편</h1>
      
      <div className="flex flex-col gap-2">
         <label>다른 입력 테스트 (리렌더링 확인용)</label>
         <input 
            type="text" 
            value={text} 
            onChange={handleChangeText}
            className="border p-2 rounded"
         />
      </div>

      <div className="flex flex-col gap-2">
        <label>숫자 입력 (소수 찾기)</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {primes.map((prime) => (
          <span key={prime} className="p-1 border rounded bg-gray-100">
            {prime}
          </span>
        ))}
      </div>
    </div>
  );
}
