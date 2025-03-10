import React from 'react';
import { useAppContext } from '../App';

export default function Favorites() {
  const { favorites, removeFromFavorites, addToCart } = useAppContext();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4">
      <h1 className="text-2xl font-bold mb-6">Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No favorites yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Swipe right on products you like to add them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                
                <div className="flex gap-2 mt-3">
                  {product.size.map((size) => (
                    <span key={size} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {size}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}