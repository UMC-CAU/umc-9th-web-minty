import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';
import type { RootState } from '../store';

const Modal = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.modal);

    if (!isOpen) {
        return null;
    }

    return (
        <aside className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300'>
            <div className='bg-zinc-900 border border-zinc-800 w-96 max-w-[90%] p-8 rounded-2xl shadow-2xl text-center transform transition-all scale-100'>

                <h4 className='text-xl font-bold mb-2 text-white'>
                    장바구니 비우기
                </h4>
                <p className='text-zinc-400 text-sm mb-8'>
                    장바구니에 담긴 모든 상품이 삭제됩니다.<br/>
                    정말 비우시겠습니까?
                </p>

                <div className='flex justify-center gap-4'>
                    <button
                        type='button'
                        className='flex-1 px-6 py-3 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-xl transition-all duration-300 font-semibold'
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                    >
                        취소
                    </button>
                    <button
                        type='button'
                        className='flex-1 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl transition-all duration-300 font-semibold'
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal());
                        }}
                    >
                        비우기
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Modal;
