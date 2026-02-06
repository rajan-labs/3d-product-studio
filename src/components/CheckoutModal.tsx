import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, User, Check, ChevronRight, ShieldCheck, AlertTriangle, PartyPopper, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { ConfiguredProduct, CheckoutFormData } from '@/types/product';
import { useOrderHistory } from '@/hooks/useOrderHistory';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ConfiguredProduct;
  onComplete: () => void;
}

type Step = 'info' | 'shipping' | 'payment' | 'confirm' | 'success';

const steps: { id: Step; label: string; icon: typeof User }[] = [
  { id: 'info', label: 'Info', icon: User },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'confirm', label: 'Confirm', icon: Check },
];

export const CheckoutModal = ({ isOpen, onClose, product, onComplete }: CheckoutModalProps) => {
  const { addOrder } = useOrderHistory();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: Step): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (step === 'info') {
      if (!formData.firstName.trim()) newErrors.firstName = 'Required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Required';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid phone required';
    }

    if (step === 'shipping') {
      if (!formData.address.trim()) newErrors.address = 'Required';
      if (!formData.city.trim()) newErrors.city = 'Required';
      if (!formData.state.trim()) newErrors.state = 'Required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'Required';
    }

    if (step === 'payment') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Valid card required';
      if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'MM/YY format';
      if (!formData.cvv.trim() || formData.cvv.length < 3) newErrors.cvv = '3-4 digits';
      if (!formData.cardName.trim()) newErrors.cardName = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;

    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
    }
  };

  const prevStep = () => {
    const stepIndex = steps.findIndex((s) => s.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  const handleSubmit = () => {
    addOrder(product.product, product.selectedColor, product.selectedVariants, product.totalPrice);
    setCurrentStep('success');
  };

  const handleClose = () => {
    onComplete();
    onClose();
    setCurrentStep('info');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
    });
  };

  const InputField = ({ 
    label, 
    field, 
    type = 'text', 
    placeholder,
    className = ''
  }: { 
    label: string; 
    field: keyof CheckoutFormData; 
    type?: string; 
    placeholder?: string;
    className?: string;
  }) => (
    <div className={className}>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 bg-secondary/50 border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors ${
          errors[field] ? 'border-red-500' : 'border-border'
        }`}
      />
      {errors[field] && <span className="text-xs text-red-500 mt-1">{errors[field]}</span>}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 lg:inset-[10%] z-50 glass-panel rounded-2xl overflow-hidden flex flex-col max-w-3xl mx-auto"
          >
            {/* Demo Notice */}
            <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-center gap-2">
              <AlertTriangle size={14} className="text-amber-500" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                Demo Only — No real payments will be processed
              </span>
            </div>

            {/* Header */}
            {currentStep !== 'success' && (
              <div className="p-4 lg:p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl lg:text-2xl font-display font-bold">Checkout</h2>
                  <button onClick={handleClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = step.id === currentStep;
                    const isPast = steps.findIndex((s) => s.id === currentStep) > index;

                    return (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : isPast
                              ? 'bg-primary/20 text-primary'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          <Icon size={16} />
                          <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <ChevronRight size={16} className="mx-2 text-muted-foreground" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <AnimatePresence mode="wait">
                {currentStep === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="First Name" field="firstName" placeholder="John" />
                      <InputField label="Last Name" field="lastName" placeholder="Doe" />
                    </div>
                    <InputField label="Email" field="email" type="email" placeholder="john@example.com" />
                    <InputField label="Phone" field="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </motion.div>
                )}

                {currentStep === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">Shipping Address</h3>
                    <InputField label="Street Address" field="address" placeholder="123 Main Street" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="City" field="city" placeholder="New York" />
                      <InputField label="State" field="state" placeholder="NY" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="ZIP Code" field="zipCode" placeholder="10001" />
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Country</label>
                        <select
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full px-3 py-2.5 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Japan</option>
                          <option>Australia</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg flex items-center gap-3 text-sm">
                      <Truck size={20} className="text-primary" />
                      <div>
                        <p className="font-medium">Free Express Shipping</p>
                        <p className="text-muted-foreground">Estimated delivery: 3-5 business days</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">Payment Details</h3>
                    <InputField label="Card Number" field="cardNumber" placeholder="1234 5678 9012 3456" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Expiry Date" field="expiryDate" placeholder="MM/YY" />
                      <InputField label="CVV" field="cvv" placeholder="123" />
                    </div>
                    <InputField label="Name on Card" field="cardName" placeholder="JOHN DOE" />
                    <div className="p-3 bg-green-500/10 rounded-lg flex items-center gap-3 text-sm">
                      <ShieldCheck size={20} className="text-green-500" />
                      <div>
                        <p className="font-medium text-green-600">Secure Payment</p>
                        <p className="text-muted-foreground">Your payment info is encrypted and secure</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    {/* Product */}
                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-lg"
                          style={{ backgroundColor: product.selectedColor.hex }}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{product.product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.selectedColor.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(product.selectedVariants).map(([variantId, optionId]) => {
                              const variant = product.product.variants.find((v) => v.id === variantId);
                              const option = variant?.options.find((o) => o.id === optionId);
                              return option ? (
                                <span key={variantId} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                  {option.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">${product.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping */}
                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <h4 className="font-medium mb-2">Shipping to</h4>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                      </p>
                    </div>

                    {/* Payment */}
                    <div className="p-4 bg-secondary/30 rounded-xl">
                      <h4 className="font-medium mb-2">Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-2xl font-bold text-primary">${product.totalPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Including free shipping and 2-year warranty</p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-8 lg:py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 lg:w-24 lg:h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <PartyPopper size={40} className="text-emerald-500 lg:w-12 lg:h-12" />
                    </motion.div>
                    
                    <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                      Payment Simulation Successful!
                    </h3>
                    <p className="text-muted-foreground mb-4">Demo Only — No real money involved</p>
                    
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-6 max-w-sm">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <GraduationCap size={18} className="text-emerald-500" />
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Educational Demo</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This is a portfolio demonstration project. No actual payment was processed and no products will be shipped.
                      </p>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-xl mb-6">
                      <p className="text-sm">
                        <span className="font-semibold">{product.product.name}</span>
                        <span className="text-muted-foreground"> in </span>
                        <span className="font-semibold">{product.selectedColor.name}</span>
                      </p>
                      <p className="text-lg font-bold text-primary mt-1">${product.totalPrice.toLocaleString()}</p>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Order ID: DEMO-{Date.now().toString(36).toUpperCase()}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {currentStep !== 'success' ? (
              <div className="p-4 lg:p-6 border-t border-border flex gap-3">
                {currentStep !== 'info' && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-secondary rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={currentStep === 'confirm' ? handleSubmit : nextStep}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                >
                  {currentStep === 'confirm' ? 'Place Order (Demo)' : 'Continue'}
                </button>
              </div>
            ) : (
              <div className="p-4 lg:p-6 border-t border-border">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
                >
                  Close & Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
