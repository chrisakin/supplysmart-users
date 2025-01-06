import { useState } from 'react';
import { PaginationParams } from '../types/pagination';

export function usePagination(initialLimit: number = 10) {
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  const getPaginationParams = (): PaginationParams => ({
    page,
    limit,
  });

  return {
    page,
    limit,
    setPage,
    getPaginationParams,
  };
}