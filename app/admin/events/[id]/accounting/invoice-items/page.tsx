"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InvoiceItemsTable } from "@/components/admin/accounting/InvoiceItemsTable";
import { InvoiceItemsFormSheet } from "@/components/admin/accounting/InvoiceItemsFormSheet";
import { InvoiceItem } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockItems: InvoiceItem[] = [];

export default function InvoiceItemsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [items, setItems] = useState<InvoiceItem[]>(mockItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingItem) {
        setItems(
          items.map((i) =>
            i.id === editingItem.id
              ? {
                  ...i,
                  ...data,
                  unitPrice: parseFloat(data.unitPrice),
                  taxPercentage: parseFloat(data.taxPercentage),
                  updatedAt: new Date().toISOString(),
                }
              : i,
          ),
        );
      } else {
        const newItem: InvoiceItem = {
          id: String(items.length + 1),
          ...data,
          unitPrice: parseFloat(data.unitPrice),
          taxPercentage: parseFloat(data.taxPercentage),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setItems([...items, newItem]);
      }
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingItem(null);
    }
  };

  const handleEdit = (item: InvoiceItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: InvoiceItem["status"]) => {
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoice Items</h2>
          <p className="text-muted-foreground">
            Manage invoice items for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Invoice Item"
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <InvoiceItemsTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <InvoiceItemsFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        item={editingItem}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
