"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdditionalItemsTable } from "@/components/admin/emanual/AdditionalItemsTable";
import { ItemFormSheet } from "@/components/admin/emanual/ItemFormSheet";
import { AdditionalItem, ItemCategory } from "@/lib/types/emanual";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockCategories: ItemCategory[] = [
  {
    id: "1",
    name: "Electronics",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Furniture",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Stationery",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

const mockItems: AdditionalItem[] = [
  {
    id: "1",
    itemCode: "ITEM001",
    itemName: "Table",
    categoryId: "2",
    category: mockCategories[1],
    photo:
      "https://plus.unsplash.com/premium_photo-1664474653221-8412b8dfca3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
    unitPrice: 150,
    taxPercentage: 10,
    openingStock: 50,
    currentStock: 35,
    sold: 15,
    itemFor: "eCom",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    itemCode: "ITEM002",
    itemName: "Chair",
    categoryId: "2",
    category: mockCategories[1],
    photo:
      "https://images.unsplash.com/photo-1561489396-888724a1543d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50fGVufDB8fDB8fHww",
    unitPrice: 75,
    taxPercentage: 10,
    openingStock: 100,
    currentStock: 82,
    sold: 18,
    itemFor: "eCom",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

export default function AdditionalItemsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [items, setItems] = useState<AdditionalItem[]>([
    mockItems[0],
    mockItems[1],
  ]);
  const [categories] = useState<ItemCategory[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdditionalItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingItem) {
        setItems(
          items.map((i) =>
            i.id === editingItem.id
              ? {
                  ...i,
                  ...data,
                  currentStock:
                    data.openingStock - (i.openingStock - i.currentStock),
                  sold: i.sold || 0,
                  updatedAt: new Date().toISOString(),
                }
              : i,
          ),
        );
      } else {
        const newItem: AdditionalItem = {
          id: String(items.length + 1),
          ...data,
          currentStock: data.openingStock,
          sold: 0,
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

  const handleEdit = (item: AdditionalItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Additional Items
          </h2>
          <p className="text-muted-foreground">
            Manage additional items for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Item"
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <AdditionalItemsTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ItemFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        item={editingItem}
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
