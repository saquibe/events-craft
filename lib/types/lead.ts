export interface Lead {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  note?: string;
  exhibitorId?: string;
  exhibitorName?: string;
  scannedAt: string;
  createdAt: string;
  updatedAt: string;
  registrationId?: string;
}

export interface LeadFormData {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  note?: string;
  exhibitorId?: string;
}

export interface LeadStats {
  totalLeads: number;
  todayLeads: number;
  thisWeekLeads: number;
  thisMonthLeads: number;
  exhibitorsWithLeads: number;
}
