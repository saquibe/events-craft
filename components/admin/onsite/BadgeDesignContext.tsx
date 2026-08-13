// components/admin/onsite/BadgeDesignContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface BadgeField {
  id: string;
  type: "text" | "image" | "qr" | "rectangle";
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
  backgroundColor?: string;
  alignment?: "left" | "center" | "right";
  isVisible: boolean;
  isEditable: boolean;
  imageUrl?: string;
}

export interface BadgeTemplate {
  id: string;
  name: string;
  type:
    | "common"
    | "delegate"
    | "speaker"
    | "exhibitor"
    | "staff"
    | "sponsor"
    | "organizer";
  size: {
    width: number;
    height: number;
    unit: "mm" | "px" | "in";
  };
  orientation: "portrait" | "landscape";
  frontSide: BadgeField[];
  backSide: BadgeField[];
  background: {
    type: "image" | "gradient" | "color" | "none";
    value: string;
    imageUrl?: string;
  };
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BadgeDesignContextType {
  templates: BadgeTemplate[];
  selectedTemplate: BadgeTemplate | null;
  setSelectedTemplate: (template: BadgeTemplate | null) => void;
  addTemplate: (
    template: Omit<BadgeTemplate, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateTemplate: (id: string, template: Partial<BadgeTemplate>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => void;
  getTemplateById: (id: string) => BadgeTemplate | undefined;
  setTemplateSize: (
    id: string,
    size: {
      width: number;
      height: number;
      orientation: "portrait" | "landscape";
    },
  ) => void;
}

const BadgeDesignContext = createContext<BadgeDesignContextType | undefined>(
  undefined,
);

const defaultTemplates: BadgeTemplate[] = [
  {
    id: "1",
    name: "Attendee Badge",
    type: "common",
    size: { width: 105, height: 148, unit: "mm" },
    orientation: "portrait",
    isDefault: true,
    frontSide: [
      {
        id: "event-name",
        type: "text",
        label: "Event Name",
        content: "Zylker Summit 2024",
        x: 20,
        y: 25,
        width: 65,
        height: 22,
        fontSize: 18,
        fontFamily: "Arial",
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
        content: "Alexander Fleming",
        x: 20,
        y: 55,
        width: 65,
        height: 35,
        fontSize: 24,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "#1a1a2e",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
      {
        id: "organization",
        type: "text",
        label: "Company Name",
        content: "Zylker Corporation",
        x: 20,
        y: 95,
        width: 65,
        height: 22,
        fontSize: 16,
        fontFamily: "Arial",
        fontWeight: "normal",
        color: "#666",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
      {
        id: "badge-type",
        type: "text",
        label: "Badge Type",
        content: "VIP PASS",
        x: 20,
        y: 122,
        width: 65,
        height: 22,
        fontSize: 18,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "#e74c3c",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
    ],
    backSide: [
      {
        id: "qr-code",
        type: "qr",
        label: "QR Code",
        content: "https://zylker.com/attendee/12345",
        x: 30,
        y: 40,
        width: 45,
        height: 45,
        isVisible: true,
        isEditable: true,
      },
      {
        id: "company-logo",
        type: "image",
        label: "Company Logo",
        content: "",
        x: 30,
        y: 95,
        width: 45,
        height: 30,
        isVisible: true,
        isEditable: true,
      },
    ],
    background: {
      type: "none",
      value: "#ffffff",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Speakers Badge",
    type: "speaker",
    size: { width: 105, height: 148, unit: "mm" },
    orientation: "portrait",
    isDefault: true,
    frontSide: [
      {
        id: "event-name",
        type: "text",
        label: "Event Name",
        content: "Zylker Summit 2024",
        x: 20,
        y: 20,
        width: 65,
        height: 20,
        fontSize: 16,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "#1a1a2e",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
      {
        id: "speaker-name",
        type: "text",
        label: "Speaker Name",
        content: "Dr. Sarah Johnson",
        x: 20,
        y: 50,
        width: 65,
        height: 32,
        fontSize: 22,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "#1a1a2e",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
      {
        id: "speaker-title",
        type: "text",
        label: "Speaker Title",
        content: "Keynote Speaker",
        x: 20,
        y: 88,
        width: 65,
        height: 20,
        fontSize: 14,
        fontFamily: "Arial",
        fontWeight: "normal",
        color: "#666",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
      {
        id: "badge-type",
        type: "text",
        label: "Badge Type",
        content: "SPEAKER",
        x: 20,
        y: 118,
        width: 65,
        height: 24,
        fontSize: 20,
        fontFamily: "Arial",
        fontWeight: "bold",
        color: "#2ecc71",
        alignment: "center",
        isVisible: true,
        isEditable: true,
      },
    ],
    backSide: [
      {
        id: "qr-code",
        type: "qr",
        label: "QR Code",
        content: "https://zylker.com/speaker/67890",
        x: 30,
        y: 35,
        width: 45,
        height: 45,
        isVisible: true,
        isEditable: true,
      },
      {
        id: "speaker-photo",
        type: "image",
        label: "Speaker Photo",
        content: "",
        x: 30,
        y: 90,
        width: 45,
        height: 35,
        isVisible: true,
        isEditable: true,
      },
    ],
    background: {
      type: "gradient",
      value: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function BadgeDesignProvider({
  children,
  eventId,
}: {
  children: React.ReactNode;
  eventId: string;
}) {
  const [templates, setTemplates] = useState<BadgeTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] =
    useState<BadgeTemplate | null>(null);

  const addTemplate = useCallback(
    (template: Omit<BadgeTemplate, "id" | "createdAt" | "updatedAt">) => {
      const newTemplate: BadgeTemplate = {
        ...template,
        id: `template-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTemplates((prev) => [...prev, newTemplate]);
      setSelectedTemplate(newTemplate);
      return newTemplate;
    },
    [],
  );

  const updateTemplate = useCallback(
    (id: string, updates: Partial<BadgeTemplate>) => {
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === id
            ? { ...template, ...updates, updatedAt: new Date().toISOString() }
            : template,
        ),
      );
      if (selectedTemplate?.id === id) {
        setSelectedTemplate((prev) => (prev ? { ...prev, ...updates } : null));
      }
    },
    [selectedTemplate],
  );

  const deleteTemplate = useCallback(
    (id: string) => {
      setTemplates((prev) => prev.filter((template) => template.id !== id));
      if (selectedTemplate?.id === id) {
        setSelectedTemplate(null);
      }
    },
    [selectedTemplate],
  );

  const duplicateTemplate = useCallback(
    (id: string) => {
      const template = templates.find((t) => t.id === id);
      if (!template) return;

      const newTemplate: BadgeTemplate = {
        ...template,
        id: `template-${Date.now()}`,
        name: `${template.name} (Copy)`,
        isDefault: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTemplates((prev) => [...prev, newTemplate]);
    },
    [templates],
  );

  const getTemplateById = useCallback(
    (id: string) => {
      return templates.find((template) => template.id === id);
    },
    [templates],
  );

  const setTemplateSize = useCallback(
    (
      id: string,
      size: {
        width: number;
        height: number;
        orientation: "portrait" | "landscape";
      },
    ) => {
      const template = templates.find((t) => t.id === id);
      if (!template) {
        // If template doesn't exist (new badge), we'll set it later
        return;
      }
      updateTemplate(id, {
        size: { ...template.size, width: size.width, height: size.height },
        orientation: size.orientation,
      });
    },
    [templates, updateTemplate],
  );

  return (
    <BadgeDesignContext.Provider
      value={{
        templates,
        selectedTemplate,
        setSelectedTemplate,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        duplicateTemplate,
        getTemplateById,
        setTemplateSize,
      }}
    >
      {children}
    </BadgeDesignContext.Provider>
  );
}

export function useBadgeDesign() {
  const context = useContext(BadgeDesignContext);
  if (!context) {
    throw new Error("useBadgeDesign must be used within a BadgeDesignProvider");
  }
  return context;
}
