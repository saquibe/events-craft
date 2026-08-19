"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Menu,
  FileText,
  FormInput,
  Building2,
  Package,
  ShoppingBag,
  Plus,
  Layers,
  Settings2,
} from "lucide-react";
import { MenuTable } from "@/components/admin/emanual/MenuTable";
import { InformationTable } from "@/components/admin/emanual/InformationTable";
import { OfficialContractorTable } from "@/components/admin/emanual/OfficialContractorTable";
import { ItemCategoryTable } from "@/components/admin/emanual/ItemCategoryTable";
import { MenuFormSheet } from "@/components/admin/emanual/MenuFormSheet";
import { InformationFormSheet } from "@/components/admin/emanual/InformationFormSheet";
import { OfficialContractorFormSheet } from "@/components/admin/emanual/OfficialContractorFormSheet";
import { ItemCategoryFormSheet } from "@/components/admin/emanual/ItemCategoryFormSheet";
import {
  Menu as MenuType,
  Information,
  Form,
  OfficialContractor,
  ItemCategory,
  EManualStats,
} from "@/lib/types/emanual";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { CreateButton } from "@/components/admin/common/CreateButton";
import {
  FormBuilder,
  FormConfig,
  DynamicFormRenderer,
} from "@/components/admin/common";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

// Mock stats
const mockStats: EManualStats = {
  totalMenus: 8,
  totalInformation: 12,
  totalForms: 6,
  totalContractors: 15,
  totalItems: 45,
  totalOrders: 28,
};

// Mock data
const mockMenus: MenuType[] = [
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
];

const mockInformations: Information[] = [];
const mockContractors: OfficialContractor[] = [];
const mockCategories: ItemCategory[] = [];

export default function EManualDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("menus");
  const [menus, setMenus] = useState<MenuType[]>(mockMenus);
  const [informations, setInformations] =
    useState<Information[]>(mockInformations);
  const [contractors, setContractors] =
    useState<OfficialContractor[]>(mockContractors);
  const [categories, setCategories] = useState<ItemCategory[]>(mockCategories);

  // Form state
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "emanual-form",
    title: "Additional Fields",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [formData, setFormData] = useState({
    menuId: "",
    lastDateOfSubmission: "",
    payment: false,
    status: "Active" as const,
  });
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<
    "menu" | "information" | "contractor" | "category"
  >("menu");

  const statItems = [
    {
      title: "Total Menus",
      value: mockStats.totalMenus,
      icon: Menu,
      color: "bg-blue-500",
    },
    {
      title: "Information",
      value: mockStats.totalInformation,
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Forms",
      value: mockStats.totalForms,
      icon: FormInput,
      color: "bg-purple-500",
    },
    {
      title: "Contractors",
      value: mockStats.totalContractors,
      icon: Building2,
      color: "bg-orange-500",
    },
    {
      title: "Items",
      value: mockStats.totalItems,
      icon: Package,
      color: "bg-pink-500",
    },
    {
      title: "Orders",
      value: mockStats.totalOrders,
      icon: ShoppingBag,
      color: "bg-cyan-500",
    },
  ];

  const handleOpenForm = (type: any, item?: any) => {
    setFormType(type);
    setEditingItem(item || null);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (formType === "menu") {
      if (editingItem) {
        setMenus(
          menus.map((m) =>
            m.id === editingItem.id
              ? { ...m, ...data, updatedAt: new Date().toISOString() }
              : m,
          ),
        );
      } else {
        setMenus([
          ...menus,
          {
            id: String(menus.length + 1),
            ...data,
            order: menus.length + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } else if (formType === "information") {
      if (editingItem) {
        setInformations(
          informations.map((i) =>
            i.id === editingItem.id
              ? { ...i, ...data, updatedAt: new Date().toISOString() }
              : i,
          ),
        );
      } else {
        setInformations([
          ...informations,
          {
            id: String(informations.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } else if (formType === "contractor") {
      if (editingItem) {
        setContractors(
          contractors.map((c) =>
            c.id === editingItem.id
              ? { ...c, ...data, updatedAt: new Date().toISOString() }
              : c,
          ),
        );
      } else {
        setContractors([
          ...contractors,
          {
            id: String(contractors.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } else if (formType === "category") {
      if (editingItem) {
        setCategories(
          categories.map((c) =>
            c.id === editingItem.id
              ? { ...c, ...data, updatedAt: new Date().toISOString() }
              : c,
          ),
        );
      } else {
        setCategories([
          ...categories,
          {
            id: String(categories.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleStatusChange = (id: string, status: any) => {
    if (formType === "menu") {
      setMenus(menus.map((m) => (m.id === id ? { ...m, status } : m)));
    } else if (formType === "information") {
      setInformations(
        informations.map((i) => (i.id === id ? { ...i, status } : i)),
      );
    } else if (formType === "contractor") {
      setContractors(
        contractors.map((c) => (c.id === id ? { ...c, status } : c)),
      );
    } else if (formType === "category") {
      setCategories(
        categories.map((c) => (c.id === id ? { ...c, status } : c)),
      );
    }
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

  // Form handlers
  const handleFormBuilderSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Form fields saved successfully!");
  };

  const handleDynamicChange = (values: Record<string, any>) => {
    setDynamicValues(values);
  };

  const handleSaveForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("eManual form saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">eManual</h2>
        <p className="text-muted-foreground">
          Manage eManual content for Event #{eventId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statItems.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="menus">Menus</SimpleTabsTrigger>
          <SimpleTabsTrigger value="information">Information</SimpleTabsTrigger>
          <SimpleTabsTrigger value="forms">Forms</SimpleTabsTrigger>
          <SimpleTabsTrigger value="contractors">
            Official Contractors
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="categories">
            Item Categories
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="settings">Settings</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="menus" className="mt-6">
          <div className="flex justify-end mb-4">
            <CreateButton
              label="Add Menu"
              onClick={() => handleOpenForm("menu")}
            />
          </div>
          <MenuTable
            menus={menus}
            onEdit={(menu) => handleOpenForm("menu", menu)}
            onDelete={(id) => setMenus(menus.filter((m) => m.id !== id))}
            onStatusChange={(id, status) => {
              setMenus(menus.map((m) => (m.id === id ? { ...m, status } : m)));
            }}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="information" className="mt-6">
          <div className="flex justify-end mb-4">
            <CreateButton
              label="Add Information"
              onClick={() => handleOpenForm("information")}
            />
          </div>
          <InformationTable
            informations={informations}
            onEdit={(info) => handleOpenForm("information", info)}
            onDelete={(id) =>
              setInformations(informations.filter((i) => i.id !== id))
            }
            onStatusChange={(id, status) => {
              setInformations(
                informations.map((i) => (i.id === id ? { ...i, status } : i)),
              );
            }}
            onEditRichText={(info) => handleOpenForm("information", info)}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="forms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure the eManual form settings
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Menu Name */}
              <div className="space-y-2">
                <Label className="text-default">Menu Name *</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={formData.menuId}
                  onChange={(e) =>
                    setFormData({ ...formData, menuId: e.target.value })
                  }
                >
                  <option value="">Select menu</option>
                  {menus.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Last Date of Submission */}
              <div className="space-y-2">
                <Label className="text-default">
                  Last Date of Submission *
                </Label>
                <Input
                  type="date"
                  value={formData.lastDateOfSubmission}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastDateOfSubmission: e.target.value,
                    })
                  }
                />
              </div>

              {/* Payment */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Payment</Label>
                  <p className="text-sm text-muted-foreground">
                    Require payment for form submission
                  </p>
                </div>
                <Switch
                  checked={formData.payment}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, payment: checked })
                  }
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-default">Status</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("forms-builder")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Fields
                </Button>
              </div>

              {/* Dynamic Fields */}
              {formConfig.fields.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Additional Fields ({formConfig.fields.length})
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These fields will appear in the form
                  </p>

                  <DynamicFormRenderer
                    config={formConfig}
                    values={dynamicValues}
                    onChange={handleDynamicChange}
                    onFileUpload={async (fieldId, file) => {
                      console.log(`Uploading file for ${fieldId}:`, file.name);
                      return URL.createObjectURL(file);
                    }}
                  />
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={handleSaveForm}
                  disabled={isSubmitting}
                  className="text-base"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Form"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="contractors" className="mt-6">
          <div className="flex justify-end mb-4">
            <CreateButton
              label="Add Official Contractor"
              onClick={() => handleOpenForm("contractor")}
            />
          </div>
          <OfficialContractorTable
            contractors={contractors}
            onEdit={(contractor) => handleOpenForm("contractor", contractor)}
            onDelete={(id) =>
              setContractors(contractors.filter((c) => c.id !== id))
            }
            onStatusChange={(id, status) => {
              setContractors(
                contractors.map((c) => (c.id === id ? { ...c, status } : c)),
              );
            }}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="categories" className="mt-6">
          <div className="flex justify-end mb-4">
            <CreateButton
              label="Add Item Category"
              onClick={() => handleOpenForm("category")}
            />
          </div>
          <ItemCategoryTable
            categories={categories}
            onEdit={(category) => handleOpenForm("category", category)}
            onDelete={(id) =>
              setCategories(categories.filter((c) => c.id !== id))
            }
            onStatusChange={(id, status) => {
              setCategories(
                categories.map((c) => (c.id === id ? { ...c, status } : c)),
              );
            }}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="settings" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">eManual Settings</h3>
            <p>Settings configuration will be available here</p>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Form Sheets */}
      {formType === "menu" && (
        <MenuFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          menu={editingItem}
          onSubmit={handleSubmit}
          totalMenus={menus.length}
        />
      )}
      {formType === "information" && (
        <InformationFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          information={editingItem}
          menus={menus}
          onSubmit={handleSubmit}
        />
      )}
      {formType === "contractor" && (
        <OfficialContractorFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          contractor={editingItem}
          onSubmit={handleSubmit}
        />
      )}
      {formType === "category" && (
        <ItemCategoryFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          category={editingItem}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
