import { InvoiceShell } from "@/components/invoice-shell";
import { InvoiceState } from "@/components/invoice-state";

export default function HomePage() {
  return (
    <InvoiceShell>
      <InvoiceState
        title="Invoice not found"
        body="Open a valid invoice link to view billing details."
        detail="Expected format: /AprInv92"
      />
    </InvoiceShell>
  );
}
