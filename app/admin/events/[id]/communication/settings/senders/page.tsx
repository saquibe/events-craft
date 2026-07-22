"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, CheckCircle, X, Edit, Trash2, Star } from "lucide-react";
import { CreateButton } from "@/components/admin";

// Mock sender emails
const mockSenders = [
  {
    id: "1",
    email: "noreply@eventscraft.com",
    name: "EventsCraft",
    isDefault: true,
    verified: true,
  },
  {
    id: "2",
    email: "support@eventscraft.com",
    name: "EventsCraft Support",
    isDefault: false,
    verified: true,
  },
  {
    id: "3",
    email: "info@eventscraft.com",
    name: "EventsCraft Info",
    isDefault: false,
    verified: false,
  },
];

export default function SenderEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [senders, setSenders] = useState(mockSenders);
  const [isAdding, setIsAdding] = useState(false);
  const [newSender, setNewSender] = useState({ email: "", name: "" });

  const handleAddSender = () => {
    if (newSender.email && newSender.name) {
      setSenders([
        ...senders,
        {
          id: String(senders.length + 1),
          ...newSender,
          isDefault: false,
          verified: false,
        },
      ]);
      setNewSender({ email: "", name: "" });
      setIsAdding(false);
    }
  };

  const handleSetDefault = (id: string) => {
    setSenders(
      senders.map((s) => ({
        ...s,
        isDefault: s.id === id,
      })),
    );
  };

  const handleDelete = (id: string) => {
    setSenders(senders.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sender Emails</h2>
          <p className="text-muted-foreground">
            Manage sender email addresses for all communications
          </p>
        </div>
        <CreateButton onClick={() => setIsAdding(true)} label="Add Sender" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sender Email Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/20">
              <h4 className="font-medium mb-3">Add New Sender</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-default">Sender Name</Label>
                  <Input
                    placeholder="Enter sender name"
                    value={newSender.name}
                    onChange={(e) =>
                      setNewSender({ ...newSender, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-default">Email Address</Label>
                  <Input
                    placeholder="Enter email address"
                    value={newSender.email}
                    onChange={(e) =>
                      setNewSender({ ...newSender, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  className="text-base cursor-pointer"
                  color="primary"
                  onClick={handleAddSender}
                >
                  Add Sender
                </Button>
                <Button
                  className="text-base cursor-pointer"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {senders.map((sender) => (
                <TableRow key={sender.id}>
                  <TableCell className="font-medium">{sender.name}</TableCell>
                  <TableCell>{sender.email}</TableCell>
                  <TableCell>
                    {sender.verified ? (
                      <Badge
                        color="success"
                        className="flex items-center gap-1 w-fit"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge
                        color="warning"
                        className="flex items-center gap-1 w-fit"
                      >
                        <Mail className="h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {sender.isDefault ? (
                      <Badge
                        color="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        <Star className="h-3 w-3" />
                        Default
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        color="primary"
                        size="sm"
                        onClick={() => handleSetDefault(sender.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sender.id)}
                        disabled={sender.isDefault}
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

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Email Sending Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• At least one sender email must be set as default</p>
          <p>• Verify your email address to improve deliverability</p>
          <p>• Use a recognizable sender name for better engagement</p>
          <p>• Sender emails must be verified before sending</p>
        </CardContent>
      </Card>
    </div>
  );
}
