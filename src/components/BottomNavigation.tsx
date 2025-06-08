
import React from 'react';
import { Home, Search, ShoppingCart, User, Grid3x3 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { state } = useCart();

  const tabs = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'categories', label: 'Categorías', icon: Grid3x3 },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'cart', label: 'Carrito', icon: ShoppingCart, badge: state.itemCount },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="bottom-nav">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 relative ${
                isActive 
                  ? 'text-primary bg-primary/10 scale-110' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="relative">
                <IconComponent className={`w-6 h-6 ${isActive ? 'animate-bounce-soft' : ''}`} />
                {tab.badge && tab.badge > 0 && (
                  <div className="notification-badge">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-primary' : ''}`}>
                {tab.label}
              </span>
              
              {/* Indicador activo */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
