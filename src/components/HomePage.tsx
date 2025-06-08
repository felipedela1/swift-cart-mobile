import React, { useState, useEffect } from 'react';
import { Search, Star, TrendingUp, Zap, Heart, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';

// Cambiar banner automáticamente cada 3 segundos
const banners = [
  { id: 1, title: 'Descubre los mejores productos', subtitle: 'Descubre los mejores productos', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', color: 'from-coral to-pink-500' },
  { id: 2, title: 'Ofertas especiales', subtitle: 'Ofertas especiales', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', color: 'from-seafoam to-emerald-500' },
  { id: 3, title: 'Productos destacados', subtitle: 'Productos destacados', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', color: 'from-yellow-400 to-orange-500' },
  { id: 4, title: 'Envío gratis', subtitle: 'Envío gratis', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', color: 'from-purple-500 to-indigo-500' },
];

interface HomePageProps {
  onViewProduct: (product: Product) => void;
  onTabChange: (tab: string) => void;
}

const HomePage = ({ onViewProduct, onTabChange }: HomePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentBanner, setCurrentBanner] = useState(0);
  const { products, loading } = useProducts();
  const { user } = useAuth();

  // Auto-rotate banners with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Convert Supabase products to display format
  const convertedProducts: Product[] = products.map(product => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image: product.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    category: product.category || 'general',
    rating: 4.5, // Default rating
    reviews: Math.floor(Math.random() * 1000) + 100, // Random reviews
    description: product.description || '',
    stock: product.stock,
    tags: product.featured ? ['Destacado'] : [],
  }));

  const filteredProducts = selectedCategory === 'all' 
    ? convertedProducts 
    : convertedProducts.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const featuredProducts = convertedProducts.filter(product => 
    products.find(p => p.id === product.id)?.featured
  );

  if (loading) {
    return (
      <div className="mobile-container flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ocean border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-background">
      {/* Header with ocean wave gradient */}
      <div className="safe-area-pt bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white">
        <div className="p-6 pb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">¡Hola, {user?.email?.split('@')[0] || 'Amigo'}! 🌊</h1>
              <p className="text-cyan-100 text-sm">Descubre productos increíbles</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-6 h-6 text-white animate-soft-pulse" />
            </div>
          </div>
          
          {/* Ocean-inspired search bar */}
          <div 
            className="relative"
            onClick={() => onTabChange('search')}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-slate-500 shadow-lg"
              readOnly
            />
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="relative">
          <svg viewBox="0 0 1200 120" className="w-full h-8 fill-background">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="pb-24 overflow-y-auto">
        {/* Floating quick access buttons */}
        <div className="px-6 -mt-6 relative z-10">
          <div className="flex gap-4">
            {[
              { icon: TrendingUp, label: 'Tendencias', color: 'from-coral to-pink-500' },
              { icon: Zap, label: 'Ofertas', color: 'from-seafoam to-emerald-500' },
              { icon: Star, label: 'Favoritos', color: 'from-yellow-400 to-orange-500' },
              { icon: ShoppingBag, label: 'Nuevo', color: 'from-purple-500 to-indigo-500' },
            ].map((item, index) => (
              <button
                key={item.label}
                className={`flex-1 bg-gradient-to-r ${item.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-float-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ocean-wave banner carousel */}
        <div className="px-6 mt-8">
          <div className="relative h-48 rounded-3xl overflow-hidden shadow-xl">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-r ${banner.color} relative overflow-hidden`}>
                  <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 p-8 flex flex-col justify-center h-full text-white">
                    <h3 className="text-2xl font-bold mb-2 animate-gentle-float">{banner.title}</h3>
                    <p className="text-lg opacity-90">{banner.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Soft banner indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === currentBanner 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Soft category selector */}
        <div className="px-6 mt-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">Categorías</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl font-medium transition-all duration-500 animate-float-in ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-ocean to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-card text-foreground hover:bg-muted border border-border hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured products with ocean theme */}
        {featuredProducts.length > 0 && (
          <div className="px-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
              <Star className="w-6 h-6 text-ocean" />
              Productos destacados
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={onViewProduct}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        )}

        {/* Product grid with soft animations */}
        <div className="px-6 mt-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            {selectedCategory === 'all' ? 'Todos los productos' : `Categoría: ${categories.find(c => c.id === selectedCategory)?.name}`}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                delay={index * 100}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-ocean to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float">
                <Search className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No hay productos</h3>
              <p className="text-muted-foreground">No se encontraron productos en esta categoría</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
