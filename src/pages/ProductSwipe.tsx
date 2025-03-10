import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { useAppContext } from '../App';

export default function ProductSwipe() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, addToFavorites } = useAppContext();

  useEffect(() => {
    const allProducts = [
      {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        description: 'Premium cotton basic tee',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        category: 'Men',
        brand: 'Essentials',
        size: ['S', 'M', 'L', 'XL'],
        color: ['White']
      },
      {
        id: '2',
        name: 'Denim Jacket',
        price: 89.99,
        description: 'Classic denim jacket with modern fit',
        imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=800',
        category: 'Women',
        brand: 'DenimCo',
        size: ['XS', 'S', 'M', 'L'],
        color: ['Blue']
      },
      {
        id: '3',
        name: 'Running Shoes',
        price: 129.99,
        description: 'Lightweight performance running shoes',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        category: 'Sport',
        brand: 'SportFit',
        size: ['7', '8', '9', '10', '11'],
        color: ['Red', 'Black']
      },
      {
        id: '4',
        name: 'Leather Handbag',
        price: 199.99,
        description: 'Elegant genuine leather handbag',
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
        category: 'Accessories',
        brand: 'LuxStyle',
        size: ['One Size'],
        color: ['Brown']
      },
      {
        id: '5',
        name: 'Summer Dress',
        price: 59.99,
        description: 'Floral print summer dress',
        imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
        category: 'Women',
        brand: 'StyleCo',
        size: ['XS', 'S', 'M', 'L'],
        color: ['Floral']
      },
      {
        id: '6',
        name: 'Sport Watch',
        price: 149.99,
        description: 'Digital sport watch with heart rate monitor',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        category: 'Accessories',
        brand: 'TechFit',
        size: ['One Size'],
        color: ['Black']
      }
    ];
    
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  // Filter products when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
    // Reset current index when filtered products change
    setCurrentIndex(0);
  }, [searchQuery, products]);

  const handleSwipe = (direction: string) => {
    if (currentIndex < filteredProducts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleAddToCart = () => {
    if (filteredProducts.length > 0) {
      const currentProduct = filteredProducts[currentIndex];
      addToCart(currentProduct);
    }
  };

  const handleAddToFavorites = () => {
    if (filteredProducts.length > 0) {
      const currentProduct = filteredProducts[currentIndex];
      addToFavorites(currentProduct);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-24">
      <div className="py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="relative">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-64 mt-8">
            <p className="text-gray-500">No products match your search.</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            index === currentIndex && (
              <ProductCard
                key={product.id}
                product={product}
                onSwipe={handleSwipe}
                onAddToCart={handleAddToCart}
                onAddToFavorites={handleAddToFavorites}
              />
            )
          ))
        )}
      </div>
    </div>
  );
}