"use client";

import { useState } from "react";
import { useCertificate } from "./CertificateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, UserPlus, Check, Users } from "lucide-react";
import { PaginatedTable } from "@/components/paginated-table";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { StatusBadge } from "../common/StatusBadge";

export function CertificateAssign() {
  const {
    certificates,
    attendees,
    addCertificate,
    assignCertificate,
    deleteCertificate,
  } = useCertificate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    attendeeProfile: "",
    attendance: "Conference" as "Conference" | "Workshop" | "Poster" | "Paper",
  });

  const handleSubmit = () => {
    if (editingCert) {
      // Update existing
    } else {
      addCertificate({
        name: formData.name,
        designId: "design-1",
        attendeeProfile: formData.attendeeProfile,
        attendance: formData.attendance,
        assignedTo: [],
        sentTo: [],
      });
    }
    setIsDialogOpen(false);
    setFormData({ name: "", attendeeProfile: "", attendance: "Conference" });
    setEditingCert(null);
  };

  const handleAssign = (certificateId: string) => {
    // In real implementation, open attendee selection modal
    const attendeeIds = attendees.map((a) => a.id);
    assignCertificate(certificateId, attendeeIds);
  };

  const getAttendanceLabel = (attendance: string) => {
    const labels: Record<string, string> = {
      Conference: "Conference",
      Workshop: "Workshop",
      Poster: "Poster",
      Paper: "Paper",
    };
    return labels[attendance] || attendance;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Inactive":
        return "bg-gray-500/10 text-gray-600 border-gray-200";
      default:
        return "";
    }
  };

  // Table columns for PaginatedTable
  const columns = [
    {
      key: "name",
      header: "Certificate Name",
      cell: (cert: any) => (
        <span className="font-medium text-foreground text-base">
          {cert.name}
        </span>
      ),
    },
    {
      key: "attendeeProfile",
      header: "Attendee Profile",
      cell: (cert: any) => (
        <Badge color="outline" className="text-base">
          {cert.attendeeProfile}
        </Badge>
      ),
    },
    {
      key: "attendance",
      header: "Attendance",
      cell: (cert: any) => (
        <Badge color="secondary" className="text-base">
          {getAttendanceLabel(cert.attendance)}
        </Badge>
      ),
    },
    {
      key: "assignedCount",
      header: "Assigned To",
      cell: (cert: any) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-base">
            {cert.assignedTo?.length || 0} attendees
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (cert: any) => (
        <Badge
          color="success"
          className={getStatusColor(cert.status || "Active")}
        >
          {cert.status || "Active"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (cert: any) => (
        <ActionDropdown
          actions={[
            {
              label: "Assign",
              icon: ActionIcons.edit,
              onClick: () => handleAssign(cert.id),
            },
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => {
                setEditingCert(cert);
                setFormData({
                  name: cert.name,
                  attendeeProfile: cert.attendeeProfile,
                  attendance: cert.attendance,
                });
                setIsDialogOpen(true);
              },
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => deleteCertificate(cert.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Certificate Assign
          </h2>
          <p className="text-muted-foreground">
            Manage certificate assignments for attendees
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCert(null);
            setFormData({
              name: "",
              attendeeProfile: "",
              attendance: "Conference",
            });
            setIsDialogOpen(true);
          }}
          className="text-base"
          color="primary"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Certificate
        </Button>
      </div>

      <PaginatedTable
        data={certificates}
        columns={columns}
        searchFields={["name", "attendeeProfile"]}
        searchPlaceholder="Search certificates..."
        emptyMessage="No certificates assigned yet"
        renderHeader={() => (
          <div>
            <h3 className="text-lg font-semibold">
              Certificates ({certificates.length})
            </h3>
          </div>
        )}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCert ? "Edit Certificate" : "Assign Certificate"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Certificate Name*</Label>
              <Select
                value={formData.name}
                onValueChange={(value) =>
                  setFormData({ ...formData, name: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select certificate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Participation Cert">
                    Participation Cert
                  </SelectItem>
                  <SelectItem value="Speaker Cert">Speaker Cert</SelectItem>
                  <SelectItem value="Organizer Cert">Organizer Cert</SelectItem>
                  <SelectItem value="Certificate of Appreciation">
                    Certificate of Appreciation
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Attendee Profile*</Label>
              <Select
                value={formData.attendeeProfile}
                onValueChange={(value) =>
                  setFormData({ ...formData, attendeeProfile: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delegate">Delegate</SelectItem>
                  <SelectItem value="Faculty">Faculty</SelectItem>
                  <SelectItem value="Committee">Committee</SelectItem>
                  <SelectItem value="Speaker">Speaker</SelectItem>
                  <SelectItem value="Organizer">Organizer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Attendance*</Label>
              <Select
                value={formData.attendance}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, attendance: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select attendance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Poster">Poster</SelectItem>
                  <SelectItem value="Paper">Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editingCert ? "Update" : "Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
