"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MenuTable } from "@/components/admin/emanual/MenuTable";
import { MenuFormSheet } from "@/components/admin/emanual/MenuFormSheet";
import { Menu } from "@/lib/types/emanual";
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
  {
    id: "3",
    name: "Registration",
    type: "Form",
    status: "Active",
    order: 3,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Schedule",
    type: "Information",
    status: "Inactive",
    order: 4,
    createdAt: "",
    updatedAt: "",
  },
];

export default function MenusPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [menus, setMenus] = useState<Menu[]>(mockMenus);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingMenu) {
      setMenus(
        menus.map((m) =>
          m.id === editingMenu.id
            ? { ...m, ...data, updatedAt: new Date().toISOString() }
            : m,
        ),
      );
    } else {
      const newMenu: Menu = {
        id: String(menus.length + 1),
        ...data,
        order: menus.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setMenus([...menus, newMenu]);
    }
    setIsFormOpen(false);
    setEditingMenu(null);
  };

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setMenus(menus.filter((m) => m.id !== id));
  };

  const handleStatusChange = (id: string, status: Menu["status"]) => {
    setMenus(
      menus.map((m) =>
        m.id === id ? { ...m, status, updatedAt: new Date().toISOString() } : m,
      ),
    );
  };

  const handleMoveUp = (id: string) => {
    const index = menus.findIndex((m) => m.id === id);
    if (index > 0) {
      const newMenus = [...menus];
      [newMenus[index], newMenus[index - 1]] = [
        newMenus[index - 1],
        newMenus[index],
      ];
      newMenus.forEach((m, i) => (m.order = i + 1));
      setMenus(newMenus);
    }
  };

  const handleMoveDown = (id: string) => {
    const index = menus.findIndex((m) => m.id === id);
    if (index < menus.length - 1) {
      const newMenus = [...menus];
      [newMenus[index], newMenus[index + 1]] = [
        newMenus[index + 1],
        newMenus[index],
      ];
      newMenus.forEach((m, i) => (m.order = i + 1));
      setMenus(newMenus);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Menus</h2>
          <p className="text-muted-foreground">
            Manage eManual menus for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Menu"
          onClick={() => {
            setEditingMenu(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <MenuTable
        menus={menus}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />

      <MenuFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        menu={editingMenu}
        onSubmit={handleSubmit}
        totalMenus={menus.length}
      />
    </div>
  );
}
