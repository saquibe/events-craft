import { useState, useMemo, useCallback } from "react";

interface UsePaginationProps<T> {
  data: T[];
  searchFields?: (keyof T)[];
  searchTerm?: string;
  initialItemsPerPage?: number;
}

export function usePagination<T>({
  data,
  searchFields = [],
  searchTerm = "",
  initialItemsPerPage = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm || searchFields.length === 0) {
      return data;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearch);
      });
    });
  }, [data, searchTerm, searchFields]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search or items per page changes
  const handleItemsPerPageChange = useCallback((value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setCurrentPage(1);
  }, []);

  return {
    // Data
    currentData,
    filteredData,
    totalItems: filteredData.length,

    // Pagination state
    currentPage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,

    // Actions
    setCurrentPage: handlePageChange,
    setItemsPerPage: handleItemsPerPageChange,
    handleSearch,
  };
}
