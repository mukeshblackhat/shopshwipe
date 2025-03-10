import React, { useState } from 'react';
import { Menu, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, favorites } = useAppContext();

  return (
    <header className="top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="text-xl font-bold">
            SwipeShop
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="p-2 hover:text-pink-500 relative">
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:text-blue-500 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-3">
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}