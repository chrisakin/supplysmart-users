import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker';

interface DateRangeFilterProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

export function DateRangeFilter({ onDateChange }: DateRangeFilterProps) {
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
    if (newValue?.startDate && newValue?.endDate) {
      onDateChange(newValue.startDate.toString(), newValue.endDate.toString());
    }
  };

  return (
    <div className="w-72">
      <Datepicker 
        value={dateValue}
        onChange={handleValueChange}
        showShortcuts={true}
        primaryColor="emerald"
        inputClassName="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        toggleClassName="absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        containerClassName="relative w-full"
        shortcuts={{
          today: "Today",
          yesterday: "Yesterday",
          past7Days: "Last 7 Days",
          past30Days: "Last 30 Days",
          thisMonth: "This Month",
          lastMonth: "Last Month"
        }}
      />
    </div>
  );
}