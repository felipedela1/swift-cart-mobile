
import React, { useState, useEffect } from 'react';
import { Search, Bell, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from './ProductCard';
import { products, categories, banners } from '@/data/products';
import { Product } from '@/contexts/CartContext';

interface HomePageProps {
  onViewProduct: (product: Product) => void;
  onTabChange: (tab: string) => void;
}

const HomePage = ({ onViewProduct, onTabChange }: HomePageProps) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Cambiar banner automáticamente cada 3 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Productos destacados (con mayor rating)
  const featuredProducts = products
    .filter(p => p.rating >= 4.6)
    .slice(0, 6);

  // Ofertas (productos con descuento)
  const dealsProducts = products
    .filter(p => p.discount && p.discount > 0)
    .slice(0, 4);

  // Nuevos productos
  const newProducts = products
    .filter(p => p.tags?.includes('Nuevo'))
    .slice(0, 4);

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border/50">
        <div className="p-4 space-y-4">
          {/* Título y notificaciones */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">¡Hola! 👋</h1>
              <p className="text-muted-foreground">¿Qué buscas hoy?</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 rounded-xl bg-muted border-0"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-lg"
              onClick={() => onTabChange('search')}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Botones de acceso rápido */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-10 rounded-xl bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
            >
              🔥 Ofertas
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-10 rounded-xl bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
            >
              ✨ Novedades
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-10 rounded-xl bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
            >
              🏆 Top
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="pb-24 overflow-y-auto">
        {/* Banner promocional */}
        <div className="p-4">
          <div className="relative h-48 rounded-2xl overflow-hidden">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentBanner ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-r ${banner.color} flex items-center justify-between p-6 text-white relative overflow-hidden`}>
                  <div className="flex-1 z-10">
                    <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-lg opacity-90 mb-4">{banner.subtitle}</p>
                    <Button 
                      variant="secondary" 
                      className="bg-white text-gray-800 hover:bg-gray-100 rounded-xl"
                    >
                      Ver más
                    </Button>
                  </div>
                  <div className="absolute right-0 top-0 w-32 h-full opacity-20">
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Indicadores del banner */}
            <div className="absolute bottom-4 left-6 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentBanner ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="px-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Categorías</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => onTabChange('categories')}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:shadow-medium transition-all duration-300 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Ofertas especiales */}
        {dealsProducts.length > 0 && (
          <div className="px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🔥 Ofertas especiales</h2>
              <Button variant="ghost" className="text-primary">
                Ver todas <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {dealsProducts.map((product, index) => (
                <div key={product.id} className="flex-shrink-0 w-44">
                  <ProductCard 
                    product={product} 
                    onViewProduct={onViewProduct}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Productos nuevos */}
        {newProducts.length > 0 && (
          <div className="px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">✨ Nuevos productos</h2>
              <Button variant="ghost" className="text-primary">
                Ver todos <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {newProducts.map((product, index) => (
                <div key={product.id} className="flex-shrink-0 w-44">
                  <ProductCard 
                    product={product} 
                    onViewProduct={onViewProduct}
                    delay={index * 100}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Productos destacados */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">⭐ Productos destacados</h2>
            <Button variant="ghost" className="text-primary">
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onViewProduct={onViewProduct}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Banner de envío gratis */}
        <div className="mx-4 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white text-center">
            <h3 className="text-lg font-bold mb-2">🚚 Envío gratis</h3>
            <p className="opacity-90">En compras superiores a 50€</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
