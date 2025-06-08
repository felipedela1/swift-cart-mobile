
import React, { useState } from 'react';
import { User, Heart, Package, CreditCard, Settings, Moon, Sun, HelpCircle, LogOut, Bell, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';

const ProfilePage = () => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useCart();
  const [notifications, setNotifications] = useState(true);

  // Datos simulados del usuario
  const userData = {
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+34 123 456 789',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b567?w=150',
    joinDate: 'Marzo 2023',
    orders: 12,
    totalSpent: 1247.50
  };

  // Pedidos simulados
  const recentOrders = [
    {
      id: '#ORD-001',
      date: '15 Nov 2024',
      status: 'Entregado',
      total: 149.99,
      items: 3,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100'
    },
    {
      id: '#ORD-002',
      date: '08 Nov 2024',
      status: 'En camino',
      total: 89.50,
      items: 2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100'
    },
    {
      id: '#ORD-003',
      date: '02 Nov 2024',
      status: 'Entregado',
      total: 299.99,
      items: 1,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100'
    }
  ];

  const menuItems = [
    { icon: Package, label: 'Mis pedidos', value: `${userData.orders} pedidos`, color: 'text-blue-500' },
    { icon: Heart, label: 'Lista de deseos', value: '8 productos', color: 'text-red-500' },
    { icon: CreditCard, label: 'Métodos de pago', value: '2 tarjetas', color: 'text-green-500' },
    { icon: MapPin, label: 'Direcciones', value: '1 dirección', color: 'text-purple-500' },
    { icon: Bell, label: 'Notificaciones', value: '', color: 'text-orange-500' },
    { icon: Shield, label: 'Privacidad', value: '', color: 'text-gray-500' },
    { icon: HelpCircle, label: 'Ayuda y soporte', value: '', color: 'text-indigo-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'En camino': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Procesando': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Mi perfil</h1>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="pb-24 overflow-y-auto">
        {/* Información del usuario */}
        <div className="p-4">
          <div className="bg-card rounded-2xl p-6 border border-border text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
              <img 
                src={userData.avatar} 
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
            <p className="text-muted-foreground mb-1">{userData.email}</p>
            <p className="text-sm text-muted-foreground">Cliente desde {userData.joinDate}</p>
            
            {/* Estadísticas */}
            <div className="flex justify-around mt-6 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userData.orders}</p>
                <p className="text-xs text-muted-foreground">Pedidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">€{userData.totalSpent}</p>
                <p className="text-xs text-muted-foreground">Total gastado</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{state.itemCount}</p>
                <p className="text-xs text-muted-foreground">En carrito</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de tema */}
        <div className="px-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-purple-500" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <p className="font-medium">Modo oscuro</p>
                  <p className="text-sm text-muted-foreground">
                    {theme === 'dark' ? 'Activado' : 'Desactivado'}
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </div>
        </div>

        {/* Pedidos recientes */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold mb-4">Pedidos recientes</h3>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div 
                key={order.id}
                className={`bg-card rounded-2xl p-4 border border-border animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl overflow-hidden">
                    <img 
                      src={order.image} 
                      alt="Producto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.date}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">€{order.total} • {order.items} productos</span>
                      <Button variant="outline" size="sm" className="text-xs h-7 rounded-lg">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menú de opciones */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold mb-4">Configuración</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <button className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.label === 'Notificaciones' ? (
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    ) : (
                      <>
                        {item.value && (
                          <span className="text-sm text-muted-foreground">{item.value}</span>
                        )}
                        <span className="text-muted-foreground">›</span>
                      </>
                    )}
                  </div>
                </button>
                {index < menuItems.length - 1 && <div className="border-b border-border" />}
              </div>
            ))}
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="px-4 mb-6">
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Cerrar sesión
          </Button>
        </div>

        {/* Información de la app */}
        <div className="px-4 text-center text-muted-foreground">
          <p className="text-sm">ShopMobi v1.0.0</p>
          <p className="text-xs mt-1">© 2024 Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
