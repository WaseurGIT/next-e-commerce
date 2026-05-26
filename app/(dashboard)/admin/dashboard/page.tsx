import axiosSecure from "@/app/auth/axiosSecure";
import { FiShield, FiShoppingBag } from "react-icons/fi";
import { PiClockDuotone, PiFanDuotone, PiWatchDuotone } from "react-icons/pi";
import { SiTrendmicro } from "react-icons/si";

type Product = {
  _id: string;
  name?: string;
  category?: string;
};

async function getProducts() {
  try {
    const response = await axiosSecure.get("/products");
    const data = await response.data;

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products for dashboard:", error);
    return [];
  }
}

export default async function Page() {
  const products: Product[] = await getProducts();
  const totalProducts = products.length;
  const topCategories = Array.from(
    products.reduce((accumulator, product) => {
      const category = product.category ?? "uncategorized";
      accumulator.set(category, (accumulator.get(category) ?? 0) + 1);
      return accumulator;
    }, new Map<string, number>()),
  )
    .sort((first, second) => second[1] - first[1])
    .slice(0, 4);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white shadow-2xl shadow-slate-900/20 sm:rounded-4xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,1),rgba(15,23,42,0.96))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] opacity-20" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              <FiShield className="text-sm" />
              Admin overview
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-3xl">
                Product inventory dashboard
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                A clean snapshot of your catalog, with live totals pulled
                directly from the backend.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm sm:w-auto">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <FiShoppingBag className="text-xl" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Live catalog sync
              </p>
              <p className="text-sm font-semibold text-white">
                Updated on page load
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-300">
                  Total products available
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-3xl">
                    {totalProducts}
                  </span>
                  <span className="pb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
                    items
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {topCategories.length > 0 ? (
                topCategories.map(([category, count]) => (
                  <div
                    key={category}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-start justify-between gap-3 sm:items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                        {category === "watch" ? (
                          <PiWatchDuotone className="text-lg" />
                        ) : category === "clock" ? (
                          <PiClockDuotone className="text-lg" />
                        ) : category === "fan" ? (
                          <PiFanDuotone className="text-lg" />
                        ) : category === "trending" ? (
                          <SiTrendmicro className="text-lg" />
                        ) : null}
                      </div>
                      <span className="text-2xl font-bold text-white">
                        {count}
                      </span>
                    </div>
                    <p className="mt-4 wrap-break-word text-sm font-medium capitalize text-slate-200">
                      {category}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Products currently listed
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/40 p-5 text-sm text-slate-300 sm:col-span-2 xl:col-span-4">
                  No products found yet. Add inventory to populate the dashboard
                  summary.
                </div>
              )}
            </div>
          </div>

          {/* <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                <FiChevronRight className="text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Dashboard note
                </p>
                <p className="text-base font-semibold text-white">
                  Designed for quick admin checks
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <p>
                This view keeps the inventory signal front and center so you can
                verify catalog growth at a glance.
              </p>
              <p>
                The count is read directly from{" "}
                <span className="font-semibold text-white">/products</span> and
                rendered without extra navigation.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Status
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Inventory snapshot ready
                  </p>
                  <p className="text-xs text-slate-400">
                    Uses the latest data from the backend
                  </p>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_8px_rgba(52,211,153,0.14)]" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
