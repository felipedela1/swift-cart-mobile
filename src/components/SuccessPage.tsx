
import React, { useEffect, useState } from 'react';
import { Check, Home, Share2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessPageProps {
  onGoHome: () => void;
}

const SuccessPage = ({ onGoHome }: SuccessPageProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mobile-container bg-background relative overflow-hidden">
      {/* Confetti animado */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-bounce-soft"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        {/* Icono de éxito */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
            <Check className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -inset-4 animate-pulse-ring">
            <div className="w-32 h-32 border-4 border-green-500/30 rounded-full"></div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl font-bold text-foreground mb-4 animate-fade-in delay-200">
          ¡Compra realizada con éxito!
        </h1>

        {/* Mensaje secundario */}
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in delay-300 max-w-sm">
          Tu pedido ha sido confirmado y será procesado en breve
        </p>

        {/* Información del pedido */}
        <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mb-8 animate-fade-in delay-400">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Número de pedido:</span>
              <span className="font-semibold text-primary">{orderNumber}</span>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Estado del pedido</span>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                  📦 Pedido confirmado
                </p>
                <p className="text-blue-600 dark:text-blue-300 text-xs mt-1">
                  Entrega estimada: {estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="bg-muted rounded-2xl p-6 w-full max-w-sm mb-8 animate-fade-in delay-500">
          <h3 className="font-semibold mb-4">¿Qué sucede ahora?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Recibirás un email de confirmación con los detalles de tu pedido
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Te notificaremos cuando tu pedido sea enviado
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Podrás seguir tu envío en tiempo real
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-4 w-full max-w-sm animate-fade-in delay-600">
          <Button
            onClick={onGoHome}
            className="w-full h-12 text-lg font-semibold rounded-xl hover:scale-105 transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al inicio
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl hover:scale-105 transition-all"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartir compra
          </Button>
        </div>

        {/* Mensaje de agradecimiento */}
        <div className="mt-8 animate-fade-in delay-700">
          <p className="text-sm text-muted-foreground mb-2">
            ¡Gracias por confiar en ShopMobi! 💜
          </p>
          <p className="text-xs text-muted-foreground">
            Te esperamos pronto para tu próxima compra
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
