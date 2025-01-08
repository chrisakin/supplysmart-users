import { LogOut, X } from 'lucide-react';
import { Link } from './ui/Link';
import { images } from '../assets';
import { agentMenu, aggregatorMenu } from '../config/navigation';
import { useUserType } from '../hooks/useUserType';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const userType = useUserType();
  const menuItems = userType === 'agent' ? agentMenu : aggregatorMenu;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img src={images.logo} alt="SupplySmart" className="h-8 w-auto" />
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={onClose}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => {
              onClose();
              window.location.href = '/';
            }}
            className="flex items-center text-red-500 hover:text-red-600 transition-colors w-full px-3 py-2 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}