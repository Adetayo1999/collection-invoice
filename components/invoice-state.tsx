import { FileQuestion } from "lucide-react";

export function InvoiceState({
  title,
  body,
  detail,
  action,
}: {
  title: string;
  body: string;
  detail: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="pt-0 lg:pt-16">
      <article className="rounded-lg border border-line bg-white px-8 py-14 text-center shadow-invoice sm:px-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate-50 text-navy">
          <FileQuestion size={34} />
        </div>
        <h1 className="mt-6 text-3xl font-black text-navy">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-base font-medium text-slate-600">{body}</p>
        <p className="mt-6 text-sm font-semibold text-muted">{detail}</p>
        {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
      </article>
    </div>
  );
}
