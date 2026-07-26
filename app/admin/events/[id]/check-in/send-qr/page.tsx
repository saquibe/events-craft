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
import { Switch } from "@/components/ui/switch";
import { Mail, Send, Users, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Mock attendees
const mockAttendees = [
  {
    id: "1",
    name: "Mintu Nath",
    email: "m@n.com",
    regNo: "REG001",
    qrSent: false,
  },
  {
    id: "2",
    name: "Adil A",
    email: "adil@a.com",
    regNo: "REG002",
    qrSent: false,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    regNo: "REG003",
    qrSent: true,
  },
  {
    id: "4",
    name: "Michael Chen",
    email: "michael@example.com",
    regNo: "REG004",
    qrSent: false,
  },
];

export default function SendQRCodePage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [attendees, setAttendees] = useState(mockAttendees);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [emailTemplate, setEmailTemplate] = useState("");
  const [emailSubject, setEmailSubject] = useState("Your Event QR Code");

  const handleSelectAll = (checked: boolean) => {
    setSelectedAll(checked);
    if (checked) {
      setSelectedAttendees(attendees.map((a) => a.id));
    } else {
      setSelectedAttendees([]);
    }
  };

  const handleSelectAttendee = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAttendees([...selectedAttendees, id]);
    } else {
      setSelectedAttendees(selectedAttendees.filter((a) => a !== id));
    }
  };

  const handleSendBulkQR = () => {
    if (selectedAttendees.length === 0) {
      alert("Please select at least one attendee");
      return;
    }
    alert(`QR Codes sent to ${selectedAttendees.length} attendees`);
    setAttendees(
      attendees.map((a) =>
        selectedAttendees.includes(a.id) ? { ...a, qrSent: true } : a,
      ),
    );
    setSelectedAttendees([]);
    setSelectedAll(false);
  };

  const handleDownloadQR = () => {
    alert("Downloading QR codes...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Send QR Code</h2>
        <p className="text-muted-foreground">
          Send QR codes to attendees for Event #{eventId}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Template */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Email Template
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
              />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
                placeholder="Enter your email message here..."
                className="min-h-[200px]"
              />
              <p className="text-xs text-muted-foreground">
                Use {"{name}"} for attendee name, {"{regNo}"} for registration
                number
              </p>
            </div>

            <div className="space-y-2">
              <Label>QR Code Format</Label>
              <Select defaultValue="png">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Include QR in email body</Label>
                <p className="text-xs text-muted-foreground">
                  Show QR code directly in email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Attendee List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Attendees</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadQR}
                  className="cursor-pointer font-bold"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download QR
                </Button>
                <Button
                  size="sm"
                  onClick={handleSendBulkQR}
                  className="cursor-pointer font-bold"
                  color="primary"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Send Selected ({selectedAttendees.length})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={selectedAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Reg No</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedAttendees.includes(attendee.id)}
                        onCheckedChange={(checked) =>
                          handleSelectAttendee(attendee.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {attendee.name}
                    </TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell className="font-mono">
                      {attendee.regNo}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs ${attendee.qrSent ? "text-green-600" : "text-yellow-600"}`}
                      >
                        {attendee.qrSent ? "✓ Sent" : "Pending"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-sm text-muted-foreground">
              {attendees.length} attendees •{" "}
              {attendees.filter((a) => a.qrSent).length} QR codes sent
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
