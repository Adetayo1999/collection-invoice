import { InvoiceShell } from "@/components/invoice-shell";
import { InvoiceSkeleton } from "@/components/invoice-skeleton";

export default function Loading() {
  return (
    <InvoiceShell>
      <InvoiceSkeleton />
    </InvoiceShell>
  );
}
