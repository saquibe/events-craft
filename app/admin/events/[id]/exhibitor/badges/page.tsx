"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuotaTable } from "@/components/admin/exhibitor/QuotaTables";

interface QuotaItem {
  id: string;
  exhibitorId: string;
  exhibitorName: string;
  quota: number;
  startDateTime: string;
  endDateTime: string;
  status: "Active" | "Inactive";
  sendEmail: boolean;
}

const mockQuotas: QuotaItem[] = [];

export default function ExhibitorBadgesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [quotas, setQuotas] = useState<QuotaItem[]>(mockQuotas);

  const handleEdit = (item: QuotaItem) => {
    console.log("Edit quota:", item);
  };

  const handleDelete = (id: string) => {
    setQuotas(quotas.filter((q) => q.id !== id));
  };

  const handleStatusChange = (id: string, status: "Active" | "Inactive") => {
    setQuotas(quotas.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Exhibitor Badges
          </h2>
          <p className="text-muted-foreground">
            Manage exhibitor badge quotas for Event #{eventId}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Badge Quota
        </Button>
      </div>

      <QuotaTable
        data={quotas}
        type="badge"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
