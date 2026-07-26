"use client";

import { useParams } from "next/navigation";
import { DataImport } from "@/components/admin/onsite/DataImport";

export default function DataImportPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Data Import</h2>
        <p className="text-muted-foreground">
          Import attendee data for Event #{eventId}
        </p>
      </div>

      <DataImport />
    </div>
  );
}
