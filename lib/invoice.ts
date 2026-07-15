export const API_BASE_URL = "https://finswichapigateway.apps.fuspay.finance";

export type InvoiceService = {
  id: string;
  label: string;
  description: string;
  quantity: number;
  chargeLabel?: string | null;
  chargeValue?: string | null;
  amount: string;
};

export type AppConfig = {
  textColor?: string;
  buttonColor?: string;
};

export type Invoice = {
  id: string;
  reference: string;
  businessName: string;
  invoiceName: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  recipientAddress: string;
  description: string;
  slug: string;
  redirectUrl?: string | null;
  amount: string;
  invoiceDate: string;
  dueDate: string;
  type: string;
  billingCycle?: string | null;
  discountPercent?: string | null;
  vatPercent?: string | null;
  currency: string;
  refundPolicy?: string | null;
  services: InvoiceService[];
  appConfig?: AppConfig | null;
};

export type InvoiceResponse = {
  success: boolean;
  message: string;
  data?: Invoice;
};

export type PaymentResponse = {
  success: boolean;
  message: string;
  data?: {
    paymentUrl: string;
    txnMerchantRef: string;
  };
};

export type PaymentForm = {
  fullname: string;
  email: string;
  phoneNumber: string;
  country: string;
};

export async function getInvoice(slug: string) {
  const response = await fetch(`${API_BASE_URL}/invoice-links/public/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as InvoiceResponse;
  return payload.success && payload.data ? payload.data : null;
}

export function toNumber(value?: string | number | null) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatMoney(value: number | string, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(toNumber(value)) ? 0 : 2,
  }).format(toNumber(value));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function daysUntilDue(dueDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  return Math.ceil((due.getTime() - today.getTime()) / 86_400_000);
}

export function serviceTotal(service: InvoiceService) {
  return toNumber(service.amount) * service.quantity + toNumber(service.chargeValue);
}

export function invoiceTotals(invoice: Invoice) {
  const lineSubtotal = invoice.services.reduce((sum, service) => sum + serviceTotal(service), 0);
  const subtotal = lineSubtotal || toNumber(invoice.amount);
  const discount = subtotal * (toNumber(invoice.discountPercent) / 100);
  const vat = (subtotal - discount) * (toNumber(invoice.vatPercent) / 100);

  return {
    subtotal,
    discount,
    vat,
    totalAmount: subtotal - discount + vat,
  };
}

export function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function normalizeColor(value?: string) {
  return value || "#06446f";
}
