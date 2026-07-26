"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Eye,
  Plus,
  UserPlus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { PaginatedTable } from "@/components/paginated-table";

interface ImportedFile {
  id: string;
  name: string;
  dateTime: string;
  fileUrl: string;
}

interface ManualAttendee {
  id: string;
  regNo: string;
  name: string;
  mobile: string;
  email: string;
  badgeProfile: string;
  source: "Manual";
  printed: boolean;
}

const mockFiles: ImportedFile[] = [
  {
    id: "1",
    name: "1st List",
    dateTime: "2026-01-15T10:30:00",
    fileUrl: "/files/attendees-1.csv",
  },
  {
    id: "2",
    name: "Sponsor List",
    dateTime: "2026-01-14T14:20:00",
    fileUrl: "/files/sponsors.csv",
  },
];

const mockAttendees: ManualAttendee[] = [
  {
    id: "1",
    regNo: "REG001",
    name: "Mintu Nath",
    mobile: "7331131070",
    email: "m@n.com",
    badgeProfile: "Speaker",
    source: "Manual",
    printed: false,
  },
  {
    id: "2",
    regNo: "REG002",
    name: "Adil A",
    mobile: "7271717171",
    email: "adil@a.com",
    badgeProfile: "Attendee",
    source: "Manual",
    printed: false,
  },
];

const badgeProfiles = [
  { id: "1", name: "Attendee" },
  { id: "2", name: "Speaker" },
  { id: "3", name: "Exhibitor" },
  { id: "4", name: "Visitor" },
];

export function DataImport() {
  const [files, setFiles] = useState<ImportedFile[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("import");
  const [attendees, setAttendees] = useState<ManualAttendee[]>(mockAttendees);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    generateRegNo: "yes",
    prefix: "",
    name: "",
    email: "",
    mobile: "",
    gender: "",
    badgeProfile: "",
  });

  const uploadedFileColumns = [
    {
      key: "name",
      header: "File Name",
      cell: (file: ImportedFile) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{file.name}</span>
        </div>
      ),
    },
    {
      key: "dateTime",
      header: "Uploaded On",
      cell: (file: ImportedFile) => new Date(file.dateTime).toLocaleString(),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      headerClassName: "text-right",
      cell: (file: ImportedFile) => (
        <ActionDropdown
          actions={[
            {
              label: "Download",
              icon: ActionIcons.publish,
              onClick: () => handleDownload(file),
            },
          ]}
        />
      ),
    },
  ];

  const attendeeColumns = [
    {
      key: "regNo",
      header: "Reg No.",
      cell: (item: ManualAttendee) => (
        <span className="font-mono font-medium">{item.regNo}</span>
      ),
    },
    {
      key: "name",
      header: "Name",
    },
    {
      key: "mobile",
      header: "Mobile",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "badgeProfile",
      header: "Badge Profile",
      cell: (item: ManualAttendee) => (
        <Badge color="secondary">{item.badgeProfile}</Badge>
      ),
    },
    {
      key: "source",
      header: "Source",
      cell: (item: ManualAttendee) => (
        <Badge color="outline">{item.source}</Badge>
      ),
    },
    {
      key: "printed",
      header: "Printed",
      cell: (item: ManualAttendee) => (
        <Badge color={item.printed ? "default" : "secondary"}>
          {item.printed ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      headerClassName: "text-right",
      cell: (item: ManualAttendee) => (
        <ActionDropdown
          actions={[
            {
              label: "Print",
              icon: ActionIcons.publish,
              onClick: () => handlePrint(item.id),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => handleDeleteAttendee(item.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const newFile: ImportedFile = {
        id: String(files.length + 1),
        name: file.name,
        dateTime: new Date().toISOString(),
        fileUrl: URL.createObjectURL(file),
      };
      setFiles([newFile, ...files]);
      setSelectedFile(null);
    }
  };

  const handleDownload = (file: ImportedFile) => {
    alert(`Downloading ${file.name}...`);
  };

  const handleAddAttendee = () => {
    setIsSubmitting(true);

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.badgeProfile
    ) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Generate registration number
    let regNo = "";
    if (formData.generateRegNo === "yes") {
      regNo = `REG${String(attendees.length + 1).padStart(3, "0")}`;
    } else {
      regNo = `MANUAL${String(attendees.length + 1).padStart(3, "0")}`;
    }

    const newAttendee: ManualAttendee = {
      id: String(attendees.length + 1),
      regNo,
      name: `${formData.prefix} ${formData.name}`.trim(),
      mobile: formData.mobile,
      email: formData.email,
      badgeProfile:
        badgeProfiles.find((p) => p.id === formData.badgeProfile)?.name || "",
      source: "Manual",
      printed: false,
    };

    setAttendees([...attendees, newAttendee]);
    setIsSubmitting(false);
    setShowAddForm(false);
    setFormData({
      generateRegNo: "yes",
      prefix: "",
      name: "",
      email: "",
      mobile: "",
      gender: "",
      badgeProfile: "",
    });
  };

  const handleDeleteAttendee = (id: string) => {
    setAttendees(attendees.filter((a) => a.id !== id));
  };

  const handlePrint = (id: string) => {
    setAttendees(
      attendees.map((a) => (a.id === id ? { ...a, printed: true } : a)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Data Import</h3>
        <p className="text-sm text-muted-foreground">
          Upload external or sponsor attendee data using Excel or CSV files, or
          add manually.
        </p>
      </div>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="import">Import CSV</SimpleTabsTrigger>
          <SimpleTabsTrigger value="manual">Add Manually</SimpleTabsTrigger>
          <SimpleTabsTrigger value="list">Attendee List</SimpleTabsTrigger>
        </SimpleTabsList>

        {/* Import CSV Tab */}
        <SimpleTabsContent value="import" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Import Section */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-default font-medium">
                  Import External CSV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports .csv, .xlsx, .xls
                  </p>
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Choose File
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium">Sample Columns:</p>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <p className="font-medium text-foreground">Required:</p>
                    <p className="pl-2">• name</p>
                    <p className="pl-2">• email</p>
                    <p className="pl-2">• mobile</p>
                    <p className="font-medium text-foreground mt-1">
                      Optional:
                    </p>
                    <p className="pl-2">• designation</p>
                    <p className="pl-2">• affiliation</p>
                    <p className="pl-2">• department</p>
                    <p className="pl-2">• city</p>
                    <p className="pl-2">• state</p>
                    <p className="pl-2">• country</p>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Sample
                </Button>
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-default font-medium">
                  Uploaded Files
                </CardTitle>
              </CardHeader>
              <CardContent>
                {files.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileSpreadsheet className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No files uploaded yet</p>
                  </div>
                ) : (
                  <PaginatedTable
                    data={files}
                    columns={uploadedFileColumns}
                    searchPlaceholder="Search files..."
                    searchFields={["name"]}
                    defaultItemsPerPage={10}
                    emptyMessage="No uploaded files found"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </SimpleTabsContent>

        {/* Manual Add Tab */}
        <SimpleTabsContent value="manual" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-default font-medium">
                Add Attendee Manually
              </CardTitle>
              {!showAddForm && (
                <Button
                  size="sm"
                  onClick={() => setShowAddForm(true)}
                  className="cursor-pointer font-bold"
                  color="primary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Attendee
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showAddForm ? (
                <div className="space-y-6">
                  {/* Generate Auto Registration Number */}
                  <div className="space-y-2">
                    <Label className="text-default">
                      Generate Auto Registration Number
                    </Label>
                    <RadioGroup
                      value={formData.generateRegNo}
                      onValueChange={(value) =>
                        setFormData({ ...formData, generateRegNo: value })
                      }
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="gen-yes" />
                        <Label htmlFor="gen-yes" className="cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="gen-no" />
                        <Label htmlFor="gen-no" className="cursor-pointer">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-default">Prefix *</Label>
                      <Input
                        placeholder="Enter prefix"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-default">Attendee Name *</Label>
                      <Input
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-default">Email *</Label>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-default">Mobile *</Label>
                      <Input
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-default">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          setFormData({ ...formData, gender: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-default">Badge Profile *</Label>
                      <Select
                        value={formData.badgeProfile}
                        onValueChange={(value) =>
                          setFormData({ ...formData, badgeProfile: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select badge profile" />
                        </SelectTrigger>
                        <SelectContent>
                          {badgeProfiles.map((profile) => (
                            <SelectItem key={profile.id} value={profile.id}>
                              {profile.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={handleAddAttendee}
                      disabled={isSubmitting}
                      className="cursor-pointer text-base"
                      color="primary"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Adding..." : "Add Attendee"}
                    </Button>
                    <Button
                      className="cursor-pointer text-base"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setFormData({
                          generateRegNo: "yes",
                          prefix: "",
                          name: "",
                          email: "",
                          mobile: "",
                          gender: "",
                          badgeProfile: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Add Attendee" to manually add a new attendee</p>
                </div>
              )}
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Attendee List Tab */}
        <SimpleTabsContent value="list" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Attendee List ({attendees.length})
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveTab("manual")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Button>
            </CardHeader>
            <CardContent>
              {attendees.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No attendees added yet</p>
                </div>
              ) : (
                <PaginatedTable
                  data={attendees}
                  columns={attendeeColumns}
                  searchPlaceholder="Search attendees..."
                  searchFields={[
                    "regNo",
                    "name",
                    "mobile",
                    "email",
                    "badgeProfile",
                  ]}
                  defaultItemsPerPage={10}
                  emptyMessage="No attendees found"
                />
              )}
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
