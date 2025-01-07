import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import { NotificationsPopover } from './NotificationsPopover';
import { ProfileDropdown } from './ProfileDropdown';
import { useAuthStore } from '../../store/auth';

export function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: `/${paths.slice(0, index + 1).join('/')}`,
      isLast: index === paths.length - 1
    }));
  };

  return (
    <nav className="bg-white border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getBreadcrumbs().map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
              {crumb.isLast ? (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              ) : (
                <Link to={crumb.href} className="text-gray-500 hover:text-gray-700">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showNotifications && (
              <NotificationsPopover onClose={() => setShowNotifications(false)} />
            )}
          </div>

          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}