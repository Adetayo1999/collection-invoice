export function InvoiceSkeleton() {
  return (
    <div className="animate-pulse">
      <header className="mb-11 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-11 w-40" />
          <Skeleton className="h-11 w-24" />
        </div>
      </header>

      <article className="overflow-hidden rounded-lg border border-line bg-white shadow-invoice">
        <div className="border-b-[6px] border-teal bg-navy px-8 py-8 sm:px-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-5">
              <Skeleton className="h-10 w-10 bg-white/15" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-36 bg-white/15" />
                <Skeleton className="h-10 w-64 bg-white/20" />
              </div>
            </div>
            <div className="space-y-3 sm:text-right">
              <Skeleton className="h-8 w-44 bg-white/20" />
              <Skeleton className="h-3 w-24 bg-white/15 sm:ml-auto" />
            </div>
          </div>
        </div>

        <div className="px-8 py-8 sm:px-10 lg:px-12">
          <section className="grid gap-8 border-b border-line pb-9 sm:grid-cols-2 sm:gap-16">
            <SkeletonAddress />
            <SkeletonAddress />
          </section>

          <section className="grid gap-5 border-b border-line py-7 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="space-y-3" key={index}>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
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
                  <tr className="border-b border-line">
                    <th className="pb-5 text-left">
                      <Skeleton className="h-3 w-40" />
                    </th>
                    <th className="pb-5 text-center">
                      <Skeleton className="mx-auto h-3 w-8" />
                    </th>
                    <th className="pb-5 text-right">
                      <Skeleton className="ml-auto h-3 w-20" />
                    </th>
                    <th className="pb-5 text-right">
                      <Skeleton className="ml-auto h-3 w-14" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="py-7 pr-6">
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-9 w-9 shrink-0" />
                          <div className="min-w-0 flex-1 space-y-3">
                            <Skeleton className="h-5 w-56 max-w-full" />
                            <Skeleton className="h-4 w-72 max-w-full" />
                          </div>
                        </div>
                      </td>
                      <td className="py-7 text-center">
                        <Skeleton className="mx-auto h-5 w-10" />
                      </td>
                      <td className="py-7 text-right">
                        <Skeleton className="ml-auto h-5 w-20" />
                      </td>
                      <td className="py-7 text-right">
                        <Skeleton className="ml-auto h-6 w-24" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="grid gap-8 pt-2 lg:grid-cols-[1fr_405px] lg:items-start">
            <section className="rounded bg-slate-50 p-7">
              <Skeleton className="h-5 w-36" />
              <div className="mt-5 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </section>

            <section>
              <div className="space-y-5">
                <SkeletonTotal />
                <SkeletonTotal />
                <div className="border-t border-line pt-5">
                  <SkeletonTotal />
                </div>
              </div>
              <Skeleton className="mt-9 h-14 w-full" />
              <Skeleton className="mx-auto mt-4 h-3 w-72 max-w-full" />
            </section>
          </footer>
        </div>
      </article>
    </div>
  );
}

function SkeletonAddress() {
  return (
    <div className="space-y-3">
      <Skeleton className="mb-6 h-5 w-24" />
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-5 w-64 max-w-full" />
      <Skeleton className="h-5 w-56 max-w-full" />
      <Skeleton className="h-5 w-48 max-w-full" />
    </div>
  );
}

function SkeletonTotal() {
  return (
    <div className="flex items-center justify-between gap-6">
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-5 w-24" />
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`block rounded bg-slate-200/80 ${className}`} />;
}
