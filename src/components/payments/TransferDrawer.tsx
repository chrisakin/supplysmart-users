import { useState, useEffect } from 'react';
import { ArrowLeft, X, Check, Search } from 'lucide-react';
import { useUserType } from '../../hooks/useUserType';
import api from '../../lib/axios';
import { formatCurrency } from '../../lib/utils';
import { ConfirmationModal } from './ConfirmationModal';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Bank {
  id: number;
  name: string;
  code: string;
  logo: string;
}

interface TransferDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

export function TransferDrawer({ isOpen, onClose, onBack }: TransferDrawerProps) {
  const userType = useUserType();
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBankList, setShowBankList] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  
  const [formData, setFormData] = useState({
    bankName: '',
    bankCode: '',
    bankLogo: '',
    account_number: '',
    account_name: '',
    amount: '',
    narration: '',
  });

  useEffect(() => {
    const fetchBanks = async () => {
      try {
         const token = localStorage.getItem('token');
        const { data } = await axios.get('https://api.wildfusions.com/bank', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setBanks(data.banks);
      } catch (error) {
        console.error('Failed to fetch banks:', error);
        toast.error('Failed to fetch banks. Please try again.');
      }
    };
    fetchBanks();
  }, []);

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccountNumberChange = async (value: string) => {
    setFormData(prev => ({ ...prev, account_number: value, account_name: '' }));
    
    if (value.length === 10 && formData.bankCode) {
      try {
        const endpoint = `/${userType}s/resolve/account/number`;
        const { data } = await api.post(endpoint, {
          account_number: value,
          bankName: formData.bankName
        });
        setFormData(prev => ({ ...prev, account_name: data.data?.account_name }));
      } catch (error) {
        console.error('Failed to resolve account:', error);
      }
    }
  };

  const handleAmountChange = (value: string) => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, amount: numericValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50">
        <div className="absolute inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Transfer to Bank Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bank
                </label>
                <div
                  onClick={() => setShowBankList(true)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center cursor-pointer"
                >
                  {formData.bankLogo && (
                    <img src={formData.bankLogo} alt="" className="w-6 h-6 mr-2" />
                  )}
                  <span className={formData.bankName ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.bankName || 'Select a bank'}
                  </span>
                </div>

                {showBankList && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search banks..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {filteredBanks.map((bank) => (
                        <div
                          key={bank.id}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              bankName: bank.name,
                              bankCode: bank.code,
                              bankLogo: bank.logo
                            }));
                            setShowBankList(false);
                          }}
                          className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <img src={bank.logo} alt="" className="w-6 h-6 mr-2" />
                          <span>{bank.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={10}
                  value={formData.account_number}
                  onChange={(e) => handleAccountNumberChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter 10-digit account number"
                  required
                />
                {formData.account_name && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">{formData.account_name}</p>
                    <label className="flex items-center mt-2 space-x-2">
                      <input
                        type="checkbox"
                        checked={saveBeneficiary}
                        onChange={(e) => setSaveBeneficiary(e.target.checked)}
                        className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-600 flex items-center">
                        <Check className="w-4 h-4 text-emerald-500 mr-1" />
                        Save as beneficiary
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  value={formData.amount ? formatCurrency(Number(formData.amount)) : ''}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narration
                </label>
                <input
                  type="text"
                  value={formData.narration}
                  onChange={(e) => setFormData(prev => ({ ...prev, narration: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="What's this for?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !formData.account_name}
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          details={{
            bankName: formData.bankName,
            accountNumber: formData.account_number,
            accountName: formData.account_name,
            amount: formData.amount,
            narration: formData.narration
          }}
          onConfirm={async () => {
            try {
              setLoading(true);
              const endpoint = `/${userType}s/transfer`;
              await api.post(endpoint, {
                ...formData,
                source: 'Web',
                type: 'Web',
                ref: Date.now().toString()
              });
              toast.success('Transfer successful');
              onClose();
            } catch (error) {
              toast.error('Transfer failed. Please try again.');
            } finally {
              setLoading(false);
              setShowConfirmation(false);
            }
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
}