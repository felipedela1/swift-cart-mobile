
import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, Product } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  delay?: number;
}

const ProductCard = ({ product, onViewProduct, delay = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    // Beautiful animation delay
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 800);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div 
      className={`product-card cursor-pointer animate-float-in hover:animate-gentle-float`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onViewProduct(product)}
    >
      {/* Ocean-inspired image container */}
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-all duration-700 hover:scale-110 hover:rotate-1"
        />
        
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating badges with ocean colors */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tags?.map((tag) => (
            <span 
              key={tag}
              className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm ${
                tag === 'Nuevo' ? 'bg-seafoam text-white' :
                tag === 'Popular' || tag === 'Bestseller' ? 'bg-coral text-white' :
                tag === 'Edición limitada' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                'bg-ocean text-white'
              } animate-soft-pulse`}
            >
              {tag}
            </span>
          ))}
          {product.discount && (
            <span className="bg-gradient-to-r from-coral to-pink-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-lg animate-soft-pulse">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Floating action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full transition-all duration-500 shadow-lg backdrop-blur-sm ${
              isFavorited 
                ? 'bg-coral text-white scale-110 animate-soft-pulse' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
            className="p-2 bg-white/90 rounded-full text-gray-600 hover:bg-white hover:scale-110 transition-all duration-500 shadow-lg backdrop-blur-sm"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Low stock overlay with ocean wave effect */}
        {product.stock <= 5 && (
          <div className="absolute inset-0 bg-gradient-to-r from-coral/20 to-pink-500/20 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-coral text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-wave">
              ¡Últimas {product.stock} unidades!
            </span>
          </div>
        )}
      </div>

      {/* Product info with soft styling */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-foreground line-clamp-2 hover:text-ocean transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Ocean-inspired rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            ({product.reviews})
          </span>
        </div>

        {/* Soft price display */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold bg-gradient-to-r from-ocean to-cyan-600 bg-clip-text text-transparent">
            €{discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              €{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Soft color indicators */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-2 items-center">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className={`w-5 h-5 rounded-full border-2 border-white shadow-md ${
                  color.toLowerCase().includes('negro') ? 'bg-slate-800' :
                  color.toLowerCase().includes('blanco') ? 'bg-white border-gray-300' :
                  color.toLowerCase().includes('azul') ? 'bg-blue-500' :
                  color.toLowerCase().includes('rojo') ? 'bg-red-500' :
                  color.toLowerCase().includes('verde') ? 'bg-emerald-500' :
                  color.toLowerCase().includes('gris') ? 'bg-gray-400' :
                  'bg-gradient-to-r from-purple-400 to-pink-400'
                }`}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Ocean-wave inspired add to cart button */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0}
        className={`w-full mt-4 transition-all duration-500 ${
          isAdding ? 'animate-ocean-shimmer scale-95' : 'hover:scale-105'
        } ${
          product.stock === 0 ? 'btn-secondary opacity-50' : 'btn-primary'
        }`}
      >
        {isAdding ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            Agregando...
          </>
        ) : product.stock === 0 ? (
          'Sin stock'
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar al carrito
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductCard;
