import { DateRangeFilter } from '../filters/DateRangeFilter';
import { StatusFilter } from '../filters/StatusFilter';

interface TransactionFiltersProps {
  onDateChange: (startDate: string, endDate: string) => void;
  onStatusChange: (status: string) => void;
  selectedStatus: string;
}

const TRANSACTION_STATUSES = ['success', 'failed', 'pending'];

export function TransactionFilters({ 
  onDateChange, 
  onStatusChange,
  selectedStatus 
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <DateRangeFilter onDateChange={onDateChange} />
      <StatusFilter
        statuses={TRANSACTION_STATUSES}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}