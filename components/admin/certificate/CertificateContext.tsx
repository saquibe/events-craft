// components/admin/certificate/CertificateContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface CertificateField {
  id: string;
  type: "text" | "image" | "shape";
  label: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  alignment?: "left" | "center" | "right";
  isVisible: boolean;
  isEditable: boolean;
  imageUrl?: string;
}

export interface CertificateDesign {
  id: string;
  name: string;
  size: {
    width: number;
    height: number;
    unit: "mm" | "px";
    preset?: "A4" | "A5" | "A6" | "custom";
  };
  orientation: "portrait" | "landscape";
  background: {
    type: "image" | "color" | "gradient" | "none";
    value: string;
    imageUrl?: string;
  };
  fields: CertificateField[];
  settings: {
    borderRadius: number;
    padding: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  name: string;
  designId: string;
  attendeeProfile: string;
  attendance: "Conference" | "Workshop" | "Poster" | "Paper";
  assignedTo: string[];
  sentTo: string[];
  status: "draft" | "assigned" | "sent";
  createdAt: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  registrationNumber: string;
  profile: string;
  city: string;
  country: string;
  customFields: Record<string, string>;
}

export interface AttendanceData {
  attendeeId: string;
  conferenceAttended: boolean;
  workshopAttended: boolean;
  posterPresented: boolean;
  paperPresented: boolean;
  conferenceDate?: string;
  workshopDate?: string;
  posterDate?: string;
  paperDate?: string;
}

interface CertificateContextType {
  designs: CertificateDesign[];
  certificates: Certificate[];
  attendees: Attendee[];
  attendanceData: AttendanceData[];
  selectedDesign: CertificateDesign | null;
  selectedCertificate: Certificate | null;
  eventId?: string;
  addDesign: (
    design: Omit<CertificateDesign, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateDesign: (id: string, updates: Partial<CertificateDesign>) => void;
  deleteDesign: (id: string) => void;
  getDesignById: (id: string) => CertificateDesign | undefined;
  selectDesign: (id: string | null) => void;
  addCertificate: (
    certificate: Omit<Certificate, "id" | "createdAt" | "status">,
  ) => void;
  updateCertificate: (id: string, updates: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  assignCertificate: (certificateId: string, attendeeIds: string[]) => void;
  sendCertificate: (certificateId: string, attendeeIds: string[]) => void;
  getAttendeeById: (id: string) => Attendee | undefined;
  getAttendanceByAttendee: (attendeeId: string) => AttendanceData | undefined;
}

const CertificateContext = createContext<CertificateContextType | undefined>(
  undefined,
);

const mockAttendees: Attendee[] = [
  {
    id: "att-1",
    name: "Mintu Nath",
    email: "m@n.com",
    registrationNumber: "REG001",
    profile: "Delegate",
    city: "New York",
    country: "USA",
    customFields: {},
  },
  {
    id: "att-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    registrationNumber: "REG002",
    profile: "Faculty",
    city: "London",
    country: "UK",
    customFields: {},
  },
  {
    id: "att-3",
    name: "Michael Chen",
    email: "michael@example.com",
    registrationNumber: "REG003",
    profile: "Committee",
    city: "Singapore",
    country: "Singapore",
    customFields: {},
  },
];

const mockAttendance: AttendanceData[] = [
  {
    attendeeId: "att-1",
    conferenceAttended: true,
    workshopAttended: true,
    posterPresented: false,
    paperPresented: true,
    conferenceDate: "2024-10-15",
    workshopDate: "2024-10-16",
    paperDate: "2024-10-17",
  },
  {
    attendeeId: "att-2",
    conferenceAttended: true,
    workshopAttended: false,
    posterPresented: true,
    paperPresented: false,
    conferenceDate: "2024-10-15",
    posterDate: "2024-10-16",
  },
  {
    attendeeId: "att-3",
    conferenceAttended: true,
    workshopAttended: true,
    posterPresented: true,
    paperPresented: true,
    conferenceDate: "2024-10-15",
    workshopDate: "2024-10-16",
    posterDate: "2024-10-17",
    paperDate: "2024-10-18",
  },
];

const mockCertificates: Certificate[] = [
  {
    id: "cert-1",
    name: "Participation Cert",
    designId: "design-1",
    attendeeProfile: "Delegate",
    attendance: "Conference",
    assignedTo: ["att-1", "att-2"],
    sentTo: ["att-1"],
    status: "assigned",
    createdAt: new Date().toISOString(),
  },
];

const defaultDesign: CertificateDesign = {
  id: "design-1",
  name: "Default Certificate",
  size: { width: 210, height: 297, unit: "mm", preset: "A4" },
  orientation: "portrait",
  background: {
    type: "none",
    value: "#ffffff",
  },
  fields: [
    {
      id: "title",
      type: "text",
      label: "Title",
      content: "Certificate of Participation",
      x: 20,
      y: 30,
      width: 80,
      height: 25,
      fontSize: 28,
      fontFamily: "Georgia, serif",
      fontWeight: "bold",
      color: "#1a1a2e",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    },
    {
      id: "attendee-name",
      type: "text",
      label: "Full Name",
      content: "{{fullName}}",
      x: 20,
      y: 65,
      width: 80,
      height: 35,
      fontSize: 32,
      fontFamily: "Georgia, serif",
      fontWeight: "bold",
      color: "#e8752a",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    },
    {
      id: "description",
      type: "text",
      label: "Description",
      content: "for attending and actively participating in the",
      x: 20,
      y: 105,
      width: 80,
      height: 20,
      fontSize: 14,
      fontFamily: "Georgia, serif",
      fontWeight: "normal",
      color: "#4a4a5a",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    },
    {
      id: "event-name",
      type: "text",
      label: "Event Name",
      content: "Global Tech Summit 2024",
      x: 20,
      y: 130,
      width: 80,
      height: 25,
      fontSize: 20,
      fontFamily: "Georgia, serif",
      fontWeight: "bold",
      color: "#1a1a2e",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    },
    {
      id: "date",
      type: "text",
      label: "Date",
      content: "15th October 2024",
      x: 20,
      y: 160,
      width: 80,
      height: 18,
      fontSize: 14,
      fontFamily: "Georgia, serif",
      fontWeight: "normal",
      color: "#4a4a5a",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    },
    {
      id: "organizer",
      type: "text",
      label: "Organizer",
      content: "Zylker Corporation",
      x: 20,
      y: 185,
      width: 80,
      height: 16,
      fontSize: 12,
      fontFamily: "Georgia, serif",
      fontWeight: "normal",
      color: "#666",
      alignment: "center",
      isVisible: true,
      isEditable: true,
    },
  ],
  settings: {
    borderRadius: 0,
    padding: 20,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface CertificateProviderProps {
  children: React.ReactNode;
  eventId?: string;
}

export function CertificateProvider({
  children,
  eventId,
}: CertificateProviderProps) {
  const [designs, setDesigns] = useState<CertificateDesign[]>([defaultDesign]);
  const [certificates, setCertificates] =
    useState<Certificate[]>(mockCertificates);
  const [selectedDesign, setSelectedDesign] =
    useState<CertificateDesign | null>(defaultDesign);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const addDesign = useCallback(
    (design: Omit<CertificateDesign, "id" | "createdAt" | "updatedAt">) => {
      const newDesign: CertificateDesign = {
        ...design,
        id: `design-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setDesigns((prev) => [...prev, newDesign]);
      setSelectedDesign(newDesign);
    },
    [],
  );

  const updateDesign = useCallback(
    (id: string, updates: Partial<CertificateDesign>) => {
      setDesigns((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, ...updates, updatedAt: new Date().toISOString() }
            : d,
        ),
      );
      if (selectedDesign?.id === id) {
        setSelectedDesign((prev) => (prev ? { ...prev, ...updates } : null));
      }
    },
    [selectedDesign],
  );

  const deleteDesign = useCallback(
    (id: string) => {
      setDesigns((prev) => prev.filter((d) => d.id !== id));
      if (selectedDesign?.id === id) {
        setSelectedDesign(null);
      }
    },
    [selectedDesign],
  );

  const getDesignById = useCallback(
    (id: string) => {
      return designs.find((d) => d.id === id);
    },
    [designs],
  );

  const selectDesign = useCallback(
    (id: string | null) => {
      if (!id) {
        setSelectedDesign(null);
        return;
      }
      const design = designs.find((d) => d.id === id);
      setSelectedDesign(design || null);
    },
    [designs],
  );

  const addCertificate = useCallback(
    (certificate: Omit<Certificate, "id" | "createdAt" | "status">) => {
      const newCert: Certificate = {
        ...certificate,
        id: `cert-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "draft",
      };
      setCertificates((prev) => [...prev, newCert]);
    },
    [],
  );

  const updateCertificate = useCallback(
    (id: string, updates: Partial<Certificate>) => {
      setCertificates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      );
      if (selectedCertificate?.id === id) {
        setSelectedCertificate((prev) =>
          prev ? { ...prev, ...updates } : null,
        );
      }
    },
    [selectedCertificate],
  );

  const deleteCertificate = useCallback(
    (id: string) => {
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      if (selectedCertificate?.id === id) {
        setSelectedCertificate(null);
      }
    },
    [selectedCertificate],
  );

  const assignCertificate = useCallback(
    (certificateId: string, attendeeIds: string[]) => {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === certificateId
            ? {
                ...c,
                assignedTo: [...new Set([...c.assignedTo, ...attendeeIds])],
                status: "assigned",
              }
            : c,
        ),
      );
    },
    [],
  );

  const sendCertificate = useCallback(
    (certificateId: string, attendeeIds: string[]) => {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === certificateId
            ? {
                ...c,
                sentTo: [...new Set([...c.sentTo, ...attendeeIds])],
                status: "sent",
              }
            : c,
        ),
      );
    },
    [],
  );

  const getAttendeeById = useCallback((id: string) => {
    return mockAttendees.find((a) => a.id === id);
  }, []);

  const getAttendanceByAttendee = useCallback((attendeeId: string) => {
    return mockAttendance.find((a) => a.attendeeId === attendeeId);
  }, []);

  return (
    <CertificateContext.Provider
      value={{
        designs,
        certificates,
        attendees: mockAttendees,
        attendanceData: mockAttendance,
        selectedDesign,
        selectedCertificate,
        eventId,
        addDesign,
        updateDesign,
        deleteDesign,
        getDesignById,
        selectDesign,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        assignCertificate,
        sendCertificate,
        getAttendeeById,
        getAttendanceByAttendee,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}

export function useCertificate() {
  const context = useContext(CertificateContext);
  if (!context) {
    throw new Error("useCertificate must be used within a CertificateProvider");
  }
  return context;
}
