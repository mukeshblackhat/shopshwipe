import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { animated, useSpring } from '@react-spring/web';
import { Check, X, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSwipe: (direction: string) => void;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
}

export default function ProductCard({ product, onSwipe, onAddToCart, onAddToFavorites }: ProductCardProps) {
  const [{ x, rot }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    config: { tension: 300, friction: 20 }
  }));

  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState<'left' | 'right' | null>(null);
  const dragStartTime = useRef<number>(0);
  const initialTouchPos = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDrag = (event: any) => {
    setIsDragging(true);
    
    const windowWidth = window.innerWidth;
    const xPos = event.deltaX;
    const rotation = (xPos / windowWidth) * 42;
    
    api.start({
      x: xPos,
      rot: rotation,
      immediate: true
    });

    // Show swipe indicator based on direction
    if (xPos > 50) {
      setShowSwipeIndicator('right');
    } else if (xPos < -50) {
      setShowSwipeIndicator('left');
    } else {
      setShowSwipeIndicator(null);
    }
  };

  const handleDragStart = () => {
    dragStartTime.current = Date.now();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      setIsDragging(false);
      // Clear swipe indicator after animation completes
      setTimeout(() => {
        setShowSwipeIndicator(null);
      }, 1000);
    }, 100);
  };

  // Function to handle swipe completion
  const handleSwipeComplete = (direction: string) => {
    // Set the swipe indicator based on direction
    setShowSwipeIndicator(direction as 'left' | 'right');
    
    // Animate card movement based on direction
    const xTarget = direction === 'right' ? 1000 : -1000;
    api.start({
      x: xTarget,
      rot: direction === 'right' ? 45 : -45,
      config: { tension: 200, friction: 25 },
    });
    
    // Call the original onSwipe function
    onSwipe(direction);
    
    // Clear the indicator after 1 second
    setTimeout(() => {
      setShowSwipeIndicator(null);
      // Reset position for next card
      setTimeout(() => {
        api.start({
          x: 0,
          rot: 0,
          immediate: true
        });
      }, 100);
    }, 1000);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isDragging) {
      onAddToCart();
    }
  };

  const handleFavoritesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isDragging) {
      onAddToFavorites();
    }
  };

  // Handle manual swipe button clicks for desktop
  const handleManualSwipe = (direction: 'left' | 'right') => {
    // Animate card movement
    const xTarget = direction === 'right' ? 500 : -500;
    
    api.start({
      x: xTarget,
      rot: direction === 'right' ? 30 : -30,
      config: { tension: 200, friction: 25 },
    });
    
    // Show indicator
    setShowSwipeIndicator(direction);
    
    // Call onSwipe after animation
    setTimeout(() => {
      onSwipe(direction);
      
      // Reset position after callback
      setTimeout(() => {
        api.start({
          x: 0,
          rot: 0,
          immediate: true
        });
        
        // Clear indicator after reset
        setTimeout(() => {
          setShowSwipeIndicator(null);
        }, 500);
      }, 200);
    }, 300);
  };

  // Mobile-specific touch handlers for the buttons
  const handleTouchStart = (e: React.TouchEvent, callback: () => void) => {
    e.stopPropagation();
    initialTouchPos.current = { 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    };
  };

  const handleTouchEnd = (e: React.TouchEvent, callback: () => void) => {
    e.stopPropagation();
    
    if (initialTouchPos.current) {
      const dx = Math.abs(e.changedTouches[0].clientX - initialTouchPos.current.x);
      const dy = Math.abs(e.changedTouches[0].clientY - initialTouchPos.current.y);
      
      // If it was a tap (not a swipe)
      if (dx < 10 && dy < 10) {
        callback();
      }
      
      initialTouchPos.current = null;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <TinderCard
        onSwipe={handleSwipeComplete}
        preventSwipe={['up', 'down']}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        swipeRequirementType="velocity"
        swipeThreshold={0.5}
      >
        <animated.div
          style={{
            transform: x.to((x) => `translateX(${x}px) rotate(${rot.get()}deg)`)
          }}
          className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl bg-white relative"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-2/3 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white">{product.name}</h2>
              <span className="text-xl text-white">${product.price}</span>
            </div>
            <p className="text-sm text-gray-200 mb-2">{product.description}</p>
            <p className="text-xs text-gray-300 mb-2">Category: {product.category}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {product.size.map((size) => (
                <span key={size} className="px-2 py-1 bg-white/20 rounded-full text-white text-xs">
                  {size}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-4 relative z-10">
              {/* We're adding a higher z-index and making these larger targets for mobile */}
              <button
                onClick={handleCartClick}
                onTouchStart={(e) => handleTouchStart(e, onAddToCart)}
                onTouchEnd={(e) => handleTouchEnd(e, onAddToCart)}
                className="px-4 py-3 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleFavoritesClick}
                onTouchStart={(e) => handleTouchStart(e, onAddToFavorites)}
                onTouchEnd={(e) => handleTouchEnd(e, onAddToFavorites)}
                className="px-4 py-3 bg-pink-500 text-white rounded-full flex items-center gap-2 hover:bg-pink-600"
              >
                <Heart className="w-4 h-4" />
                Favorite
              </button>
            </div>
          </div>
          
          {/* Swipe indicator overlays */}
          {showSwipeIndicator === 'left' && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/40 z-20 animate-pulse pointer-events-none">
              <div className="bg-white rounded-full p-4 md:p-6 shadow-lg">
                <X className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
              </div>
              <div className="absolute bottom-24 md:bottom-32 text-white text-xl md:text-2xl font-bold uppercase">Pass</div>
            </div>
          )}
          
          {showSwipeIndicator === 'right' && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/40 z-20 animate-pulse pointer-events-none">
              <div className="bg-white rounded-full p-4 md:p-6 shadow-lg">
                <Check className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
              </div>
              <div className="absolute bottom-24 md:bottom-32 text-white text-xl md:text-2xl font-bold uppercase">Like</div>
            </div>
          )}
        </animated.div>
      </TinderCard>
      
      {!isMobile && (
        <div className="absolute -bottom-20 left-0 right-0 flex justify-center items-center gap-8">
          <button
            onClick={() => handleManualSwipe('left')}
            className="w-16 h-16 flex items-center justify-center bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={() => handleManualSwipe('right')}
            className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            <Check className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}