import { X } from 'lucide-react';
import { formatDate, formatCurrency } from '../../lib/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface TransactionModalProps {
  transaction: any;
  onClose: () => void;
}

export function TransactionModal({ transaction, onClose }: TransactionModalProps) {
  const downloadAsImage = async () => {
    const element = document.getElementById('receipt');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = `receipt-${transaction.transactionReference}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to download receipt:', err);
    }
  };

  const downloadAsPDF = async () => {
    const element = document.getElementById('receipt');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${transaction.transactionReference}.pdf`);
    } catch (err) {
      console.error('Failed to download receipt:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Transaction Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6" id="receipt">
          <div className="bg-emerald-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-emerald-800">
              All of the information are the transaction details done on {formatDate(transaction.createdAt)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Transaction Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium">{transaction.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reference</p>
                  <p className="font-medium">{transaction.transactionReference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{formatCurrency(transaction.transactionAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    transaction.transactionStatus === 'success' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.transactionStatus}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-4">Recipient Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Bank</p>
                  <p className="font-medium capitalize">{transaction.recipientBank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Name</p>
                  <p className="font-medium">{transaction.recipientAccountName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-medium">{transaction.recipientAccountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transfer Code</p>
                  <p className="font-medium">{transaction.transactionTransferCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-4 justify-end">
            <button
              onClick={downloadAsImage}
              className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Download as Image
            </button>
            <button
              onClick={downloadAsPDF}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}