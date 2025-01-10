import { useState, useCallback } from 'react';

interface Filters {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export function useFilters(initialFilters: Filters = {}) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const getQueryParams = useCallback(() => {
    const params: Record<string, string> = {};
    
    if (filters.startDate) {
      params.startDate = filters.startDate;
    }
    if (filters.endDate) {
      params.endDate = filters.endDate;
    }
    if (filters.status) {
      params.status = filters.status;
    }

    return params;
  }, [filters]);

  return {
    filters,
    updateFilters,
    getQueryParams
  };
}