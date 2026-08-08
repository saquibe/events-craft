export interface Category {
  id: string;
  name: string;
  options: string[];
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AbstractReviewer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  designation?: string;
  company?: string;
  categoryId: string;
  category?: Category;
  optionName: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AbstractApprover {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  designation?: string;
  company?: string;
  categoryId: string;
  category?: Category;
  optionName: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface PresentationJudge {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  abstractType: "Paper" | "Poster";
  categoryId: string;
  category?: Category;
  optionName: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export type AbstractStatus =
  | "Pending Review"
  | "Reviewed"
  | "Accepted"
  | "Rejected";

export interface Abstract {
  id: string;
  submittedBy: string;
  presenterName: string;
  coAuthors: string[];
  abstractTitle: string;
  abstractDetails: string;
  wordCount: number;
  categoryId: string;
  category?: Category;
  optionName: string;
  abstractNumber: string;
  status: AbstractStatus;
  submittedAt: string;
  updatedAt: string;
}

export interface AbstractStats {
  totalAbstracts: number;
  pendingReview: number;
  reviewed: number;
  accepted: number;
  rejected: number;
  totalCategories: number;
}
