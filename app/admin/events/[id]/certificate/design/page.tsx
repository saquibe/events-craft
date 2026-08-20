// app/admin/events/[id]/certificate/design/page.tsx
"use client";

import { CertificateDesigner } from "@/components/admin/certificate/CertificateDesigner";
import { CertificateProvider } from "@/components/admin/certificate/CertificateContext";

export default function CertificateDesignPage() {
  return (
    <CertificateProvider>
      <CertificateDesigner />
    </CertificateProvider>
  );
}
