"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OfficialContractorTable } from "@/components/admin/emanual/OfficialContractorTable";
import { OfficialContractorFormSheet } from "@/components/admin/emanual/OfficialContractorFormSheet";
import { OfficialContractor } from "@/lib/types/emanual";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockContractors: OfficialContractor[] = [
  {
    id: "1",
    companyName: "ABC Event Solutions",
    category: "Audio Visual",
    logo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV2ZW50fGVufDB8fDB8fHww",
    address: "123 Business Park, Hyderabad",
    contactFirstName: "Rahul",
    contactLastName: "Sharma",
    contactEmail: "rahul@abcevents.com",
    contactMobile: "+91 9876543210",
    sendEmail: true,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    companyName: "Expo India Pvt Ltd",
    category: "Booth Construction",
    logo: "https://media.istockphoto.com/id/1495018397/photo/splendid-view-of-an-outdoor-wedding-premises.webp?a=1&b=1&s=612x612&w=0&k=20&c=iUakR2SEWhgz6o5wHJYgwa0FKtVPMezMUW9uooG2SeY=",
    address: "45 Exhibition Road, New Delhi",
    contactFirstName: "Priya",
    contactLastName: "Verma",
    contactEmail: "priya@expoindia.com",
    contactMobile: "+91 9123456789",
    sendEmail: false,
    status: "Inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function OfficialContractorsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [contractors, setContractors] =
    useState<OfficialContractor[]>(mockContractors);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContractor, setEditingContractor] =
    useState<OfficialContractor | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingContractor) {
      setContractors(
        contractors.map((c) =>
          c.id === editingContractor.id
            ? { ...c, ...data, updatedAt: new Date().toISOString() }
            : c,
        ),
      );
    } else {
      const newContractor: OfficialContractor = {
        id: String(contractors.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setContractors([...contractors, newContractor]);
    }
    setIsFormOpen(false);
    setEditingContractor(null);
  };

  const handleEdit = (contractor: OfficialContractor) => {
    setEditingContractor(contractor);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setContractors(contractors.filter((c) => c.id !== id));
  };

  const handleStatusChange = (
    id: string,
    status: OfficialContractor["status"],
  ) => {
    setContractors(
      contractors.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Official Contractors
          </h2>
          <p className="text-muted-foreground">
            Manage official contractors for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Official Contractor"
          onClick={() => {
            setEditingContractor(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <OfficialContractorTable
        contractors={contractors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <OfficialContractorFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        contractor={editingContractor}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
