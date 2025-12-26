import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, Smartphone, Wallet, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

type PaymentMethod = 'upi' | 'card' | 'wallet';

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onSuccess,
  amount,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        setSuccess(false);
        setSelectedMethod('upi');
      }, 1500);
    }, 2000);
  };

  const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
    { id: 'upi', label: 'UPI', icon: <Smartphone className="h-5 w-5" /> },
    { id: 'card', label: 'Card', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet className="h-5 w-5" /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Complete Payment</DialogTitle>
          <DialogDescription>
            Select a payment method to complete your booking
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 animate-scale-in">
            <div className="rounded-full bg-success/10 p-4 mb-4">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h3 className="font-heading text-xl font-bold text-success">
              Payment Successful!
            </h3>
            <p className="text-muted-foreground mt-2">Confirming your booking...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-3xl font-bold font-heading text-foreground">
                ₹{amount}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Select Payment Method
              </p>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className={cn(
                      'p-4 cursor-pointer transition-all duration-200 flex flex-col items-center gap-2',
                      selectedMethod === method.id
                        ? 'border-2 border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    )}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div
                      className={cn(
                        'p-2 rounded-full',
                        selectedMethod === method.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      )}
                    >
                      {method.icon}
                    </div>
                    <span className="text-sm font-medium">{method.label}</span>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              className="w-full"
              variant="hero"
              size="lg"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₹${amount}`
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
