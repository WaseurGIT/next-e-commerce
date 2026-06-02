"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  LoaderCircle,
  Package2,
  ShoppingBag,
} from "lucide-react";
import axiosSecure from "@/app/auth/axiosSecure";

interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);

const getErrorStatus = (error: unknown) => {
  if (typeof error !== "object" || error === null) return undefined;

  const response = "response" in error ? (error as { response?: { status?: number } }).response : undefined;
  return response?.status;
};

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchCartItems = async () => {
      try {
        const response = await axiosSecure.get("/carts", {
          withCredentials: true,
        });

        if (!active) return;

        setCartItems(response.data || []);
        setError(null);
      } catch (requestError: unknown) {
        if (!active) return;

        const status = getErrorStatus(requestError);
        setError(
          status === 401
            ? "Your session expired. Please sign in again to view your cart."
            : "We could not load your cart right now.",
        );
        setCartItems([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCartItems();

    return () => {
      active = false;
    };
  }, []);

  const cartSummary = useMemo(() => {
    const distinctItems = cartItems.length;
    const totalUnits = cartItems.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0,
    );
    const totalValue = cartItems.reduce(
      (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0,
    );
    const avgValue = totalUnits > 0 ? totalValue / totalUnits : 0;

    return { distinctItems, totalUnits, totalValue, avgValue };
  }, [cartItems]);

  return (
    <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl bg-slate-950 px-4 py-5 text-white shadow-2xl ring-1 ring-white/10 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_24%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.92))]" />
      <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl sm:-left-24 sm:h-72 sm:w-72" />
      <div className="absolute -right-20 bottom-4 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl sm:-right-24 sm:h-72 sm:w-72" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-xl lg:text-xl">
                Your shopping cart dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Review the products you saved, the number of units in the cart,
                and the running total before checkout.
              </p>
            </div>
          </div>

          {/* <div className="grid gap-3 sm:grid-cols-2 lg:min-w-104 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 sm:px-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Distinct items
              </p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {formatNumber(cartSummary.distinctItems)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 sm:px-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Total units
              </p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {formatNumber(cartSummary.totalUnits)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 sm:px-5 sm:col-span-2 lg:col-span-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Estimated value
              </p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                {formatCurrency(cartSummary.totalValue)}
              </p>
            </div>
          </div> */}
        </div>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-10 backdrop-blur-xl sm:min-h-96">
            <div className="flex flex-col items-center gap-3 text-center">
              <LoaderCircle className="h-8 w-8 animate-spin text-sky-300" />
              <p className="text-sm text-slate-300">Loading cart items...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-rose-300/20 bg-rose-500/10 p-3 text-rose-200">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Cart unavailable
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-rose-100/80">
                  {error}
                </p>
                <Link
                  href="/pages/CartPage"
                  className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                >
                  Open cart page
                </Link>
              </div>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  <BadgeCheck className="h-3.5 w-3.5 text-sky-300" />
                  No items yet
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    Your cart is empty
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                    Browse products and add something worthwhile. Once items are
                    added, they will appear here with live totals and quantities.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                  >
                    Continue shopping
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/pages/CartPage"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Open full cart
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Distinct items
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">0</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Total units
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)] lg:gap-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl sm:p-6 lg:flex lg:max-h-[calc(100vh-11rem)] lg:flex-col lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white sm:text-xl">
                    Cart items
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
                {cartItems.map((item) => {
                  const quantity = Number(item.quantity) || 0;
                  return (
                    <article
                      key={item._id}
                      className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-sky-400/20 hover:bg-slate-950/70 sm:flex-row sm:items-center sm:p-5"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 sm:h-24 sm:w-24">
                        {item.image ? (
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                            aria-label={item.name}
                            role="img"
                          />
                        ) : (
                          <ShoppingBag className="h-9 w-9 text-slate-400" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-semibold text-white sm:text-xl">
                              {item.name}
                            </h3>
                          </div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-sky-200">
                            {formatCurrency(Number(item.price) || 0)} each
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                            <Package2 className="h-4 w-4 text-emerald-300" />
                            Quantity: {formatNumber(quantity)}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <aside className="space-y-5 sm:space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300 ring-1 ring-sky-300/20">
                    <Package2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Cart summary
                    </h3>
                    <p className="text-sm text-slate-300">
                      A clean overview of what is currently in the cart.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Distinct items
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatNumber(cartSummary.distinctItems)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Total units
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatNumber(cartSummary.totalUnits)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Estimated value
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatCurrency(cartSummary.totalValue)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-linear-to-br from-sky-400/15 via-cyan-400/10 to-emerald-400/10 p-5 shadow-xl backdrop-blur-xl sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-white ring-1 ring-white/15">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Ready for checkout
                    </h3>
                    <p className="text-sm text-slate-200/80">
                      Review the full cart page for quantity adjustments and payment.
                    </p>
                  </div>
                </div>

                <Link
                  href="/pages/CartPage"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.01]"
                >
                  Open cart page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
