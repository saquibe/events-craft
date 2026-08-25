// app/admin/events/[id]/invitation/page.tsx
"use client";
import { useParams } from "next/navigation";
import { InvitationDesigner } from "@/components/admin/rsvp/InvitationDesigner";

export default function InvitationPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  return (
    <div className="space-y-6">
      <InvitationDesigner eventId={eventId} />
    </div>
  );
}
