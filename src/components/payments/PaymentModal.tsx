import { useState } from 'react';
import { X } from 'lucide-react';
import { TransferDrawer } from './TransferDrawer';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showTransferDrawer, setShowTransferDrawer] = useState(false);

  if (!isOpen && !showTransferDrawer) return null;

  const paymentMethods = [
    { id: 'bank', label: 'Transfer to Bank' },
    { id: 'bills', label: 'Pay Bills ( Gotv , Dstv , StarTime )' },
    { id: 'data', label: 'Data & Airtime' },
  ];

  const handleContinue = () => {
    if (selectedMethod === 'bank') {
      setShowTransferDrawer(true);
    } else {
      // Handle other payment methods
      console.log('Selected payment method:', selectedMethod);
      onClose();
    }
  };

  if (showTransferDrawer) {
    return (
      <TransferDrawer
        isOpen={showTransferDrawer}
        onClose={() => {
          setShowTransferDrawer(false);
          onClose();
        }}
        onBack={() => setShowTransferDrawer(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-8 border-b">
          <h2 className="text-lg font-semibold">Payment method</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center gap-3 w-full">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id ? 'border-white' : 'border-gray-400'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="flex-1">{method.label}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="p-8 border-t">
          <button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}