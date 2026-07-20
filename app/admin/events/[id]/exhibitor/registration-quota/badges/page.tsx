"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuotaTable } from "@/components/admin/exhibitor/QuotaTables";
import { ExhibitorBadgeQuotaFormSheet } from "@/components/admin/exhibitor/ExhibitorBadgeQuotaFormSheet";
import { CreateButton } from "@/components/admin/common/CreateButton";

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

// Mock data
const mockExhibitors = [
  { id: "1", companyName: "Tech Corp" },
  { id: "2", companyName: "Health Solutions" },
];

const mockQuotas: QuotaItem[] = [];

export default function ExhibitorBadgesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [quotas, setQuotas] = useState<QuotaItem[]>(mockQuotas);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuota, setEditingQuota] = useState<QuotaItem | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingQuota) {
      setQuotas(
        quotas.map((q) =>
          q.id === editingQuota.id
            ? {
                ...q,
                ...data,
                exhibitorName:
                  mockExhibitors.find((e) => e.id === data.exhibitorId)
                    ?.companyName || "",
              }
            : q,
        ),
      );
    } else {
      const newQuota: QuotaItem = {
        id: String(quotas.length + 1),
        ...data,
        exhibitorName:
          mockExhibitors.find((e) => e.id === data.exhibitorId)?.companyName ||
          "",
      };
      setQuotas([...quotas, newQuota]);
    }
    setIsFormOpen(false);
    setEditingQuota(null);
  };

  const handleEdit = (quota: QuotaItem) => {
    setEditingQuota(quota);
    setIsFormOpen(true);
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
        <CreateButton
          label="Exhibitor Badge Quota"
          onClick={() => {
            setEditingQuota(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <QuotaTable
        data={quotas}
        type="badge"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ExhibitorBadgeQuotaFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        quota={editingQuota}
        exhibitors={mockExhibitors}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
