"use client";

import React from "react";
import { CreditCard, Download, Printer, WalletCards, Wrench, X } from "lucide-react";
import {
  API_BASE_URL,
  daysUntilDue,
  formatDate,
  formatLabel,
  formatMoney,
  invoiceTotals,
  normalizeColor,
  serviceTotal,
  toNumber,
  type Invoice,
  type PaymentForm,
  type PaymentResponse,
} from "@/lib/invoice";

const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "United States", "United Kingdom"];
const pendingVisitMaxAgeMs = 30_000;

export function InvoiceClient({ invoice }: { invoice: Invoice }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const { subtotal, discount, vat, totalAmount } = invoiceTotals(invoice);
  const dueInDays = daysUntilDue(invoice.dueDate);
  const dueLabel =
    dueInDays > 0 ? `Due in ${dueInDays} ${dueInDays === 1 ? "day" : "days"}` : dueInDays === 0 ? "Due today" : "Past due";
  const recipientName = [invoice.recipientFirstName, invoice.recipientLastName].filter(Boolean).join(" ");
  const buttonColor = normalizeColor(invoice.appConfig?.buttonColor);
  const textColor = normalizeColor(invoice.appConfig?.textColor);

  return (
    <>
      <VisitTracker slug={invoice.slug} />

      <header className="mb-11 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-lg font-medium text-navy">Invoice {invoice.reference}</h1>
          <p className="mt-1 text-base text-muted">{invoice.invoiceName || invoice.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 bg-white px-5 text-base font-semibold text-navy shadow-sm transition hover:border-navy/35">
            <Download size={17} />
            Download PDF
          </button>
          <button
            className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 bg-white px-5 text-base font-semibold text-navy shadow-sm transition hover:border-navy/35"
            onClick={() => window.print()}
            type="button"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </header>

      <article className="overflow-hidden rounded-lg border border-line bg-white shadow-invoice">
        <div className="border-b-[6px] border-teal bg-navy px-8 py-8 text-white sm:px-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/13 text-white">
                <WalletCards size={23} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white/45">Total Amount Due</p>
                <p className="mt-1 text-4xl font-semibold tracking-normal">
                  {formatMoney(totalAmount, invoice.currency)} {invoice.currency}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wide text-white"
                style={{ backgroundColor: buttonColor }}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
                Pending Payment
              </span>
              <p className="mt-3 text-xs font-semibold uppercase text-white/45">{dueLabel}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 sm:px-10 lg:px-12">
          <section className="grid gap-8 border-b border-line pb-9 sm:grid-cols-2 sm:gap-16">
            <AddressBlock
              label="Bill From"
              name={invoice.businessName}
              lines={[invoice.description]}
              email=""
              textColor={textColor}
            />
            <AddressBlock
              label="Bill To"
              name={recipientName || "Recipient"}
              lines={[invoice.recipientAddress]}
              email={invoice.recipientEmail}
              textColor={textColor}
            />
          </section>

          <section className="grid gap-5 border-b border-line py-7 sm:grid-cols-4">
            <Meta label="Invoice Number" value={invoice.reference} />
            <Meta label="Invoice Date" value={formatDate(invoice.invoiceDate)} />
            <Meta label="Due Date" value={formatDate(invoice.dueDate)} />
            <Meta label="Billing Type" value={formatLabel(invoice.type)} />
          </section>

          <section className="py-10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] table-fixed border-collapse">
                <colgroup>
                  <col />
                  <col className="w-24" />
                  <col className="w-[150px]" />
                  <col className="w-[150px]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-line text-xs font-black uppercase text-muted">
                    <th className="pb-5 text-left">Service Description</th>
                    <th className="pb-5 text-center">Qty</th>
                    <th className="pb-5 text-right">Unit Price</th>
                    <th className="pb-5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.services.map((service) => (
                    <tr key={service.id} className="border-b border-slate-100">
                      <td className="py-7 pr-6">
                        <div className="flex min-w-0 items-center gap-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-500">
                            <Wrench size={19} strokeWidth={2} />
                          </span>
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-extrabold text-navy">{service.label}</h3>
                            <p className="text-sm font-medium text-muted">{service.description}</p>
                            {toNumber(service.chargeValue) > 0 ? (
                              <p className="mt-1 text-xs font-bold text-slate-500">
                                {service.chargeLabel || "Additional charge"}: {formatMoney(service.chargeValue || 0, invoice.currency)}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="py-7 text-center text-base font-bold text-slate-700">{service.quantity}</td>
                      <td className="py-7 text-right text-base font-bold text-slate-700">{formatMoney(service.amount, invoice.currency)}</td>
                      <td className="py-7 text-right text-lg font-black text-navy">{formatMoney(serviceTotal(service), invoice.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="grid gap-8 pt-2 lg:grid-cols-[1fr_405px] lg:items-start">
            <section className="rounded bg-slate-50 p-7">
              <h2 className="text-lg font-medium uppercase text-muted">Notes &amp; Terms</h2>
              <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-slate-700">
                {invoice.refundPolicy || "Please make the payment before the due date."}
              </p>
            </section>

            <section>
              <dl className="space-y-5 text-base">
                <TotalRow label="Subtotal" value={formatMoney(subtotal, invoice.currency)} />
                {discount > 0 ? (
                  <TotalRow label={`Discount (${invoice.discountPercent}%)`} value={`-${formatMoney(discount, invoice.currency)}`} />
                ) : null}
                {vat > 0 ? <TotalRow label={`VAT (${invoice.vatPercent}%)`} value={formatMoney(vat, invoice.currency)} /> : null}
                <div className="flex items-center justify-between border-t border-line pt-5">
                  <dt className="text-lg text-navy">Total Amount</dt>
                  <dd className="text-lg font-medium text-navy">{formatMoney(totalAmount, invoice.currency)}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-9 inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg px-6 text-lg font-medium text-white shadow-button transition brightness-100 hover:brightness-95"
                style={{ backgroundColor: buttonColor }}
                onClick={() => setIsPaymentModalOpen(true)}
              >
                <CreditCard size={24} />
                Pay Now
              </button>
              <p className="mt-4 text-center text-xs font-medium text-muted">
                Secure payment processed by FusPay. All transactions are encrypted.
              </p>
            </section>
          </footer>
        </div>
      </article>

      {isPaymentModalOpen ? (
        <PaymentModal
          invoice={invoice}
          totalAmount={totalAmount}
          buttonColor={buttonColor}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      ) : null}
    </>
  );
}

function VisitTracker({ slug }: { slug: string }) {
  React.useEffect(() => {
    void recordInvoiceVisit(slug);
  }, [slug]);

  return null;
}

function visitStorageKey(slug: string) {
  return `invoice-visit:${slug}`;
}

function hasRecentStoredVisit(slug: string) {
  try {
    const storedVisit = sessionStorage.getItem(visitStorageKey(slug));

    if (!storedVisit) {
      return false;
    }

    const parsed = JSON.parse(storedVisit) as { status?: string; timestamp?: number };

    if (parsed.status === "recorded") {
      return true;
    }

    return parsed.status === "pending" && Date.now() - (parsed.timestamp || 0) < pendingVisitMaxAgeMs;
  } catch {
    return false;
  }
}

function storeVisit(slug: string, status: "pending" | "recorded") {
  try {
    sessionStorage.setItem(visitStorageKey(slug), JSON.stringify({ status, timestamp: Date.now() }));
  } catch {
    // Visit tracking is non-critical. If storage is unavailable, the invoice should still render.
  }
}

function clearStoredVisit(slug: string) {
  try {
    sessionStorage.removeItem(visitStorageKey(slug));
  } catch {
    // Ignore storage cleanup errors for the same reason.
  }
}

async function recordInvoiceVisit(slug: string) {
  if (hasRecentStoredVisit(slug)) {
    return;
  }

  storeVisit(slug, "pending");

  try {
    const response = await fetch(`${API_BASE_URL}/invoice-links/public/${encodeURIComponent(slug)}/visits`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Visit tracking failed.");
    }

    storeVisit(slug, "recorded");
  } catch {
    clearStoredVisit(slug);
  }
}

function PaymentModal({
  invoice,
  totalAmount,
  buttonColor,
  onClose,
}: {
  invoice: Invoice;
  totalAmount: number;
  buttonColor: string;
  onClose: () => void;
}) {
  const [form, setForm] = React.useState<PaymentForm>({
    fullname: [invoice.recipientFirstName, invoice.recipientLastName].filter(Boolean).join(" "),
    email: invoice.recipientEmail,
    phoneNumber: "",
    country: "Nigeria",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  function updateField(field: keyof PaymentForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/invoice-links/public/${encodeURIComponent(invoice.slug)}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as PaymentResponse;

      if (!response.ok || !payload.success || !payload.data?.paymentUrl) {
        throw new Error(payload.message || "Unable to initiate this payment.");
      }

      window.open(payload.data.paymentUrl, "_blank", "noopener,noreferrer");
      onClose();
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Unable to initiate this payment.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm">
      <section className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line px-7 py-6">
          <div>
            <h2 className="text-2xl font-black text-navy">Customer details</h2>
            <p className="mt-1 text-sm font-medium text-muted">
              Confirm your details to continue paying {formatMoney(totalAmount, invoice.currency)}.
            </p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded border border-line text-slate-500 transition hover:border-navy/30 hover:text-navy"
            onClick={onClose}
            aria-label="Close payment form"
          >
            <X size={18} />
          </button>
        </div>

        <form className="space-y-5 px-7 py-6" onSubmit={handleSubmit}>
          <TextInput
            label="Full name"
            value={form.fullname}
            onChange={(value) => updateField("fullname", value)}
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
          <TextInput
            label="Email address"
            type="email"
            value={form.email}
            onChange={(value) => updateField("email", value)}
            placeholder="ada@example.com"
            autoComplete="email"
          />
          <TextInput
            label="Phone number"
            type="tel"
            value={form.phoneNumber}
            onChange={(value) => updateField("phoneNumber", value)}
            placeholder="+2348012345678"
            autoComplete="tel"
          />
          <CountrySelect value={form.country} onChange={(value) => updateField("country", value)} />

          {error ? (
            <p className="rounded border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded border border-slate-300 bg-white px-5 text-base font-bold text-navy transition hover:border-navy/35"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded px-5 text-base font-bold text-white shadow-button transition brightness-100 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ backgroundColor: buttonColor }}
              disabled={isSubmitting}
            >
              <CreditCard size={18} />
              {isSubmitting ? "Starting payment..." : "Continue to Pay"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black uppercase text-muted">{label}</span>
      <input
        className="mt-2 h-12 w-full rounded border border-line bg-white px-4 text-base font-semibold text-ink outline-none transition placeholder:text-slate-300 focus:border-navy/50 focus:ring-4 focus:ring-navy/10"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </label>
  );
}

function CountrySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-black uppercase text-muted">Country</span>
      <select
        className="mt-2 h-12 w-full rounded border border-line bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-navy/50 focus:ring-4 focus:ring-navy/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </label>
  );
}

function AddressBlock({
  label,
  name,
  lines,
  email,
  textColor,
}: {
  label: string;
  name: string;
  lines: string[];
  email: string;
  textColor: string;
}) {
  return (
    <div>
      <h2 className="mb-6 text-lg font-medium uppercase text-muted">{label}</h2>
      <p className="mb-2 text-lg font-medium" style={{ color: textColor }}>
        {name}
      </p>
      <div className="space-y-2 text-lg text-slate-700">
        {lines.filter(Boolean).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {email ? (
        <a className="mt-3 inline-block text-lg font-bold" href={`mailto:${email}`} style={{ color: textColor }}>
          {email}
        </a>
      ) : null}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase text-muted">{label}</p>
      <p className="mt-2 text-lg font-black text-navy">{value}</p>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-black text-navy">{value}</dd>
    </div>
  );
}
