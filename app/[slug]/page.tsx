import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvoiceClient } from "@/components/invoice-client";
import { InvoiceShell } from "@/components/invoice-shell";
import {
  getInvoice,
  invoiceTotals,
  formatMoney,
  InvoiceFetchError,
} from "@/lib/invoice";

type InvoicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { slug } = await params;
  let invoice;

  try {
    invoice = await getInvoice(slug);
  } catch (error) {
    if (error instanceof InvoiceFetchError) {
      return {
        title: "Invoice unavailable",
        description: "This invoice could not be loaded right now.",
      };
    }

    throw error;
  }

  if (!invoice) {
    return {
      title: "Invoice not found",
      description: "This invoice link could not be found.",
    };
  }

  const { totalAmount } = invoiceTotals(invoice);
  const title = `${invoice.invoiceName || "Invoice"} - ${invoice.businessName}`;
  const description = `${invoice.description} Total due: ${formatMoney(totalAmount, invoice.currency)}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${invoice.slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function InvoiceSlugPage({ params }: InvoicePageProps) {
  const { slug } = await params;
  const invoice = await getInvoice(slug);

  if (!invoice) {
    notFound();
  }

  return (
    <InvoiceShell invoice={invoice}>
      <InvoiceClient invoice={invoice} />
    </InvoiceShell>
  );
}
