
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import SplashScreen from '@/components/SplashScreen';
import HomePage from '@/components/HomePage';
import SearchPage from '@/components/SearchPage';
import CategoriesPage from '@/components/CategoriesPage';
import CartPage from '@/components/CartPage';
import ProfilePage from '@/components/ProfilePage';
import ProductDetail from '@/components/ProductDetail';
import CheckoutPage from '@/components/CheckoutPage';
import SuccessPage from '@/components/SuccessPage';
import BottomNavigation from '@/components/BottomNavigation';
import { Product } from '@/contexts/CartContext';

type AppScreen = 'splash' | 'home' | 'search' | 'categories' | 'cart' | 'profile' | 'product-detail' | 'checkout' | 'success';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSplashComplete = () => {
    setCurrentScreen('home');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab as AppScreen);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
  };

  const handleBackFromProduct = () => {
    setCurrentScreen(activeTab as AppScreen);
  };

  const handleCheckout = () => {
    setCurrentScreen('checkout');
  };

  const handleBackFromCheckout = () => {
    setCurrentScreen('cart');
  };

  const handleCheckoutSuccess = () => {
    setCurrentScreen('success');
  };

  const handleGoHomeFromSuccess = () => {
    setActiveTab('home');
    setCurrentScreen('home');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'home':
        return (
          <HomePage 
            onViewProduct={handleViewProduct}
            onTabChange={handleTabChange}
          />
        );
      
      case 'search':
        return <SearchPage onViewProduct={handleViewProduct} />;
      
      case 'categories':
        return <CategoriesPage onViewProduct={handleViewProduct} />;
      
      case 'cart':
        return (
          <CartPage 
            onTabChange={handleTabChange}
            onCheckout={handleCheckout}
          />
        );
      
      case 'profile':
        return <ProfilePage />;
      
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackFromProduct}
            onViewProduct={handleViewProduct}
          />
        ) : null;
      
      case 'checkout':
        return (
          <CheckoutPage
            onBack={handleBackFromCheckout}
            onSuccess={handleCheckoutSuccess}
          />
        );
      
      case 'success':
        return <SuccessPage onGoHome={handleGoHomeFromSuccess} />;
      
      default:
        return <HomePage onViewProduct={handleViewProduct} onTabChange={handleTabChange} />;
    }
  };

  const showBottomNav = !['splash', 'product-detail', 'checkout', 'success'].includes(currentScreen);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="relative">
          {renderCurrentScreen()}
          
          {showBottomNav && (
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default Index;
