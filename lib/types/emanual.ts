export interface Menu {
  id: string;
  name: string;
  type: "Information" | "Form";
  status: "Active" | "Inactive";
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Information {
  id: string;
  menuId: string;
  menu?: Menu;
  details: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Form {
  id: string;
  menuId: string;
  menu?: Menu;
  lastDateOfSubmission: string;
  payment: boolean;
  formConfig: any; // Form builder config
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface OfficialContractor {
  id: string;
  companyName: string;
  category: string;
  logo?: string;
  address: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactMobile?: string;
  sendEmail: boolean;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface ItemCategory {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AdditionalItem {
  id: string;
  itemCode: string;
  itemName: string;
  categoryId: string;
  category?: ItemCategory;
  photo?: string;
  unitPrice: number;
  taxPercentage: number;
  openingStock: number;
  currentStock: number;
  sold: number;
  itemFor: "eCom" | "Form";
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  exhibitorName: string;
  orderNumber: string;
  amount: number;
  tax: number;
  total: number;
  stallNumber?: string;
  hallNumber?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface EManualStats {
  totalMenus: number;
  totalInformation: number;
  totalForms: number;
  totalContractors: number;
  totalItems: number;
  totalOrders: number;
}
