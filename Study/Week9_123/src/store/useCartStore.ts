import { create } from 'zustand';
import cartItems from '../constants/cartItems';

export interface CartItem {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
}

interface CartState {
    cartItems: CartItem[];
    amount: number;
    total: number;
    clearCart: () => void;
    removeItem: (id: string) => void;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    clearCart: () => set({ cartItems: [] }),
    removeItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
    increase: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            }),
        })),
    decrease: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: item.amount - 1 };
                }
                return item;
            }),
        })),
    calculateTotals: () =>
        set((state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * parseInt(item.price);
            });
            return { amount, total };
        }),
}));
