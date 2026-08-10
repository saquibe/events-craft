"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InformationTable } from "@/components/admin/emanual/InformationTable";
import { InformationFormSheet } from "@/components/admin/emanual/InformationFormSheet";
import { Information, Menu } from "@/lib/types/emanual";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockMenus: Menu[] = [
  {
    id: "1",
    name: "About Event",
    type: "Information",
    status: "Active",
    order: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Venue Info",
    type: "Information",
    status: "Active",
    order: 2,
    createdAt: "",
    updatedAt: "",
  },
];

const mockInformations: Information[] = [
  {
    id: "1",
    menuId: "1",
    menu: mockMenus[0],
    details:
      "<h3>Welcome to the Event</h3><p>This is the annual medical conference...</p>",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

export default function InformationPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [informations, setInformations] =
    useState<Information[]>(mockInformations);
  const [menus] = useState<Menu[]>(mockMenus);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInformation, setEditingInformation] =
    useState<Information | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingInformation) {
      setInformations(
        informations.map((i) =>
          i.id === editingInformation.id
            ? { ...i, ...data, updatedAt: new Date().toISOString() }
            : i,
        ),
      );
    } else {
      const newInformation: Information = {
        id: String(informations.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setInformations([...informations, newInformation]);
    }
    setIsFormOpen(false);
    setEditingInformation(null);
  };

  const handleEdit = (information: Information) => {
    setEditingInformation(information);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setInformations(informations.filter((i) => i.id !== id));
  };

  const handleStatusChange = (id: string, status: Information["status"]) => {
    setInformations(
      informations.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Information</h2>
          <p className="text-muted-foreground">
            Manage eManual information content for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Information"
          onClick={() => {
            setEditingInformation(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <InformationTable
        informations={informations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onEditRichText={handleEdit}
      />

      <InformationFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        information={editingInformation}
        menus={menus}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
