// app/admin/events/[id]/certificate/send/page.tsx
"use client";

import { CertificateSend } from "@/components/admin/certificate/CertificateSend";
import { CertificateProvider } from "@/components/admin/certificate/CertificateContext";

export default function CertificateSendPage() {
  return (
    <CertificateProvider>
      <CertificateSend />
    </CertificateProvider>
  );
}
