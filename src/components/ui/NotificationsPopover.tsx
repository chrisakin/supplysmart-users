import { X } from 'lucide-react';

interface NotificationsPopoverProps {
  onClose: () => void;
}

export function NotificationsPopover({ onClose }: NotificationsPopoverProps) {
  const notifications = [
    {
      id: 1,
      title: 'New Transaction',
      message: 'You received a new transaction of ₦50,000',
      time: '5 mins ago'
    },
    {
      id: 2,
      title: 'Profile Update',
      message: 'Your profile was successfully updated',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm">{notification.title}</h4>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          </div>
        ))}
      </div>
      
      <div className="p-4 text-center border-t">
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All Notifications
        </button>
      </div>
    </div>
  );
}