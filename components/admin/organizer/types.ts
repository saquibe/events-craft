export interface Organizer {
  id: string;
  // Profile Fields
  orgLogo: string;
  orgBanner: string;
  orgName: string;
  orgAbout: string;
  orgWebsite: string;
  orgAddress1: string;
  orgAddress2: string;
  orgCity: string;
  orgState: string;
  orgCountry: string;
  orgZip: string;
  orgTaxId: string;
  orgFb: string;
  orgLin: string;
  orgX: string;
  // License Fields
  orgCode: string;
  orgValidFrom: string;
  orgValidTill: string;
  orgEventNo: number;
}

export interface OrganizerFormData {
  orgLogo: string;
  orgBanner: string;
  orgName: string;
  orgAbout: string;
  orgWebsite: string;
  orgAddress1: string;
  orgAddress2: string;
  orgCity: string;
  orgState: string;
  orgCountry: string;
  orgZip: string;
  orgTaxId: string;
  orgFb: string;
  orgLin: string;
  orgX: string;
  orgCode: string;
  orgValidFrom: string;
  orgValidTill: string;
  orgEventNo: number;
}

export interface OrganizerTabProps {
  organizer: Organizer | null;
  onUpdateOrganizer: (id: string, data: Partial<Organizer>) => void;
}

export interface OrganizerFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingOrganizer: Organizer | null;
  onSave: (data: OrganizerFormData) => void;
}
