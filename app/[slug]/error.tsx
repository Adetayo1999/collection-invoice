"use client";

import { RefreshCw } from "lucide-react";
import { InvoiceShell } from "@/components/invoice-shell";
import { InvoiceState } from "@/components/invoice-state";

export default function InvoiceError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <InvoiceShell>
      <InvoiceState
        title="Unable to load invoice"
        body="We could not fetch this invoice right now."
        detail="Please check your connection or try again in a moment."
        action={
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-navy px-5 text-base font-bold text-white shadow-button transition hover:bg-[#073b61]"
            onClick={reset}
            type="button"
          >
            <RefreshCw size={17} />
            Try again
          </button>
        }
      />
    </InvoiceShell>
  );
}
