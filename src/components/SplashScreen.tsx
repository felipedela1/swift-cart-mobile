
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mobile-container flex flex-col items-center justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce-soft delay-100"></div>
        <div className="absolute top-20 -right-16 w-48 h-48 bg-white/5 rounded-full animate-bounce-soft delay-300"></div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full animate-bounce-soft delay-500"></div>
      </div>

      <div className={`text-center z-10 transition-all duration-1000 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Logo animado */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-3xl flex items-center justify-center shadow-large animate-scale-in">
            <span className="text-4xl font-bold text-brand-500">🛍️</span>
          </div>
          <div className="absolute -inset-4 animate-pulse-ring">
            <div className="w-32 h-32 border-2 border-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Texto principal */}
        <h1 className="text-4xl font-bold mb-2 animate-fade-in delay-200">
          ShopMobi
        </h1>
        <p className="text-xl font-light mb-3 animate-fade-in delay-300">
          Tu tienda favorita
        </p>
        <p className="text-lg opacity-90 mb-12 animate-fade-in delay-400 max-w-xs mx-auto">
          Descubre productos increíbles con la mejor experiencia de compra
        </p>

        {/* Botón de acción */}
        <div className="animate-fade-in delay-500">
          <Button 
            onClick={onComplete}
            size="lg"
            className="bg-white text-brand-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-large px-8 py-4 text-lg font-semibold rounded-2xl"
          >
            Explorar productos
            <span className="ml-2">✨</span>
          </Button>
        </div>

        {/* Indicadores de características */}
        <div className="mt-12 flex justify-center space-x-8 text-sm opacity-80 animate-fade-in delay-700">
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">🚚</span>
            <span>Envío gratis</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">🔒</span>
            <span>Pago seguro</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg mb-1">⭐</span>
            <span>5 estrellas</span>
          </div>
        </div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-bounce-soft`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
