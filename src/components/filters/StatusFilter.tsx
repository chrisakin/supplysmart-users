import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface StatusFilterProps {
  statuses: string[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function StatusFilter({ statuses, selectedStatus, onStatusChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <span className="text-gray-700">
          {selectedStatus || 'Filter by status'}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            <button
              onClick={() => {
                onStatusChange('');
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span>All</span>
              {!selectedStatus && <Check className="h-4 w-4 text-emerald-500" />}
            </button>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  onStatusChange(status);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{status}</span>
                {selectedStatus === status && <Check className="h-4 w-4 text-emerald-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}