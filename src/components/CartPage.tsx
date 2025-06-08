
import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

interface CartPageProps {
  onTabChange: (tab: string) => void;
  onCheckout: () => void;
}

const CartPage = ({ onTabChange, onCheckout }: CartPageProps) => {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const shipping = state.total > 50 ? 0 : 4.99;
  const tax = state.total * 0.21; // 21% IVA
  const totalWithTax = state.total + shipping + tax - discount;

  const handleApplyPromo = () => {
    setIsApplyingPromo(true);
    
    // Simular validación de código promocional
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'welcome10') {
        setDiscount(state.total * 0.1);
      } else if (promoCode.toLowerCase() === 'save20') {
        setDiscount(state.total * 0.2);
      } else {
        setDiscount(0);
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  if (state.items.length === 0) {
    return (
      <div className="mobile-container bg-background">
        <div className="safe-area-pt bg-background border-b border-border">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Mi carrito</h1>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
          <div className="w-32 h-32 mb-6 bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Descubre nuestros productos increíbles y agrega algunos a tu carrito
          </p>
          <Button 
            onClick={() => onTabChange('home')}
            className="rounded-xl px-8 py-3"
          >
            Explorar productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border sticky top-0 z-50">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mi carrito</h1>
          <Button 
            variant="ghost" 
            onClick={clearCart}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
          >
            Vaciar
          </Button>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="pb-32 overflow-y-auto">
        {/* Items del carrito */}
        <div className="p-4 space-y-4">
          {state.items.map((item, index) => (
            <div 
              key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
              className={`bg-card rounded-2xl p-4 border border-border animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-4">
                {/* Imagen del producto */}
                <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                    {item.name}
                  </h3>
                  
                  {/* Variantes seleccionadas */}
                  <div className="flex gap-2 mb-2">
                    {item.selectedColor && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-md">
                        {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-md">
                        {item.selectedSize}
                      </span>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-primary">
                      €{item.price.toFixed(2)}
                    </span>
                    {item.discount && (
                      <span className="text-xs text-muted-foreground line-through">
                        €{(item.price / (1 - item.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-muted rounded-xl">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-l-xl"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-3 py-1 font-semibold min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="h-8 w-8 rounded-r-xl"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Código promocional */}
        <div className="px-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="font-semibold mb-3 flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Código promocional
            </h3>
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa tu código"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 rounded-xl"
              />
              <Button
                onClick={handleApplyPromo}
                disabled={!promoCode || isApplyingPromo}
                className="rounded-xl px-6"
              >
                {isApplyingPromo ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  'Aplicar'
                )}
              </Button>
            </div>
            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2 flex items-center">
                ✓ Código aplicado: -€{discount.toFixed(2)}
              </p>
            )}
          </div>
          
          {/* Códigos de ejemplo */}
          <div className="mt-3 flex gap-2 text-xs">
            <button 
              onClick={() => setPromoCode('WELCOME10')}
              className="px-2 py-1 bg-muted rounded text-muted-foreground hover:bg-muted/80"
            >
              WELCOME10
            </button>
            <button 
              onClick={() => setPromoCode('SAVE20')}
              className="px-2 py-1 bg-muted rounded text-muted-foreground hover:bg-muted/80"
            >
              SAVE20
            </button>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="px-4 mb-6">
          <div className="bg-card rounded-2xl p-4 border border-border space-y-3">
            <h3 className="font-semibold mb-3">Resumen del pedido</h3>
            
            <div className="flex justify-between text-sm">
              <span>Subtotal ({state.itemCount} productos)</span>
              <span>€{state.total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Envío</span>
              <span className={shipping === 0 ? 'text-green-600' : ''}>
                {shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>IVA (21%)</span>
              <span>€{tax.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Descuento</span>
                <span>-€{discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">€{totalWithTax.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Información de envío gratis */}
          {state.total < 50 && (
            <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                💡 Agrega €{(50 - state.total).toFixed(2)} más para obtener envío gratis
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Botón de checkout fijo */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-background border-t border-border p-4 safe-area-pb">
        <Button
          onClick={onCheckout}
          className="w-full h-12 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
        >
          Finalizar compra
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
