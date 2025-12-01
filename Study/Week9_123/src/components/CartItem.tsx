import { useDispatch } from 'react-redux';
import { removeItem, increase, decrease } from '../slices/cartSlice';
import type { CartItem as CartItemType } from '../slices/cartSlice';

interface CartItemProps extends CartItemType {}

const CartItem = ({ id, title, singer, price, img, amount }: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    <article className="flex justify-between items-center py-4 border-b border-gray-700">
      <div className="flex gap-4 items-center flex-1">
        <img
          src={img}
          alt={title}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
          <h4 className="text-gray-400 text-sm mb-1">{singer}</h4>
          <h4 className="text-gray-300 font-bold">{parseInt(price).toLocaleString()}원</h4>
        </div>
      </div>
      <div className="flex items-center gap-0">
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 transition-colors rounded-l-md"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <div className="w-10 h-8 flex items-center justify-center bg-black border-y border-gray-700 text-white font-medium">
          {amount}
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white hover:bg-gray-600 transition-colors rounded-r-md"
          onClick={() => dispatch(increase(id))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CartItem;
