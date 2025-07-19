export interface CartItem {
  bookId: string;
  quantity: number;
  priceAtTime: number;
}

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existing = cart.find((i) => i.bookId === item.bookId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
};

export const removeFromCart = (bookId: string) => {
  const cart = getCart().filter((item) => item.bookId !== bookId);
  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
