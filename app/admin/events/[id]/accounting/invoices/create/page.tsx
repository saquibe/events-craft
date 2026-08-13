// app/admin/events/[id]/accounting/invoices/create/page.tsx
import { InvoiceFormPage } from "@/components/admin/accounting/InvoiceFormPage";

export default function CreateInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  return <InvoiceFormPage eventId={params.id} invoice={null} />;
}
