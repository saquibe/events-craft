"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  Image,
  Link2,
  Video,
  FileText,
  Phone,
} from "lucide-react";
import { FIXED_MODULES, MODULE_TYPES, AppModule } from "@/lib/types/eventapp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

const mockModules: AppModule[] = [
  {
    id: "1",
    name: "Event Information",
    type: "Information",
    content: "Welcome to the event!",
    status: "Active",
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Brochure",
    type: "Download",
    icon: "📄",
    status: "Active",
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ModulesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [fixedModules, setFixedModules] = useState(FIXED_MODULES);
  const [customModules, setCustomModules] = useState<AppModule[]>(mockModules);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModule, setNewModule] = useState({
    type: "",
    name: "",
    icon: "",
    content: "",
  });

  const handleFixedModuleToggle = (id: string) => {
    setFixedModules(
      fixedModules.map((m) =>
        m.id === id ? { ...m, enabled: !m.enabled } : m,
      ),
    );
  };

  const handleAddModule = () => {
    if (!newModule.type || !newModule.name) {
      alert("Please select a module type and enter a name");
      return;
    }

    const module: AppModule = {
      id: String(customModules.length + 1),
      name: newModule.name,
      type:
        (MODULE_TYPES.find((t) => t.id === newModule.type)?.label as any) ||
        "Information",
      icon: newModule.icon || "📄",
      content: newModule.content || "",
      status: "Active",
      order: customModules.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCustomModules([...customModules, module]);
    setNewModule({ type: "", name: "", icon: "", content: "" });
    setIsAddingModule(false);
  };

  const getModuleTypeIcon = (type: string) => {
    switch (type) {
      case "Information":
        return <FileText className="h-4 w-4" />;
      case "Download":
        return <Upload className="h-4 w-4" />;
      case "Link":
        return <Link2 className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Contact Us":
        return <Phone className="h-4 w-4" />;
      case "Text Box":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Modules</h2>
        <p className="text-muted-foreground">
          Manage modules available in your event app
        </p>
      </div>

      <SimpleTabs defaultValue="fixed" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="fixed">Fixed Modules</SimpleTabsTrigger>
          <SimpleTabsTrigger value="custom">Custom Modules</SimpleTabsTrigger>
        </SimpleTabsList>

        {/* Fixed Modules Tab */}
        <SimpleTabsContent value="fixed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fixed Modules</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enable or disable built-in modules for your app
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {fixedModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span className="font-medium">{module.name}</span>
                    <Switch
                      checked={module.enabled}
                      onCheckedChange={() => handleFixedModuleToggle(module.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Custom Modules Tab */}
        <SimpleTabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Custom Modules</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add custom modules to your event app
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setIsAddingModule(true)}
                color="primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </CardHeader>
            <CardContent>
              {isAddingModule && (
                <div className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
                  <h4 className="font-medium">Add New Module</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-default">
                        Select Module Type *
                      </Label>
                      <Select
                        value={newModule.type}
                        onValueChange={(value) =>
                          setNewModule({ ...newModule, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select module type" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODULE_TYPES.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-default">Name *</Label>
                      <Input
                        placeholder="Enter module name"
                        value={newModule.name}
                        onChange={(e) =>
                          setNewModule({ ...newModule, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-default">Icon (optional)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Enter emoji or upload icon"
                        value={newModule.icon}
                        onChange={(e) =>
                          setNewModule({ ...newModule, icon: e.target.value })
                        }
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-default">Content</Label>
                    <Textarea
                      placeholder="Enter content for the module"
                      value={newModule.content}
                      onChange={(e) =>
                        setNewModule({ ...newModule, content: e.target.value })
                      }
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddModule}
                      color="primary"
                      className="text-base"
                    >
                      Add Module
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingModule(false)}
                      className="text-base"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">
                        {module.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getModuleTypeIcon(module.type)}
                          <span>{module.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          color={
                            module.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {module.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
