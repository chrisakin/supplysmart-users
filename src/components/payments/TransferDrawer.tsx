import { useState, useEffect } from 'react';
import { ArrowLeft, X, Check, Search, CheckIcon, ChevronDownIcon, ChevronUpIcon, Users, Send } from 'lucide-react';
import { useUserType } from '../../hooks/useUserType';
import api from '../../lib/axios';
import { formatAmountWhileTyping, formatCurrency } from '../../lib/utils';
import { ConfirmationModal } from './ConfirmationModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { PasscodeModal } from './PasscodeModal';
import { TransferSuccessModal } from './TransferSuccessModal';

interface Bank {
  id: number;
  name: string;
  code: string;
  logo: string;
}

interface Beneficiary {
  accountNumber: string;
  bankCode: string;
  bankName: string;
  accountName: string;
}

interface TransferDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

type TransferType = 'new' | 'beneficiary';

export function TransferDrawer({ isOpen, onClose, onBack }: TransferDrawerProps) {
  const userType = useUserType();
  const [loading, setLoading] = useState(false);
  const [resolvingAccount, setResolvingAccount] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [beneficiarySearchTerm, setBeneficiarySearchTerm] = useState('');
  const [showBankList, setShowBankList] = useState(false);
  const [showBeneficiaryList, setShowBeneficiaryList] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [displayAmount, setDisplayAmount] = useState('');
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [transferType, setTransferType] = useState<TransferType>('new');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

    const fetchBeneficiaries = async () => {
      try {
        const endpoint = `/${userType}s/beneficiaries`;
        const { data } = await api.get(endpoint);
        console.log(data.data)
        setBeneficiaries(Object.values(data.data));
      } catch (error) {
        console.error('Failed to fetch beneficiaries:', error);
        toast.error('Failed to fetch beneficiaries. Please try again.');
      }
    };

    fetchBanks();
    fetchBeneficiaries();
  }, [userType]);

  const handleConfirm = async () => {
    setShowConfirmation(false);
    setShowPasscodeModal(true);
  };

  const handlePasscodeSubmit = async (enteredPasscode: string) => {
    try {
      setLoading(true);
      const { bankCode, bankLogo, amount, ...filteredFormData } = formData;
      
      const endpoint = `/${userType}s/transfer`;
      await api.post(endpoint, {
        ...filteredFormData,
        amount: String(parseFloat(amount)),
        passcode: enteredPasscode,
        source: 'Web',
        type: 'Web',
        ref: Date.now().toString()
      });
      if (saveBeneficiary) {
        const saveBeneficiaryEndpoint = `/${userType}s/save/beneficiary`;
        await api.post(saveBeneficiaryEndpoint, {
          accountNumber: formData.account_number,
          bankName: formData.bankName,
          accountName: formData.account_name
        });
      }
      toast.success('Transfer successful');
      setShowPasscodeModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Transfer failed. Please try again.');
    } finally {
      setLoading(false);
      setShowPasscodeModal(false);
    }
  };

  const handleAccountNumberChange = async (value: string) => {
    setFormData(prev => ({ ...prev, account_number: value, account_name: '' }));
    
    if (value.length === 10 && formData.bankName) {
      try {
        setResolvingAccount(true);
        const endpoint = `/${userType}s/resolve/account/number`;
        const { data } = await api.post(endpoint, {
          account_number: value,
          bankName: formData.bankName 
        });
        
        if (data.data.data?.account_name) {
          setFormData(prev => ({ ...prev, account_name: data.data.data.account_name }));
        } else {
          toast.error('Could not resolve account name');
        }
      } catch (error) {
        console.error('Failed to resolve account:', error);
        toast.error('Failed to resolve account. Please check the account number and try again.');
      } finally {
        setResolvingAccount(false);
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) {
      setDisplayAmount('');
      setFormData(prev => ({ ...prev, amount: '' }));
      return;
    }
    const decimal = (parseInt(numbers) / 100).toFixed(2);
    const formatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(parseFloat(decimal));
    setDisplayAmount(formatted);
    setFormData(prev => ({
      ...prev,
      amount: decimal
    }));
  };

  const handleBeneficiarySelect = (beneficiary: Beneficiary) => {
    setFormData(prev => ({
      ...prev,
      bankName: beneficiary.bankName,
      bankCode: beneficiary.bankCode,
      account_number: beneficiary.accountNumber,
      account_name: beneficiary.accountName
    }));
    setShowBeneficiaryList(false);
  };

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.accountName.toLowerCase().includes(beneficiarySearchTerm.toLowerCase()) ||
    beneficiary.accountNumber.includes(beneficiarySearchTerm)
  );

  const handleAmountBlur = () => {
    if (displayAmount) {
      setDisplayAmount(formatCurrency(displayAmount));
    }
  };
  
  const handleAmountFocus = () => {
    setDisplayAmount(formData.amount);
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

            {/* Transfer Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setTransferType('new')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                  transferType === 'new'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>New Transfer</span>
              </button>
              <button
                onClick={() => setTransferType('beneficiary')}
                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                  transferType === 'beneficiary'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Beneficiaries</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {transferType === 'beneficiary' ? (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Beneficiary
                  </label>
                  <div
                    onClick={() => setShowBeneficiaryList(!showBeneficiaryList)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center cursor-pointer justify-between"
                  >
                    <span className={formData.account_name ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.account_name || 'Select a beneficiary'}
                    </span>
                    {showBeneficiaryList ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  {showBeneficiaryList && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search beneficiaries..."
                            value={beneficiarySearchTerm}
                            onChange={(e) => setBeneficiarySearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {filteredBeneficiaries.map((beneficiary, index) => (
                          <div
                            key={index}
                            onClick={() => handleBeneficiarySelect(beneficiary)}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                          >
                            <div>
                              <p className="font-medium">{beneficiary.accountName}</p>
                              <p className="text-sm text-gray-500">
                                {beneficiary.bankName} • {beneficiary.accountNumber}
                              </p>
                            </div>
                          </div>
                        ))}
                        {filteredBeneficiaries.length === 0 && (
                          <div className="px-4 py-3 text-gray-500">
                            No beneficiaries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Bank
                  </label>
                  <div
                    onClick={() => setShowBankList(!showBankList)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center cursor-pointer justify-between"
                  >
                    <div className="flex items-center">
                      {formData.bankLogo && (
                        <img src={formData.bankLogo} alt="" className="w-6 h-6 mr-2" />
                      )}
                      <span className={formData.bankName ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.bankName || 'Select a bank'}
                      </span>
                    </div>
                    {showBankList ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    )}
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
                        {banks
                          .filter(bank =>
                            bank.name.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((bank) => (
                            <div
                              key={bank.id}
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  bankName: bank.name,
                                  bankCode: bank.code,
                                  bankLogo: bank.logo,
                                  account_name: ''
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
              )}

              {transferType === 'new' && (
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
                  {resolvingAccount && (
                    <p className="mt-2 text-sm text-gray-600">Resolving account...</p>
                  )}
                </div>
              )}

              {formData.account_name && transferType === 'new' && (
                <div className="mt-2">
                  <p className="text-sm text-green-600">{formData.account_name}</p>
                  <label className="flex items-center mt-2 space-x-2">
                    <div 
                      onClick={() => setSaveBeneficiary(!saveBeneficiary)}
                      className={`w-5 h-5 cursor-pointer border rounded transition-colors duration-200 flex items-center justify-center
                        ${saveBeneficiary 
                          ? 'bg-emerald-500 border-emerald-500' 
                          : 'bg-white border-gray-300'
                        }`}
                    >
                      {saveBeneficiary && <CheckIcon className="h-4 w-4 text-white" />}
                    </div>
                    <span className="text-sm text-gray-600">
                      Save as beneficiary
                    </span>
                  </label>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  onBlur={handleAmountBlur}
                  onFocus={handleAmountFocus}
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
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

    {showSuccessModal && (
     <TransferSuccessModal onClose={() => {
    setShowSuccessModal(false);
    onClose();
    }} />
    )}

      {showPasscodeModal && (
        <PasscodeModal
          onConfirm={handlePasscodeSubmit}
          onCancel={() => setShowPasscodeModal(false)}
        />
      )}
    </>
  );
}