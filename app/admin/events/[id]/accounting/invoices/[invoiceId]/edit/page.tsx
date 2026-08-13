import { InvoiceFormPage } from "@/components/admin/accounting/InvoiceFormPage";

// Mock function to fetch invoice - replace with actual API call
const getInvoice = (id: string) => {
  return null;
};

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string; invoiceId: string }>;
}) {
  const { id, invoiceId } = await params;

  const invoice = getInvoice(invoiceId);

  return <InvoiceFormPage eventId={id} invoice={invoice} />;
}
