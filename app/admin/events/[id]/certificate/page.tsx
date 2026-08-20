// app/admin/events/[id]/certificate/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CertificateProvider } from "@/components/admin/certificate/CertificateContext";
import { CertificateDashboard } from "@/components/admin/certificate/CertificateDashboard";
import { CertificateDesigner } from "@/components/admin/certificate/CertificateDesigner";
import { CertificateAssign } from "@/components/admin/certificate/CertificateAssign";
import { CertificateSend } from "@/components/admin/certificate/CertificateSend";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("dashboard");

  // Get tab from URL query param if needed
  // const searchParams = useSearchParams();
  // const tab = searchParams.get('tab') || 'dashboard';

  return (
    <CertificateProvider eventId={eventId}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => router.push(`/admin/events/${eventId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Event
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Certificate</h2>
            <p className="text-muted-foreground">
              Manage and design certificates for your event
            </p>
          </div>
        </div>

        <SimpleTabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <SimpleTabsList className="bg-muted/50 p-1">
            <SimpleTabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-background"
            >
              Dashboard
            </SimpleTabsTrigger>
            <SimpleTabsTrigger
              value="design"
              className="data-[state=active]:bg-background"
            >
              Design Certificate
            </SimpleTabsTrigger>
            <SimpleTabsTrigger
              value="assign"
              className="data-[state=active]:bg-background"
            >
              Assign Certificate
            </SimpleTabsTrigger>
            <SimpleTabsTrigger
              value="send"
              className="data-[state=active]:bg-background"
            >
              Send Certificate
            </SimpleTabsTrigger>
          </SimpleTabsList>

          <SimpleTabsContent value="dashboard" className="mt-4">
            <CertificateDashboard />
          </SimpleTabsContent>

          <SimpleTabsContent value="design" className="mt-4">
            <CertificateDesigner />
          </SimpleTabsContent>

          <SimpleTabsContent value="assign" className="mt-4">
            <CertificateAssign />
          </SimpleTabsContent>

          <SimpleTabsContent value="send" className="mt-4">
            <CertificateSend />
          </SimpleTabsContent>
        </SimpleTabs>
      </div>
    </CertificateProvider>
  );
}
