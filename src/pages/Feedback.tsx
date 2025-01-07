import { useState } from 'react';
import { MessageSquare, Search, HelpCircle, Send, ChevronRight } from 'lucide-react';
import { useUserType } from '../hooks/useUserType';
import api from '../lib/axios';
import toast from 'react-hot-toast';

interface FeedbackMessage {
  id: string;
  message: string;
  createdAt: string;
  isUser: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I reset my PIN?",
    answer: "To reset your PIN, go to Profile Settings and click on 'Reset PIN'. Follow the verification process to set a new PIN.",
    category: "Account"
  },
  {
    question: "What are the transaction limits?",
    answer: "Daily transaction limits vary based on your account type and verification status. Basic accounts have a ₦50,000 daily limit.",
    category: "Transactions"
  }
];

export default function Feedback() {
  const userType = useUserType();
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<FeedbackMessage[]>([
    {
      id: '1',
      message: "Hello! How can I help you today?",
      createdAt: new Date().toISOString(),
      isUser: false
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: FeedbackMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      isUser: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    try {
      setLoading(true);
      await api.post(`/${userType}s/feedback`, { message: newMessage.message });
      toast.success('Feedback sent successfully');
    } catch (error) {
      toast.error('Failed to send feedback');
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Help & Support</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center px-6 py-3 focus:outline-none ${
                  activeTab === 'chat'
                    ? 'border-b-2 border-emerald-500 text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Live Support
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex items-center px-6 py-3 focus:outline-none ${
                  activeTab === 'faq'
                    ? 'border-b-2 border-emerald-500 text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                FAQs
              </button>
            </div>
          </div>

          {activeTab === 'chat' ? (
            <div className="flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.isUser
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.isUser ? 'text-emerald-100' : 'text-gray-500'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="border rounded-lg">
                    <button
                      onClick={() => {
                        const element = document.getElementById(`faq-${index}`);
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                    >
                      <div>
                        <span className="font-medium">{faq.question}</span>
                        <span className="block text-sm text-gray-500 mt-1">{faq.category}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <div id={`faq-${index}`} className="hidden px-6 py-4 border-t bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}