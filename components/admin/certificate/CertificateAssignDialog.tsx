// components/admin/certificate/CertificateAssignDialog.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCertificate } from "./CertificateContext";
import { Send, UserCheck, Search } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designId: string;
}

type AttendanceFilter = "Conference" | "Workshop" | "Poster" | "Paper";

export function CertificateAssignDialog({
  open,
  onOpenChange,
  designId,
}: Props) {
  const {
    attendees,
    attendanceData,
    addCertificate,
    assignCertificate,
    sendCertificate,
  } = useCertificate();

  const [certName, setCertName] = useState("");
  const [profileFilter, setProfileFilter] = useState<string>("all");
  const [attendanceFilter, setAttendanceFilter] =
    useState<AttendanceFilter>("Conference");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<"assign" | "send">("assign");

  // Distinct profiles from attendees
  const profiles = useMemo(
    () => Array.from(new Set(attendees.map((a) => a.profile))),
    [attendees],
  );

  // Filter attendees by attendance + profile + search
  const filteredAttendees = useMemo(() => {
    const attendanceKeyMap: Record<
      AttendanceFilter,
      keyof (typeof attendanceData)[0]
    > = {
      Conference: "conferenceAttended",
      Workshop: "workshopAttended",
      Poster: "posterPresented",
      Paper: "paperPresented",
    };
    const key = attendanceKeyMap[attendanceFilter];

    return attendees.filter((a) => {
      const att = attendanceData.find((d) => d.attendeeId === a.id);
      const attended = att ? Boolean(att[key]) : false;
      const profileMatch =
        profileFilter === "all" || a.profile === profileFilter;
      const searchMatch =
        !search.trim() ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.registrationNumber.toLowerCase().includes(search.toLowerCase());

      return attended && profileMatch && searchMatch;
    });
  }, [attendees, attendanceData, attendanceFilter, profileFilter, search]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredAttendees.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAttendees.map((a) => a.id)));
    }
  };

  const handleAction = () => {
    if (selectedIds.size === 0) return;

    const ids = Array.from(selectedIds);

    if (mode === "assign") {
      const certNameFinal =
        certName.trim() || `${attendanceFilter} Certificate`;

      const created = addCertificate({
        name: certNameFinal,
        designId,
        attendeeProfile: profileFilter === "all" ? "All" : profileFilter,
        attendance: attendanceFilter,
        assignedTo: [],
        sentTo: [],
      });

      assignCertificate(created.id, ids);
    } else {
      // Send mode — for demo, create then send immediately
      // In a real app, you would select an existing certificate.
      const certNameFinal =
        certName.trim() || `${attendanceFilter} Certificate`;
      const created = addCertificate({
        name: certNameFinal,
        designId,
        attendeeProfile: profileFilter === "all" ? "All" : profileFilter,
        attendance: attendanceFilter,
        assignedTo: [],
        sentTo: [],
      });
      assignCertificate(created.id, ids);
      sendCertificate(created.id, ids);
    }

    onOpenChange(false);
    setSelectedIds(new Set());
    setCertName("");
  };

  const allSelected =
    filteredAttendees.length > 0 &&
    selectedIds.size === filteredAttendees.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "assign" ? "Assign Certificate" : "Send Certificate"}
          </DialogTitle>
          <DialogDescription>
            Filter attendees by attendance and profile, then select who should
            receive this certificate.
          </DialogDescription>
        </DialogHeader>

        {/* Mode switch */}
        <div className="flex gap-2">
          <Button
            variant={mode === "assign" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("assign")}
          >
            <UserCheck className="h-4 w-4 mr-1" />
            Assign
          </Button>
          <Button
            variant={mode === "send" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("send")}
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>

        {/* Certificate name */}
        <div className="space-y-1">
          <Label className="text-xs">Certificate Name</Label>
          <Input
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            placeholder={`${attendanceFilter} Certificate`}
            className="h-9"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Attendance</Label>
            <Select
              value={attendanceFilter}
              onValueChange={(v) => setAttendanceFilter(v as AttendanceFilter)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Poster">Poster</SelectItem>
                <SelectItem value="Paper">Paper</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Profile</Label>
            <Select value={profileFilter} onValueChange={setProfileFilter}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profiles</SelectItem>
                {profiles.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, email, reg#"
                className="h-9 pl-8"
              />
            </div>
          </div>
        </div>

        {/* Attendee list */}
        <div className="border rounded-lg max-h-[300px] overflow-y-auto">
          <div className="flex items-center justify-between p-2 border-b bg-muted/30 sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              <span className="text-xs font-medium">
                Select all ({filteredAttendees.length})
              </span>
            </div>
            <Badge color="secondary" className="text-xs">
              {selectedIds.size} selected
            </Badge>
          </div>

          {filteredAttendees.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No attendees match these filters.
            </p>
          ) : (
            filteredAttendees.map((a) => {
              const att = attendanceData.find((d) => d.attendeeId === a.id);
              return (
                <label
                  key={a.id}
                  className="flex items-center gap-3 p-3 border-b last:border-0 hover:bg-muted/30 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedIds.has(a.id)}
                    onCheckedChange={() => toggleSelect(a.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {a.email} • {a.registrationNumber} • {a.profile}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {att?.conferenceAttended && (
                      <Badge color="outline" className="text-[10px]">
                        Conf
                      </Badge>
                    )}
                    {att?.workshopAttended && (
                      <Badge color="outline" className="text-[10px]">
                        Work
                      </Badge>
                    )}
                    {att?.posterPresented && (
                      <Badge color="outline" className="text-[10px]">
                        Poster
                      </Badge>
                    )}
                    {att?.paperPresented && (
                      <Badge color="outline" className="text-[10px]">
                        Paper
                      </Badge>
                    )}
                  </div>
                </label>
              );
            })
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            disabled={selectedIds.size === 0}
            color="primary"
          >
            {mode === "assign" ? (
              <>
                <UserCheck className="h-4 w-4 mr-1" />
                Assign to {selectedIds.size}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-1" />
                Send to {selectedIds.size}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
