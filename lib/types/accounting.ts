export interface ExpenseCategory {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseHead {
  id: string;
  categoryId: string;
  category?: ExpenseCategory;
  name: string;
  amountPerUnit: number;
  unitQuantity: number;
  unitType: string;
  gstPercentage: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  expenseHeadId: string;
  expenseHead?: ExpenseHead;
  totalUnit: number;
  unitType: string;
  gstPercentage: number;
  date: string;
  narration: string;
  amount: number;
  gstAmount: number;
  totalAmount: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  itemName: string;
  description: string;
  taxCode: string;
  unitPrice: number;
  taxPercentage: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface RecordIncome {
  id: string;
  sponsorName: string;
  amountReceived: number;
  urnNumber: string;
  dateTime: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceFormData {
  eventName: string;
  startDate: string;
  endDate: string;
  venue: string;
  taxNo: string;
  items: Array<{
    id?: string;
    name: string;
    description: string;
    unit: number;
    amount: number;
  }>;
}

export interface Invoice extends InvoiceFormData {
  id: string;
  subTotal: number;
  totalTax: number;
  total: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationIncome {
  id: string;
  sponsorName: string;
  proposedAmount: number;
  receivedAmount: number;
  dateTime: string;
  note?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AccountingStats {
  totalExpenses: number;
  totalSponsorIncome: number;
  totalRegistrationIncome: number;
  totalInvoices: number;
  pendingInvoices: number;
  paidInvoices: number;
}
