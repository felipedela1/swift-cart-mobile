
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutPage = ({ onBack, onSuccess }: CheckoutPageProps) => {
  const { state, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Datos de envío
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    
    // Datos de pago
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paymentMethod: 'card'
  });

  const shipping = state.total > 50 ? 0 : 4.99;
  const tax = state.total * 0.21;
  const total = state.total + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Limpiar carrito y mostrar éxito
    clearCart();
    setIsProcessing(false);
    onSuccess();
    
    toast({
      title: "¡Compra realizada con éxito! 🎉",
      description: "Recibirás un email de confirmación en breve",
      duration: 5000,
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
              step >= stepNumber
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
          </div>
          {stepNumber < 3 && (
            <div
              className={`w-8 h-1 mx-2 transition-all ${
                step > stepNumber ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Información de envío</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Nombre"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className="rounded-xl"
        />
        <Input
          placeholder="Apellidos"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className="rounded-xl"
        />
      </div>
      
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className="rounded-xl"
      />
      
      <Input
        type="tel"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        className="rounded-xl"
      />
      
      <Input
        placeholder="Dirección completa"
        value={formData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        className="rounded-xl"
      />
      
      <div className="grid grid-cols-2 gap-3">
        <Input
          placeholder="Ciudad"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="rounded-xl"
        />
        <Input
          placeholder="Código postal"
          value={formData.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
          className="rounded-xl"
        />
      </div>

      {/* Opciones de envío */}
      <div className="space-y-3 mt-6">
        <h3 className="font-semibold">Método de envío</h3>
        <div className="space-y-2">
          <div className="border border-border rounded-xl p-3 bg-primary/5 border-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Envío estándar</p>
                  <p className="text-sm text-muted-foreground">3-5 días laborables</p>
                </div>
              </div>
              <span className="font-semibold text-primary">
                {shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Método de pago</h2>
      
      {/* Selección de método de pago */}
      <div className="space-y-3">
        <div className="border border-border rounded-xl p-3 bg-primary/5 border-primary">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="font-medium">Tarjeta de crédito/débito</span>
          </div>
        </div>
      </div>

      {/* Formulario de tarjeta */}
      <div className="space-y-4 mt-6">
        <Input
          placeholder="Número de tarjeta"
          value={formData.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          className="rounded-xl"
          maxLength={19}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="MM/AA"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
            className="rounded-xl"
            maxLength={5}
          />
          <Input
            placeholder="CVV"
            value={formData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            className="rounded-xl"
            maxLength={3}
          />
        </div>
        
        <Input
          placeholder="Nombre en la tarjeta"
          value={formData.cardName}
          onChange={(e) => handleInputChange('cardName', e.target.value)}
          className="rounded-xl"
        />
      </div>

      {/* Seguridad */}
      <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 mt-6">
        <Shield className="w-5 h-5 text-green-600" />
        <div>
          <p className="font-medium text-green-800 dark:text-green-200">Pago 100% seguro</p>
          <p className="text-sm text-green-600 dark:text-green-300">Tus datos están protegidos con SSL</p>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Revisar pedido</h2>
      
      {/* Productos */}
      <div className="space-y-3">
        <h3 className="font-semibold">Productos ({state.itemCount})</h3>
        {state.items.map((item) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center gap-3 bg-muted rounded-xl p-3">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.selectedColor} {item.selectedSize} • Cantidad: {item.quantity}
              </p>
            </div>
            <span className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Resumen de costos */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>€{state.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>{shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>IVA</span>
          <span>€{tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary">€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Información de envío */}
      <div className="bg-muted rounded-xl p-4">
        <h4 className="font-semibold mb-2">Enviar a:</h4>
        <p className="text-sm text-muted-foreground">
          {formData.firstName} {formData.lastName}<br />
          {formData.address}<br />
          {formData.city}, {formData.postalCode}<br />
          {formData.email} • {formData.phone}
        </p>
      </div>
    </div>
  );

  if (isProcessing) {
    return (
      <div className="mobile-container bg-background flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <CreditCard className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Procesando tu pago...</h2>
            <p className="text-muted-foreground">Por favor, no cierres esta ventana</p>
          </div>
          
          {/* Indicadores de progreso */}
          <div className="space-y-3 text-left max-w-sm">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">Verificando datos de pago...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Procesando transacción...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-muted-foreground border-t-transparent rounded-full"></div>
              <span className="text-sm text-muted-foreground">Confirmando pedido...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="safe-area-pt bg-background border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={step === 1 ? onBack : handlePreviousStep} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-lg">
            {step === 1 ? 'Envío' : step === 2 ? 'Pago' : 'Revisar'}
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 pb-24">
        {renderStepIndicator()}
        
        {step === 1 && renderShippingForm()}
        {step === 2 && renderPaymentForm()}
        {step === 3 && renderReview()}
      </div>

      {/* Botones de acción */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-background border-t border-border p-4 safe-area-pb">
        {step < 3 ? (
          <Button
            onClick={handleNextStep}
            className="w-full h-12 text-lg font-semibold rounded-xl hover:scale-105 transition-all"
          >
            {step === 1 ? 'Continuar al pago' : 'Revisar pedido'}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="w-full h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Pagar €{total.toFixed(2)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
