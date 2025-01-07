import { X } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface ConfirmationModalProps {
  details: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    amount: string;
    narration: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({ details, onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Confirm Details</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="bg-emerald-50 p-4 rounded-lg mb-6">
            <p className="text-emerald-700 text-sm">
              Confirm the account details are correct before you proceed to avoid mistakes.
              Successful transfers cannot be reversed
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Transfer to</span>
              <span className="font-medium">{details.bankName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Account Number</span>
              <span className="font-medium">{details.accountNumber}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Account Holder Name</span>
              <span className="font-medium">{details.accountName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium">{formatCurrency(Number(details.amount))}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Description</span>
              <span className="font-medium">{details.narration}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onConfirm}
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}