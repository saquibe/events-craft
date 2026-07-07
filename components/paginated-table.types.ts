import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface PaginatedTableProps<T> {
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
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderEmptyState?: () => ReactNode;
}
