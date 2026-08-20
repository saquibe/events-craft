"use client";

import { useState } from "react";
import { useCertificate } from "./CertificateContext";
import { Button } from "@/components/ui/button";
import {
  SimpleTabs,
  SimpleTabsList,
  SimpleTabsTrigger,
  SimpleTabsContent,
} from "@/components/ui/simple-tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, Users, User, CheckCircle, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PaginatedTable } from "@/components/paginated-table";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { StatusBadge } from "../common/StatusBadge";

export function CertificateSend() {
  const { certificates, attendees, attendanceData, sendCertificate } =
    useCertificate();
  const [activeTab, setActiveTab] = useState<"all" | "individual">("all");
  const [selectedAttendee, setSelectedAttendee] = useState<any>(null);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>(
    [],
  );

  const handleSendAll = (certificateId: string) => {
    const cert = certificates.find((c) => c.id === certificateId);
    if (!cert) return;
    const attendeeIds = attendees.map((a) => a.id);
    sendCertificate(certificateId, attendeeIds);
  };

  const handleSendIndividual = (
    attendeeId: string,
    certificateIds: string[],
  ) => {
    certificateIds.forEach((certId) => {
      sendCertificate(certId, [attendeeId]);
    });
    setIsSendDialogOpen(false);
    setSelectedAttendee(null);
    setSelectedCertificates([]);
  };

  const getAttendanceBadge = (attendeeId: string) => {
    const data = attendanceData.find((a) => a.attendeeId === attendeeId);
    if (!data) return <Badge color="outline">No</Badge>;

    const types = [];
    if (data.conferenceAttended) types.push("Conference");
    if (data.workshopAttended) types.push("Workshop");
    if (data.posterPresented) types.push("Poster");
    if (data.paperPresented) types.push("Paper");

    return types.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {types.map((type) => (
          <Badge key={type} color="secondary" className="text-xs">
            {type}
          </Badge>
        ))}
      </div>
    ) : (
      <Badge color="outline">None</Badge>
    );
  };

  const getStatusBadge = (sent: boolean) => {
    if (sent) {
      return (
        <Badge className="bg-green-500/10 text-green-600 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Sent
        </Badge>
      );
    }
    return (
      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  // Columns for "Send to All" tab
  const allColumns = [
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
          {cert.attendance}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (cert: any) => getStatusBadge(cert.sent || false),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (cert: any) => (
        <Button
          size="sm"
          className="gap-2"
          onClick={() => handleSendAll(cert.id)}
          color="primary"
        >
          <Send className="h-4 w-4" />
          Send to All
        </Button>
      ),
    },
  ];

  // Columns for "Individual" tab
  const individualColumns = [
    {
      key: "name",
      header: "Attendee Name",
      cell: (attendee: any) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {attendee.name}
          </p>
          <p className="text-sm text-muted-foreground">{attendee.email}</p>
          <p className="text-sm text-muted-foreground">
            {attendee.registrationNumber}
          </p>
        </div>
      ),
    },
    {
      key: "attendance",
      header: "Attendance",
      cell: (attendee: any) => getAttendanceBadge(attendee.id),
    },
    {
      key: "certificates",
      header: "Certificates",
      cell: (attendee: any) => {
        const assignedCerts = certificates.filter((c) =>
          c.assignedTo?.includes(attendee.id),
        );
        return assignedCerts.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {assignedCerts.map((cert) => (
              <Badge key={cert.id} color="outline" className="text-xs">
                {cert.name}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">No certificates</span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (attendee: any) => {
        const sentCerts = certificates.filter((c) =>
          c.sentTo?.includes(attendee.id),
        );
        const assignedCerts = certificates.filter((c) =>
          c.assignedTo?.includes(attendee.id),
        );
        if (sentCerts.length > 0) {
          return (
            <Badge className="bg-green-500/10 text-green-600 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Sent ({sentCerts.length})
            </Badge>
          );
        }
        if (assignedCerts.length > 0) {
          return (
            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
              <Clock className="h-3 w-3 mr-1" />
              Pending ({assignedCerts.length})
            </Badge>
          );
        }
        return <Badge color="outline">No certificates</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (attendee: any) => {
        const assignedCerts = certificates.filter((c) =>
          c.assignedTo?.includes(attendee.id),
        );
        return (
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => {
              setSelectedAttendee(attendee);
              setSelectedCertificates(assignedCerts.map((c) => c.id));
              setIsSendDialogOpen(true);
            }}
            disabled={assignedCerts.length === 0}
          >
            <Mail className="h-4 w-4" />
            Send
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Send Certificates
          </h2>
          <p className="text-muted-foreground">
            Send certificates to attendees
          </p>
        </div>
      </div>

      <SimpleTabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "all" | "individual")}
        className="space-y-4"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="all" className="gap-2">
            <Users className="h-4 w-4" />
            Send to All
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="individual" className="gap-2">
            <User className="h-4 w-4" />
            Send Individual
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="all" className="space-y-4">
          <PaginatedTable
            data={certificates}
            columns={allColumns}
            searchFields={["name", "attendeeProfile"]}
            searchPlaceholder="Search certificates..."
            emptyMessage="No certificates found to send"
            renderHeader={() => (
              <div>
                <h3 className="text-lg font-semibold">
                  All Certificates ({certificates.length})
                </h3>
                <p className="text-sm text-muted-foreground">
                  Send certificates to all eligible attendees
                </p>
              </div>
            )}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="individual" className="space-y-4">
          <PaginatedTable
            data={attendees}
            columns={individualColumns}
            searchFields={["name", "email", "registrationNumber"]}
            searchPlaceholder="Search attendees..."
            emptyMessage="No attendees found"
            renderHeader={() => (
              <div>
                <h3 className="text-lg font-semibold">
                  Attendees ({attendees.length})
                </h3>
                <p className="text-sm text-muted-foreground">
                  Send certificates to individual attendees
                </p>
              </div>
            )}
          />
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Send Individual Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Certificates</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Attendee</Label>
              <div className="p-3 bg-muted/10 rounded-lg border">
                <p className="font-medium">{selectedAttendee?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedAttendee?.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedAttendee?.registrationNumber}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Certificates</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {certificates.map((cert) => {
                  const isAssigned = cert.assignedTo?.includes(
                    selectedAttendee?.id,
                  );
                  const isSent = cert.sentTo?.includes(selectedAttendee?.id);
                  return (
                    <div
                      key={cert.id}
                      className={`flex items-center gap-2 p-2 border rounded hover:bg-muted/20 ${
                        isSent ? "bg-green-50/50 border-green-200" : ""
                      }`}
                    >
                      <Checkbox
                        id={`cert-${cert.id}`}
                        checked={selectedCertificates.includes(cert.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCertificates([
                              ...selectedCertificates,
                              cert.id,
                            ]);
                          } else {
                            setSelectedCertificates(
                              selectedCertificates.filter(
                                (id) => id !== cert.id,
                              ),
                            );
                          }
                        }}
                        disabled={isSent}
                      />
                      <label
                        htmlFor={`cert-${cert.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{cert.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge color="outline">{cert.attendance}</Badge>
                            {isSent && (
                              <Badge className="bg-green-500/10 text-green-600 border-green-200 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Sent
                              </Badge>
                            )}
                            {isAssigned && !isSent && (
                              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  );
                })}
                {certificates.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No certificates available
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSendDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedAttendee && selectedCertificates.length > 0) {
                  handleSendIndividual(
                    selectedAttendee.id,
                    selectedCertificates,
                  );
                }
              }}
              disabled={selectedCertificates.length === 0}
              color="primary"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Selected ({selectedCertificates.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
