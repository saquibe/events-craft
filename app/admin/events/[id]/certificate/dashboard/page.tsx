// app/admin/events/[id]/certificate/dashboard/page.tsx
"use client";

import { CertificateDashboard } from "@/components/admin/certificate/CertificateDashboard";
import { CertificateProvider } from "@/components/admin/certificate/CertificateContext";

export default function CertificateDashboardPage() {
  return (
    <CertificateProvider>
      <CertificateDashboard />
    </CertificateProvider>
  );
}
