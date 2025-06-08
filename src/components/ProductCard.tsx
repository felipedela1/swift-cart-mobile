
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
    
    // Simular delay para animación
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 600);
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
      className={`product-card cursor-pointer animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onViewProduct(product)}
    >
      {/* Imagen del producto */}
      <div className="relative mb-3 overflow-hidden rounded-xl bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.tags?.map((tag) => (
            <span 
              key={tag}
              className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                tag === 'Nuevo' ? 'bg-green-500 text-white' :
                tag === 'Popular' || tag === 'Bestseller' ? 'bg-orange-500 text-white' :
                tag === 'Edición limitada' ? 'bg-purple-500 text-white' :
                'bg-blue-500 text-white'
              }`}
            >
              {tag}
            </span>
          ))}
          {product.discount && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Botón de favorito */}
        <button
          onClick={handleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            isFavorited 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Botón de vista rápida */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProduct(product);
          }}
          className="absolute bottom-2 right-2 p-2 bg-white/80 rounded-full text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Overlay para stock bajo */}
        {product.stock <= 5 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
              ¡Últimas {product.stock} unidades!
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Precio */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            €{discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              €{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Colores disponibles */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                  color.toLowerCase().includes('negro') ? 'bg-black' :
                  color.toLowerCase().includes('blanco') ? 'bg-white border-gray-300' :
                  color.toLowerCase().includes('azul') ? 'bg-blue-500' :
                  color.toLowerCase().includes('rojo') ? 'bg-red-500' :
                  color.toLowerCase().includes('verde') ? 'bg-green-500' :
                  color.toLowerCase().includes('gris') ? 'bg-gray-500' :
                  'bg-gradient-to-r from-purple-400 to-pink-400'
                }`}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>

      {/* Botón de agregar al carrito */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0}
        className={`w-full mt-3 transition-all duration-300 ${
          isAdding ? 'animate-cart-fly' : 'hover:scale-105'
        }`}
        variant={product.stock === 0 ? "secondary" : "default"}
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
            Agregar
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductCard;
