"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormTable } from "@/components/admin/emanual/FormTable";
import { FormFormSheet } from "@/components/admin/emanual/FormFormSheet";
import { Form, Menu } from "@/lib/types/emanual";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockMenus: Menu[] = [
  {
    id: "1",
    name: "Registration",
    type: "Form",
    status: "Active",
    order: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Workshop",
    type: "Form",
    status: "Active",
    order: 2,
    createdAt: "",
    updatedAt: "",
  },
];

const mockForms: Form[] = [];

export default function FormsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [forms, setForms] = useState<Form[]>(mockForms);
  const [menus] = useState<Menu[]>(mockMenus);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<Form | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingForm) {
      setForms(
        forms.map((f) =>
          f.id === editingForm.id
            ? { ...f, ...data, updatedAt: new Date().toISOString() }
            : f,
        ),
      );
    } else {
      const newForm: Form = {
        id: String(forms.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setForms([...forms, newForm]);
    }
    setIsFormOpen(false);
    setEditingForm(null);
  };

  const handleEdit = (form: Form) => {
    setEditingForm(form);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setForms(forms.filter((f) => f.id !== id));
  };

  const handleStatusChange = (id: string, status: Form["status"]) => {
    setForms(
      forms.map((f) =>
        f.id === id ? { ...f, status, updatedAt: new Date().toISOString() } : f,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
          <p className="text-muted-foreground">
            Manage eManual forms for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Form"
          onClick={() => {
            setEditingForm(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <FormTable
        forms={forms}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onEditFormBuilder={handleEdit}
      />

      <FormFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        form={editingForm}
        menus={menus}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
