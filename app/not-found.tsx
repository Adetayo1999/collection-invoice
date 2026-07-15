import { InvoiceShell } from "@/components/invoice-shell";
import { InvoiceState } from "@/components/invoice-state";

export default function NotFound() {
  return (
    <InvoiceShell>
      <InvoiceState title="Invoice not found" body="This invoice link is invalid or no longer available." detail="Check the link and try again." />
    </InvoiceShell>
  );
}
