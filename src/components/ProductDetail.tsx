
import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, Product } from '@/contexts/CartContext';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onViewProduct: (product: Product) => void;
}

const ProductDetail = ({ product, onBack, onViewProduct }: ProductDetailProps) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Productos relacionados (misma categoría)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // Simular múltiples imágenes del producto
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg truncate mx-4">{product.name}</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="pb-24 overflow-y-auto">
        {/* Galería de imágenes */}
        <div className="relative">
          <div className="aspect-square bg-muted overflow-hidden">
            <img 
              src={productImages[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
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
          </div>

          {/* Indicadores de imagen */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="p-6 space-y-6">
          {/* Título y precio */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-bold text-primary">
                €{discountedPrice.toFixed(2)}
              </span>
              {product.discount && (
                <span className="text-xl text-muted-foreground line-through">
                  €{product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Rating y reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reseñas)</span>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Selección de color */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Color: <span className="font-normal text-primary">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selección de talla */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Talla: <span className="font-normal text-primary">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-primary-foreground' 
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad */}
          <div>
            <h3 className="font-semibold mb-3">Cantidad</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-muted rounded-xl">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="rounded-l-xl"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="rounded-r-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} disponibles
              </span>
            </div>
          </div>

          {/* Stock warning */}
          {product.stock <= 5 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                ⚠️ ¡Solo quedan {product.stock} unidades disponibles!
              </span>
            </div>
          )}

          {/* Productos relacionados */}
          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">También te puede interesar</h3>
              <div className="grid grid-cols-2 gap-4">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    onViewProduct={onViewProduct}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción fijos */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-background border-t border-border p-4 safe-area-pb">
        <div className="flex gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 h-12 text-lg font-semibold rounded-xl hover:scale-105 transition-all"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            variant="outline"
            className="h-12 px-6 rounded-xl hover:scale-105 transition-all gradient-accent text-white border-0"
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
