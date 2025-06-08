
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import SplashScreen from '@/components/SplashScreen';
import AuthPage from '@/components/AuthPage';
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

type AppScreen = 'splash' | 'auth' | 'home' | 'search' | 'categories' | 'cart' | 'profile' | 'product-detail' | 'checkout' | 'success';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user, loading } = useAuth();

  const handleSplashComplete = () => {
    if (user) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('auth');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('home');
  };

  // Redirect to auth if user logs out
  useEffect(() => {
    if (!loading && !user && currentScreen !== 'splash' && currentScreen !== 'auth') {
      setCurrentScreen('auth');
    }
  }, [user, loading, currentScreen]);

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
    if (loading) {
      return <SplashScreen onComplete={() => {}} />;
    }

    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'auth':
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
      
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

  const showBottomNav = user && !['splash', 'auth', 'product-detail', 'checkout', 'success'].includes(currentScreen);

  return (
    <div className="relative">
      {renderCurrentScreen()}
      
      {showBottomNav && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
