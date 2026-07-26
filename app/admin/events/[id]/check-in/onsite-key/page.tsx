"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OnsiteKey } from "@/lib/types/onsite";
import { OnsiteKeyTable } from "@/components/admin/onsite/OnsiteKeyTable";
import { OnsiteKeyFormSheet } from "@/components/admin/onsite/OnsiteKeyFormSheet";
import { CreateButton } from "@/components/admin";

const mockKeys: OnsiteKey[] = [
  {
    id: "1",
    userName: "Check-in Team",
    loginKey: "KEY-001",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userName: "VIP Desk",
    loginKey: "KEY-002",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function OnsiteKeyPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [keys, setKeys] = useState<OnsiteKey[]>(mockKeys);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<OnsiteKey | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingKey) {
      setKeys(
        keys.map((k) => (k.id === editingKey.id ? { ...k, ...data } : k)),
      );
    } else {
      const newKey: OnsiteKey = {
        id: String(keys.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setKeys([...keys, newKey]);
    }
    setIsFormOpen(false);
    setEditingKey(null);
  };

  const handleEdit = (key: OnsiteKey) => {
    setEditingKey(key);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const handleStatusChange = (id: string, status: "Active" | "Inactive") => {
    setKeys(keys.map((k) => (k.id === id ? { ...k, status } : k)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Onsite Key</h2>
          <p className="text-muted-foreground">
            Manage onsite login keys for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Login Key"
          onClick={() => {
            setEditingKey(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <OnsiteKeyTable
        keys={keys}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <OnsiteKeyFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        selectedKey={editingKey}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
