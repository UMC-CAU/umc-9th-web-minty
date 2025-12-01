import { useReducer, useState, type ChangeEvent } from 'react';

// 1. State 타입 정의
interface IState {
  department: string;
  error: string | null;
}

// 2. Action 타입 정의
type ActionType = 
  | { type: 'CHANGE_DEPARTMENT'; payload: string }
  | { type: 'RESET' };

// 3. 초기 상태 정의
const initialState: IState = {
  department: 'Software Developer',
  error: null,
};

// 4. Reducer 함수 정의
function reducer(state: IState, action: ActionType): IState {
  switch (action.type) {
    case 'CHANGE_DEPARTMENT':
      const newDepartment = action.payload;
      
      if (newDepartment !== '카드메이커') {
        return {
          ...state,
          error: '카드메이커만 입력 가능합니다'
        };
      }
      
      return {
        department: newDepartment,
        error: null,
      };

    case 'RESET':

      return initialState;

    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleChangeDepartment = () => {
    dispatch({ type: 'CHANGE_DEPARTMENT', payload: inputValue });
  };

  // 리셋 버튼 핸들러
  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setInputValue('');
  };

  return (
    <div className="flex flex-col items-center gap-5 p-10 text-white">
      <h1 className="text-3xl font-bold">
        Department: {state.department}
      </h1>
      
      {state.error && (
        <p className="text-red-500 font-bold text-xl">
          {state.error}
        </p>
      )}

      <input
        type="text"
        className="border border-gray-300 p-2 rounded w-64 text-gray-500"
        placeholder="변경할 직무를 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
      />

      <div className="flex gap-4">
        <button
          onClick={handleChangeDepartment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          직무 변경하기
        </button>
        
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          초기화 (Reset)
        </button>
      </div>
    </div>
  );
}
