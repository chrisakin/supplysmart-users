import { CheckCircle } from 'lucide-react';

interface TransferSuccessModalProps {
  onClose: () => void;
}

export function TransferSuccessModal({ onClose }: TransferSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Successful</h2>
        <p className="text-gray-600 mb-6">
          Congratulations your payment transaction is successful completed
        </p>

        <button
          onClick={onClose}
          className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}