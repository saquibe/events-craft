"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, Save, X, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface BudgetItem {
  id: string;
  category: string;
  subCategory: string;
  note: string;
  amount: number;
  type: "expense" | "income";
}

interface BudgetCategory {
  name: string;
  total: number;
  items: BudgetItem[];
}

const mockBudgetItems: BudgetItem[] = [
  {
    id: "1",
    category: "Audio Visual",
    subCategory: "Sound",
    note: "---",
    amount: 1500000,
    type: "expense",
  },
  {
    id: "2",
    category: "Food",
    subCategory: "Breakfast",
    note: "Note",
    amount: 15000,
    type: "expense",
  },
  {
    id: "3",
    category: "Food",
    subCategory: "Lunch",
    note: "---",
    amount: 250000,
    type: "expense",
  },
  {
    id: "4",
    category: "Audio Visual",
    subCategory: "LED Wall",
    note: "---",
    amount: 19098,
    type: "expense",
  },
  {
    id: "5",
    category: "Audio Visual",
    subCategory: "LED Wall",
    note: "---",
    amount: 100,
    type: "income",
  },
];

export default function BudgetPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const { toast } = useToast();
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(mockBudgetItems);
  const [activeTab, setActiveTab] = useState<"expense" | "income" | "all">(
    "expense",
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<BudgetItem>>({});

  // Get filtered items based on tab
  const getFilteredItems = () => {
    if (activeTab === "all") return budgetItems;
    return budgetItems.filter((item) => item.type === activeTab);
  };

  // Group items by category
  const getGroupedItems = (items: BudgetItem[]) => {
    const grouped: Record<string, BudgetCategory> = {};
    items.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = {
          name: item.category,
          total: 0,
          items: [],
        };
      }
      grouped[item.category].items.push(item);
      grouped[item.category].total += item.amount;
    });
    return Object.values(grouped);
  };

  const filteredItems = getFilteredItems();
  const groupedItems = getGroupedItems(filteredItems);

  // Calculate total
  const totalAmount = filteredItems.reduce((sum, item) => sum + item.amount, 0);

  const handleAddRow = () => {
    const newItem: BudgetItem = {
      id: `temp-${Date.now()}`,
      category: "",
      subCategory: "",
      note: "",
      amount: 0,
      type: activeTab === "all" ? "expense" : activeTab,
    };
    setBudgetItems([...budgetItems, newItem]);
    setEditingId(newItem.id);
    setEditData(newItem);
  };

  const handleEdit = (item: BudgetItem) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const handleSave = (id: string) => {
    if (!editData.category || !editData.subCategory) {
      toast({
        title: "Validation Error",
        description: "Category and Sub Category are required.",
        variant: "destructive",
      });
      return;
    }

    setBudgetItems(
      budgetItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...editData,
              amount: editData.amount || 0,
            }
          : item,
      ),
    );
    setEditingId(null);
    setEditData({});
    toast({
      title: "Updated",
      description: "Budget item updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setBudgetItems(budgetItems.filter((item) => item.id !== id));
      toast({
        title: "Deleted",
        description: "Budget item deleted successfully.",
      });
    }
  };

  const handleCancel = () => {
    // Remove any temp items
    const tempItems = budgetItems.filter(
      (item) => !item.id.startsWith("temp-"),
    );
    setBudgetItems(tempItems);
    setEditingId(null);
    setEditData({});
  };

  const handleSaveAll = () => {
    // Check if any items are still in edit mode
    const hasEditing = budgetItems.some((item) => item.id === editingId);
    if (hasEditing) {
      toast({
        title: "Save pending",
        description:
          "Please save or cancel the current edit before saving all.",
        variant: "destructive",
      });
      return;
    }

    // Validate all items
    const invalidItems = budgetItems.filter(
      (item) => !item.category || !item.subCategory,
    );
    if (invalidItems.length > 0) {
      toast({
        title: "Validation Error",
        description: "All items must have Category and Sub Category.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Saved",
      description: "All budget items saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Budget Plan</h2>
          <p className="text-muted-foreground">
            Define and configure budget categories and limits for Event #
            {eventId}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="text-base"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSaveAll} className="text-base" color="primary">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <SimpleTabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "expense" | "income" | "all")
        }
        className="space-y-4"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="expense">
            Expense Estimate
          </SimpleTabsTrigger>

          <SimpleTabsTrigger value="income">Income Estimate</SimpleTabsTrigger>

          <SimpleTabsTrigger value="all">All Estimate</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value={activeTab} className="space-y-6">
          {activeTab === "income" && (
            <p className="text-sm text-muted-foreground">
              Income Estimate Per Category (For internal use, not calculated in
              the transaction)
            </p>
          )}

          {/* Grouped View */}
          {groupedItems.map((category) => (
            <Card key={category.name}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{category.name}</span>
                  <Badge color="secondary" className="text-base">
                    Total (In USD): ${category.total.toLocaleString()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sub Category</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className="text-right">
                          Amount (In USD)
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.items.map((item) => (
                        <TableRow key={item.id}>
                          {editingId === item.id ? (
                            <>
                              <TableCell>
                                <Input
                                  placeholder="Sub Category"
                                  value={editData.subCategory || ""}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      subCategory: e.target.value,
                                    })
                                  }
                                  className="min-w-[150px]"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Note"
                                  value={editData.note || ""}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      note: e.target.value,
                                    })
                                  }
                                />
                              </TableCell>
                              <TableCell className="text-right">
                                <Input
                                  type="number"
                                  placeholder="Amount"
                                  value={editData.amount || ""}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      amount: parseFloat(e.target.value) || 0,
                                    })
                                  }
                                  className="text-right"
                                />
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSave(item.id)}
                                  >
                                    <Save className="h-4 w-4 text-green-500" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setEditingId(null);
                                      setEditData({});
                                    }}
                                  >
                                    <X className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="font-medium">
                                {item.subCategory}
                              </TableCell>
                              <TableCell>{item.note || "---"}</TableCell>
                              <TableCell className="text-right">
                                ${item.amount.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(item)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2} className="font-bold">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          ${category.total.toLocaleString()}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Row Button */}
          <Button variant="outline" onClick={handleAddRow}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Row
          </Button>

          {/* Grand Total */}
          {filteredItems.length > 0 && (
            <Card>
              <CardContent className="py-4">
                <div className="flex justify-end items-center gap-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
