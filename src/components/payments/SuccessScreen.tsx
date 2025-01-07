import { CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface SuccessScreenProps {
  amount: string;
  recipient: string;
  onClose: () => void;
}

export function SuccessScreen({ amount, recipient, onClose }: SuccessScreenProps) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Transfer Successful!</h2>
        <p className="text-gray-600 mb-6">
          You have successfully sent {formatCurrency(Number(amount))} to {recipient}
        </p>

        <button
          onClick={onClose}
          className="w-full max-w-xs mx-auto bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600"
        >
          Done
        </button>
      </div>
    </div>
  );
}