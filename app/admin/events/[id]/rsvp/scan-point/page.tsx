"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ScanPointRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = (params?.id as string) || "";

  useEffect(() => {
    // Redirect to the check-in scan point page
    router.push(`/admin/events/${eventId}/check-in/scan-point`);
  }, [eventId, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Redirecting to Scan Point...</p>
      </div>
    </div>
  );
}
