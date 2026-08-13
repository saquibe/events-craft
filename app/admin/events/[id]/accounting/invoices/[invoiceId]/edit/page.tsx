// app/admin/events/[id]/accounting/invoices/[invoiceId]/edit/page.tsx
import { InvoiceFormPage } from "@/components/admin/accounting/InvoiceFormPage";

// Mock function to fetch invoice - replace with actual API call
const getInvoice = (id: string) => {
  // This would be fetched from your API
  return null;
};

export default function EditInvoicePage({
  params,
}: {
  params: { id: string; invoiceId: string };
}) {
  const invoice = getInvoice(params.invoiceId);

  return <InvoiceFormPage eventId={params.id} invoice={invoice} />;
}
