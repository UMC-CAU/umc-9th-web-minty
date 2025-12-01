import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { openModal } from '../slices/modalSlice';
import type { RootState } from '../store';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((state: RootState) => state.cart);

  if (amount < 1) {
    return (
      <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-6 p-4">
        <header>
          <h2 className="text-4xl font-bold text-white uppercase tracking-widest">
            장바구니
          </h2>
        </header>
        <div className="text-center">
          <h4 className="text-xl text-gray-400 mt-4">현재 장바구니가 비어있습니다.</h4>
          <p className="text-gray-500 mt-2">원하는 음반을 담아보세요!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-6 min-h-[calc(100vh-80px)]">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">
          장바구니
        </h2>
      </header>
      <div className="flex flex-col">
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer className="mt-12 border-t border-gray-700 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-xl font-bold text-white capitalize">총 가격</h4>
          <span className="text-2xl font-bold text-white">
            {total.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-center">
          <button
            className="px-8 py-3 bg-transparent text-red-500 border border-red-500 rounded-lg hover:bg-red-500/10 transition-all duration-300 font-bold tracking-wide uppercase text-sm"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            장바구니 비우기
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
