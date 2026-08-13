// app/admin/events/[id]/accounting/invoices/create/page.tsx

import { InvoiceFormPage } from "@/components/admin/accounting/InvoiceFormPage";

export default async function CreateInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InvoiceFormPage eventId={id} invoice={null} />;
}
