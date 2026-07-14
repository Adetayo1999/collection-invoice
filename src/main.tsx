import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowRight,
  CreditCard,
  Download,
  FileText,
  Mail,
  Printer,
  Rocket,
  Sprout,
  WalletCards,
} from "lucide-react";
import "./styles.css";

type Service = {
  title: string;
  detail: string;
  qty: number;
  unitPrice: string;
  total: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Netflix Premium",
    detail: "Monthly billing cycle (4K + HDR)",
    qty: 1,
    unitPrice: "$19.99",
    total: "$19.99",
    icon: (
      <span className="flex h-9 w-9 items-center justify-center rounded bg-red-50 text-red-500">
        <span className="grid h-4 w-5 place-items-center rounded-sm border-2 border-current text-[8px] font-black leading-none">
          ▶
        </span>
      </span>
    ),
  },
  {
    title: "Pro Plan Subscription",
    detail: "Annual loyalty discount applied",
    qty: 1,
    unitPrice: "$95.00",
    total: "$95.00",
    icon: (
      <span className="flex h-9 w-9 items-center justify-center rounded bg-blue-50 text-blue-500">
        <Rocket size={19} strokeWidth={2} />
      </span>
    ),
  },
  {
    title: "Donation to Reforestation Project",
    detail: "One-time environmental contribution",
    qty: 1,
    unitPrice: "$25.00",
    total: "$25.00",
    icon: (
      <span className="flex h-9 w-9 items-center justify-center rounded bg-emerald-50 text-emerald-500">
        <Sprout size={19} strokeWidth={2} />
      </span>
    ),
  },
];

function SideCard({
  icon,
  title,
  body,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: string;
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-7 text-ink shadow-sm">
      <div className="mb-4 text-navy">{icon}</div>
      <h2 className="text-lg font-bold leading-snug">{title}</h2>
      <p className="mt-2 max-w-64 text-sm leading-snug text-muted">{body}</p>
      <button className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-slate-500 transition hover:text-navy">
        {action}
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-panel px-5 py-8 text-ink sm:px-8 lg:px-12 xl:px-20">
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[285px_minmax(0,900px)] xl:gap-12">
        <aside className="space-y-4 pt-2 lg:pt-16">
          <SideCard
            icon={<FileText size={24} strokeWidth={2.3} />}
            title="Want to Create Your Own Invoice?"
            body="Click sign Up below to Create Invoice for Free."
            action="Sign up"
          />
          <SideCard
            icon={<Mail size={24} strokeWidth={2.3} />}
            title="Email Sender"
            body="Click here to send email to the sender of this Invoice"
            action="Email"
          />
          <p className="px-4 pt-4 text-sm text-muted">
            This invoice was generated through {"{App Name}"}.
          </p>
        </aside>

        <section className="min-w-0">
          <header className="mb-11 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-lg font-medium text-navy">Invoice INV-2023-0842</h1>
              <p className="mt-1 text-base text-muted">
                Manage your recurring subscription billing details
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 bg-white px-5 text-base font-semibold text-navy shadow-sm transition hover:border-navy/35">
                <Download size={17} />
                Download PDF
              </button>
              <button className="inline-flex h-11 items-center gap-2 rounded border border-slate-300 bg-white px-5 text-base font-semibold text-navy shadow-sm transition hover:border-navy/35">
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
                    <p className="mt-1 text-4xl font-semibold tracking-normal">$142.50 USD</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-wide text-white">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    Pending Payment
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase text-white/45">Due in 4 days</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8 sm:px-10 lg:px-12">
              <section className="grid gap-8 border-b border-line pb-9 sm:grid-cols-2 sm:gap-16">
                <AddressBlock
                  label="Bill From"
                  name="SubSteward Inc."
                  lines={["123 FinTech Plaza, Suite 500", "San Francisco, CA 94103", "United States"]}
                  email="billing@substeward.com"
                />
                <AddressBlock
                  label="Bill To"
                  name="Modern Tech Solutions LLC"
                  lines={["Attn: Alex Harrison", "888 Innovation Way", "Austin, TX 78701"]}
                  email="alex.h@moderntech.io"
                />
              </section>

              <section className="grid gap-5 border-b border-line py-7 sm:grid-cols-4">
                <Meta label="Invoice Number" value="INV-2023-0842" />
                <Meta label="Invoice Date" value="Oct 24, 2023" />
                <Meta label="Due Date" value="Oct 28, 2023" />
                <Meta label="Payment Method" value="Visa ending in 4242" />
              </section>

              <section className="py-10">
                <div className="hidden grid-cols-[1fr_90px_120px_120px] border-b border-line pb-5 text-xs font-black uppercase text-muted sm:grid">
                  <span>Service Description</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Unit Price</span>
                  <span className="text-right">Total</span>
                </div>

                <div>
                  {services.map((service) => (
                    <div
                      key={service.title}
                      className="grid gap-4 border-b border-slate-100 py-7 sm:grid-cols-[1fr_90px_120px_120px] sm:items-center"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        {service.icon}
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-extrabold text-navy">{service.title}</h3>
                          <p className="text-sm font-medium text-muted">{service.detail}</p>
                        </div>
                      </div>
                      <div className="flex justify-between text-base font-semibold sm:block sm:text-center">
                        <span className="text-xs font-black uppercase text-muted sm:hidden">Qty</span>
                        {service.qty}
                      </div>
                      <div className="flex justify-between text-base font-bold sm:block sm:text-right">
                        <span className="text-xs font-black uppercase text-muted sm:hidden">Unit Price</span>
                        {service.unitPrice}
                      </div>
                      <div className="flex justify-between text-lg font-black text-navy sm:block sm:text-right">
                        <span className="text-xs font-black uppercase text-muted sm:hidden">Total</span>
                        {service.total}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <footer className="grid gap-8 pt-2 lg:grid-cols-[1fr_405px] lg:items-start">
                <section className="rounded bg-slate-50 p-7">
                  <h2 className="text-lg font-medium uppercase text-muted">Notes &amp; Terms</h2>
                  <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-slate-700">
                    Please make the payment before the due date. Late payments may result in a 2.5% penalty fee per
                    week. For any billing queries, please contact our support team at support@substeward.com.
                  </p>
                </section>

                <section>
                  <dl className="space-y-5 text-base">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted">Subtotal</dt>
                      <dd className="font-black text-navy">$139.99</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted">Estimated Tax (1.8%)</dt>
                      <dd className="font-black text-navy">$2.51</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-line pt-5">
                      <dt className="text-lg text-navy">Total Amount</dt>
                      <dd className="text-lg font-medium text-navy">$142.50</dd>
                    </div>
                  </dl>
                  <button className="mt-9 inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-navy px-6 text-lg font-medium text-white shadow-button transition hover:bg-[#073b61]">
                    <CreditCard size={24} />
                    Pay Now
                  </button>
                  <p className="mt-4 text-center text-xs font-medium text-muted">
                    Secure payment processed by Stripe. All transactions are encrypted.
                  </p>
                </section>
              </footer>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function AddressBlock({
  label,
  name,
  lines,
  email,
}: {
  label: string;
  name: string;
  lines: string[];
  email: string;
}) {
  return (
    <div>
      <h2 className="mb-6 text-lg font-medium uppercase text-muted">{label}</h2>
      <p className="mb-2 text-lg font-medium text-navy">{name}</p>
      <div className="space-y-2 text-lg text-slate-700">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <a className="mt-3 inline-block text-lg font-bold text-navy" href={`mailto:${email}`}>
        {email}
      </a>
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
