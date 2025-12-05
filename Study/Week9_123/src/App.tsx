import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { useCartStore } from './store/useCartStore';

function App() {
  const { cartItems, calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <main>
      <Navbar />
      <CartContainer />
      <Modal />
    </main>
  );
}

export default App;
