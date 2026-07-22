"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, UserCheck, UserX, Clock } from "lucide-react";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserFormSheet } from "@/components/admin/users/UserFormSheet";
import { User, UserFormData } from "@/lib/types/user";
import { CreateButton } from "@/components/admin";

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    prefix: "Mr.",
    firstName: "Mintu",
    lastName: "Nath",
    email: "m@n.com",
    mobile: "7331131070",
    designation: "Developer",
    company: "Tech Corp",
    profilePhoto: "",
    category: "Attendee",
    createdBy: "Self",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    prefix: "Mr.",
    firstName: "Adil",
    lastName: "A",
    email: "a@n.com",
    mobile: "7271717171",
    designation: "Speaker",
    company: "Health Solutions",
    profilePhoto: "",
    category: "Delegate",
    createdBy: "Admin",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function UsersPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const suspendedUsers = users.filter((u) => u.status === "Suspended").length;
  const attendees = users.filter((u) => u.category === "Attendee").length;
  const delegates = users.filter((u) => u.category === "Delegate").length;

  const handleSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingUser) {
        // Edit existing user
        setUsers(
          users.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  ...data,
                  updatedAt: new Date().toISOString(),
                }
              : u,
          ),
        );
      } else {
        // Add new user
        const newUser: User = {
          id: String(users.length + 1),
          ...data,
          createdBy: "Admin",
          status: "Active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUsers([...users, newUser]);
      }

      setIsFormOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: User["status"]) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status, updatedAt: new Date().toISOString() } : u,
      ),
    );
  };

  const handleSendPassword = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      console.log(`Sending password to ${user.email}`);
      // Implement password sending logic
      alert(`Password reset link sent to ${user.email}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage users for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add User"
          onClick={() => {
            setEditingUser(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <UserX className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">{suspendedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendees</p>
                <p className="text-2xl font-bold">{attendees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delegates</p>
                <p className="text-2xl font-bold">{delegates}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <UserTable
        users={users}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
        onSendPassword={handleSendPassword}
      />

      {/* User Form Sheet */}
      <UserFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        user={editingUser}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
