import { ArrowRight, FileText, Mail } from "lucide-react";
import type { Invoice } from "@/lib/invoice";

export function InvoiceShell({ children, invoice }: { children: React.ReactNode; invoice?: Invoice }) {
  const recipientEmail = invoice?.recipientEmail;

  return (
    <main className="min-h-screen bg-panel px-5 py-8 text-ink sm:px-8 lg:px-12 xl:px-20">
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[285px_minmax(0,900px)] xl:gap-12">
        <aside className="order-2 space-y-4 pt-2 lg:order-1 lg:pt-16">
          <SideCard
            icon={<FileText size={24} strokeWidth={2.3} />}
            title="Want to Create Your Own Invoice?"
            body="Click sign Up below to Create Invoice for Free."
            action="Sign up"
            href="#"
          />
          {invoice ? (
            <SideCard
              icon={<Mail size={24} strokeWidth={2.3} />}
              title="Email Sender"
              body="Click here to send email to the sender of this Invoice"
              action="Email"
              href={recipientEmail ? `mailto:${recipientEmail}` : "#"}
            />
          ) : null}
          {invoice ? (
            <p className="px-4 pt-4 text-sm text-muted">This invoice was generated through {invoice.businessName}.</p>
          ) : null}
        </aside>

        <section className="order-1 min-w-0 lg:order-2">{children}</section>
      </div>
    </main>
  );
}

function SideCard({
  icon,
  title,
  body,
  action,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: string;
  href: string;
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-7 text-ink shadow-sm">
      <div className="mb-4 text-navy">{icon}</div>
      <h2 className="text-lg font-bold leading-snug">{title}</h2>
      <p className="mt-2 max-w-64 text-sm leading-snug text-muted">{body}</p>
      <a className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-slate-500 transition hover:text-navy" href={href}>
        {action}
        <ArrowRight size={14} />
      </a>
    </section>
  );
}
