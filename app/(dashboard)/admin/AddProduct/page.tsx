"use client";

import { useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiImage,
  FiPackage,
  FiTag,
  FiDollarSign,
} from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import Link from "next/link";
import axiosSecure from "@/app/auth/axiosSecure";

type FormState = {
  name: string;
  category: string;
  price: string;
  image: string;
};

const initialState: FormState = {
  name: "",
  category: "watch",
  price: "",
  image: "",
};

export default function Page() {
  const [formData, setFormData] = useState<FormState>(initialState);

  const previewImage = useMemo(() => {
    return formData.image.trim();
  }, [formData.image]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Product draft:", formData);
    const payload = {
      ...formData,
      price: Number(formData.price),
    };
    axiosSecure
      .post("/products", payload)
      .then(() => {
        alert("Product added successfully!");
        setFormData(initialState);
      })
      .catch(() => {
        alert("Failed to add product. Please try again.");
      });
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
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Add Product
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Create a new product record with name, category, price, and a
                direct image link.
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

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-6 lg:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200">
                <FiPackage className="text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Product information
                </p>
                <p className="text-base font-semibold text-white">
                  Fill in the core catalog details
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Product name
                </span>
                <div className="relative">
                  <FiTag className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Lunar Desk Clock"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 sm:py-4 sm:text-base"
                  />
                </div>
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Category
                </span>
                <div className="relative">
                  <FiPackage className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 sm:py-4 sm:text-base"
                  >
                    <option value="watch">Watch</option>
                    <option value="clock">Clock</option>
                    <option value="fan">Fan</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Price
                </span>
                <div className="relative">
                  <FiDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="85"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 sm:py-4 sm:text-base"
                  />
                </div>
              </label>

              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Image link
                </span>
                <div className="relative">
                  <FiImage className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://i.ibb.co/..."
                    pattern="https?://.+"
                    title="Please enter a direct image URL"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 sm:py-4 sm:text-base"
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
                  Use a direct image URL only, such as an i.ibb.co link. The
                  product card preview updates as you type.
                </p>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-400 sm:text-sm">
                All fields are required before submitting to the backend.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:px-6"
              >
                Save Product
              </button>
            </div>
          </form>

          <aside className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                <HiOutlinePhotograph className="text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Live preview
                </p>
                <p className="text-base font-semibold text-white">
                  See how the product will look
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                {previewImage ? (
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${previewImage})` }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-center">
                    <div className="max-w-xs px-6">
                      <FiImage className="mx-auto text-4xl text-cyan-300/60" />
                      <p className="mt-4 text-sm text-slate-300">
                        Add an image URL to preview the product here.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Name
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {formData.name || "Lunar Desk Clock"}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Category
                    </p>
                    <p className="mt-1 text-sm font-medium capitalize text-slate-200">
                      {formData.category || "watch"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Price
                    </p>
                    <p className="mt-1 text-sm font-medium text-cyan-200">
                      {formData.price
                        ? `$${Number(formData.price).toLocaleString()}`
                        : "$85"}
                    </p>
                  </div>
                </div>

                <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-slate-300 sm:text-sm">
                  The image field accepts a direct link only. If the URL is
                  invalid or not an image endpoint, the preview will stay blank.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
