// app/admin/events/[id]/accounting/invoice-items/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { InvoiceItemsTable } from "@/components/admin/accounting/InvoiceItemsTable";
import { InvoiceItemsFormSheet } from "@/components/admin/accounting/InvoiceItemsFormSheet";
import { InvoiceItem } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

// Initial mock data
const initialMockItems: InvoiceItem[] = [
  {
    id: "1",
    itemName: "Sponsorship Package",
    description: "Gold Sponsorship",
    taxCode: "SPONSOR-GOLD",
    unitPrice: 5000,
    taxPercentage: 10,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    itemName: "Banner Display",
    description: "Main Hall Banner",
    taxCode: "BANNER-01",
    unitPrice: 500,
    taxPercentage: 10,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    itemName: "Exhibition Booth",
    description: "Standard Booth",
    taxCode: "BOOTH-STD",
    unitPrice: 3000,
    taxPercentage: 10,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    itemName: "Speaking Slot",
    description: "Keynote Session",
    taxCode: "SPEAK-KEY",
    unitPrice: 2000,
    taxPercentage: 10,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function InvoiceItemsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [items, setItems] = useState<InvoiceItem[]>(initialMockItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InvoiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store items in localStorage to persist across sessions
  useEffect(() => {
    const storedItems = localStorage.getItem("invoiceItems");
    if (storedItems) {
      try {
        const parsed = JSON.parse(storedItems);
        if (parsed.length > 0) {
          setItems(parsed);
        }
      } catch (e) {
        console.error("Error loading items from storage:", e);
      }
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("invoiceItems", JSON.stringify(items));
  }, [items]);

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
          id: String(Date.now()),
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
