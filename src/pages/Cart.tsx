import React from 'react';
import { useAppContext } from '../App';

export default function Cart() {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useAppContext();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}