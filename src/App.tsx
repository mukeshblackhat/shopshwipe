import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductSwipe from './pages/ProductSwipe';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import { Product, CartItem } from './types';

interface AppContextType {
  cartItems: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      if (!prev.find(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <AppContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      addToFavorites,
      removeFromCart,
      removeFromFavorites,
      updateCartItemQuantity
    }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="">
            <Routes>
              <Route path="/" element={<ProductSwipe />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;