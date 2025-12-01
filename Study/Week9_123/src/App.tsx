import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { calculateTotals } from './slices/cartSlice';
import type { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <main>
      <Navbar />
      <CartContainer />
      <Modal />
    </main>
  );
}

export default App;
