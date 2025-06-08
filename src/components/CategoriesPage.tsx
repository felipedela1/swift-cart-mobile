
import React, { useState } from 'react';
import { ChevronRight, Grid3x3 } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, categories } from '@/data/products';
import { Product } from '@/contexts/CartContext';

interface CategoriesPageProps {
  onViewProduct: (product: Product) => void;
}

const CategoriesPage = ({ onViewProduct }: CategoriesPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase() === categories.find(c => c.id === selectedCategory)?.name.toLowerCase()
      );

  // Obtener estadísticas por categoría
  const getCategoryStats = (categoryId: string) => {
    if (categoryId === 'all') return products.length;
    const categoryName = categories.find(c => c.id === categoryId)?.name.toLowerCase();
    return products.filter(p => p.category.toLowerCase() === categoryName).length;
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border sticky top-0 z-50">
        <div className="p-4">
          <h1 className="text-2xl font-bold flex items-center">
            <Grid3x3 className="w-6 h-6 mr-2" />
            Categorías
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="pb-24">
        {/* Lista de categorías */}
        <div className="p-4">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {categories.map((category, index) => (
              <div key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl p-2 rounded-xl ${
                      selectedCategory === category.id 
                        ? 'bg-primary/20' 
                        : 'bg-muted'
                    }`}>
                      {category.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getCategoryStats(category.id)} productos
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    selectedCategory === category.id ? 'rotate-90 text-primary' : 'text-muted-foreground'
                  }`} />
                </button>
                {index < categories.length - 1 && (
                  <div className="border-b border-border last:border-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Productos de la categoría seleccionada */}
        <div className="px-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              {categories.find(c => c.id === selectedCategory)?.name || 'Todos los productos'}
            </h2>
            <p className="text-muted-foreground">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
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
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">No hay productos</h3>
              <p className="text-muted-foreground">
                Esta categoría está vacía por el momento
              </p>
            </div>
          )}
        </div>

        {/* Información adicional por categoría */}
        {selectedCategory !== 'all' && filteredProducts.length > 0 && (
          <div className="mx-4 mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-lg mb-2">
                💡 Sobre {categories.find(c => c.id === selectedCategory)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedCategory === 'electronica' && 'Descubre la última tecnología con los mejores precios y garantía oficial.'}
                {selectedCategory === 'ropa' && 'Encuentra las últimas tendencias en moda con envío rápido y devoluciones gratuitas.'}
                {selectedCategory === 'calzado' && 'Camina con estilo con nuestra selección de calzado para todas las ocasiones.'}
                {selectedCategory === 'accesorios' && 'Complementa tu look con accesorios únicos y de alta calidad.'}
                {selectedCategory === 'hogar' && 'Transforma tu hogar con productos funcionales y con diseño moderno.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
