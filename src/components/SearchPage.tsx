
import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { products, categories } from '@/data/products';
import { Product } from '@/contexts/CartContext';

interface SearchPageProps {
  onViewProduct: (product: Product) => void;
}

const SearchPage = ({ onViewProduct }: SearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar productos
  useEffect(() => {
    let filtered = products;

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(product => {
      const price = product.discount 
        ? product.price * (1 - product.discount / 100) 
        : product.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        case 'price-high':
          const priceA2 = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB2 = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB2 - priceA2;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviews - a.reviews;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('name');
    setPriceRange({ min: 0, max: 2000 });
    setSearchQuery('');
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border/50 sticky top-0 z-50">
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Buscar productos</h1>
          
          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 rounded-xl bg-muted border-0"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Filtros y ordenación */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 h-10 rounded-xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl border border-border bg-background text-foreground"
            >
              <option value="name">A-Z</option>
              <option value="price-low">Precio ↑</option>
              <option value="price-high">Precio ↓</option>
              <option value="rating">Mejor valorados</option>
              <option value="popular">Más populares</option>
            </select>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="bg-muted rounded-xl p-4 space-y-4 animate-slide-up">
              {/* Categorías */}
              <div>
                <h3 className="font-semibold mb-2">Categoría</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background border border-border hover:border-primary'
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rango de precios */}
              <div>
                <h3 className="font-semibold mb-2">Precio</h3>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Mín"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-20 h-8 text-sm"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder="Máx"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-20 h-8 text-sm"
                  />
                  <span className="text-sm text-muted-foreground">€</span>
                </div>
              </div>

              {/* Botón limpiar filtros */}
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full h-10 rounded-xl"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Resultados */}
      <div className="p-4 pb-24">
        {/* Contador de resultados */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span> para "<span className="font-semibold text-foreground">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                delay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No encontramos resultados</h3>
            <p className="text-muted-foreground mb-6">
              Intenta con otros términos de búsqueda o ajusta los filtros
            </p>
            <Button onClick={clearFilters} className="rounded-xl">
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Sugerencias de búsqueda */}
        {searchQuery && filteredProducts.length === 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Búsquedas sugeridas:</h3>
            <div className="flex flex-wrap gap-2">
              {['iPhone', 'Nike', 'Auriculares', 'Ropa', 'Zapatillas'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
