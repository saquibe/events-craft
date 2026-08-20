// app/admin/events/[id]/certificate/assign/page.tsx
"use client";

import { CertificateAssign } from "@/components/admin/certificate/CertificateAssign";
import { CertificateProvider } from "@/components/admin/certificate/CertificateContext";

export default function CertificateAssignPage() {
  return (
    <CertificateProvider>
      <CertificateAssign />
    </CertificateProvider>
  );
}
