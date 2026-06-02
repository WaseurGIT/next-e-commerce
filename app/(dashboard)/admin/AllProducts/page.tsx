"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { FiArrowLeft, FiGrid, FiPackage, FiTrash2 } from "react-icons/fi";
import axiosSecure from "@/app/auth/axiosSecure";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products");
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const uniqueCategories = new Set(
      products.map((product) => product.category),
    ).size;
    const highestPrice = products.reduce((maxPrice, product) => {
      return product.price > maxPrice ? product.price : maxPrice;
    }, 0);

    return {
      totalProducts,
      uniqueCategories,
      highestPrice,
    };
  }, [products]);

  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Delete product?",
      text: `${name} will be removed permanently from the catalog.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      await axiosSecure.delete(`/products/${id}`);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== id),
      );

      await Swal.fire({
        title: "Deleted",
        text: "Product deleted successfully.",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        title: "Delete failed",
        text: "Unable to delete this product right now.",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price: number) => {
    if (Number.isNaN(price)) {
      return "$0";
    }

    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,1),rgba(15,23,42,0.96))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] opacity-20" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Admin panel
            </p>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-3xl">
                All Products
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage your catalog in one responsive view with fast delete
                actions for each product.
              </p>
            </div>
          </div>

          <Link
            href="/admin/dashboard"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <FiArrowLeft />
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Total products
            </p>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {stats.totalProducts}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Categories
            </p>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {stats.uniqueCategories}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:col-span-2 xl:col-span-1">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Highest price
            </p>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {formatPrice(stats.highestPrice)}
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-6 lg:p-8">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-16 text-center text-sm text-slate-300">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-16 text-center text-sm text-slate-300">
              No products found.
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-left">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Product
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Category
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Price
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-transparent">
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          className="transition-colors hover:bg-white/5"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white">
                                  {product.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm capitalize text-slate-300">
                            {product.category}
                          </td>
                          <td className="px-5 py-4 text-sm font-semibold text-cyan-200">
                            {formatPrice(product.price)}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() =>
                                handleDelete(product._id, product.name)
                              }
                              disabled={deletingId === product._id}
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <FiTrash2 />
                              {deletingId === product._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-4 lg:hidden">
                {products.map((product) => (
                  <article
                    key={product._id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 shadow-lg shadow-black/10"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-4 p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                            {product.name}
                          </h2>
                          <p className="mt-1 flex items-center gap-2 text-sm capitalize text-slate-300">
                            <FiGrid className="text-slate-400" />
                            {product.category}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        disabled={deletingId === product._id}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FiTrash2 />
                        {deletingId === product._id
                          ? "Deleting..."
                          : "Delete product"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
