"use client";

import { ReactNode, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "./pagination-controls";

interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface PaginatedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  showItemsPerPage?: boolean;
  className?: string;
  tableClassName?: string;
  // Custom renderers
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderEmptyState?: () => ReactNode;
}

export function PaginatedTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search...",
  searchFields = [],
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  onRowClick,
  emptyMessage = "No items found",
  showItemsPerPage = true,
  className = "",
  tableClassName = "",
  renderHeader,
  renderFooter,
  renderEmptyState,
}: PaginatedTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Filter data
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

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset page on search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {renderHeader ? (
          renderHeader()
        ) : (
          <div>
            <h3 className="text-lg font-semibold">
              {filteredData.length} items
            </h3>
          </div>
        )}

        {searchFields.length > 0 && (
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div
        className={`bg-card rounded-lg shadow border border-border overflow-hidden ${tableClassName}`}
      >
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-muted/50">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`text-foreground font-bold ${col.headerClassName || ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground text-base"
                >
                  {renderEmptyState
                    ? renderEmptyState()
                    : searchTerm
                      ? "No matching items found"
                      : emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className={`border-border hover:bg-muted/50 h-20 ${onRowClick ? "cursor-pointer" : ""}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={`text-muted-foreground text-base ${col.className || ""}`}
                    >
                      {col.cell ? col.cell(item) : item[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        showItemsPerPage={showItemsPerPage}
        itemsPerPageOptions={itemsPerPageOptions}
      />

      {renderFooter && renderFooter()}
    </div>
  );
}
