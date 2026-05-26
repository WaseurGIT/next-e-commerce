"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosSecure from "@/app/auth/axiosSecure";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === "admin").length;
  const customerUsers = users.filter((user) => user.role !== "admin").length;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Delete this user?");

    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      await axiosSecure.delete(`/users/${id}`);
      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const parsedDate = new Date(dateString);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_28%),linear-gradient(135deg,rgba(15,23,42,1),rgba(15,23,42,0.96))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] opacity-20" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Admin panel
            </p>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-2xl">
                All Users
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Review your users in a responsive management view with quick delete actions.
              </p>
            </div>
          </div>

          <Link
            href="/admin/dashboard"
            className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Total users</p>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl">{totalUsers}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Admin users</p>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl">{adminUsers}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:col-span-2 xl:col-span-1">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Customers</p>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl">{customerUsers}</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-md sm:p-6 lg:p-8">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-16 text-center text-sm text-slate-300">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-16 text-center text-sm text-slate-300">
              No users found.
            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-left">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Name
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Email
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Role
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Joined
                        </th>
                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-transparent">
                      {users.map((user) => (
                        <tr key={user._id} className="transition-colors hover:bg-white/5">
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-white">
                            {user.name}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-300">
                            <span className="block max-w-[280px] truncate">{user.email}</span>
                          </td>
                          <td className="px-5 py-4 text-sm capitalize text-slate-300">
                            {user.role}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-300">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleDelete(user._id)}
                              disabled={deletingId === user._id}
                              className="inline-flex items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingId === user._id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-4 lg:hidden">
                {users.map((user) => (
                  <article
                    key={user._id}
                    className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 shadow-lg shadow-black/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-white">
                          {user.name}
                        </h2>
                        <p className="mt-1 truncate text-sm text-slate-300">
                          {user.email}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold capitalize text-cyan-100">
                        {user.role}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Joined</p>
                        <p className="mt-1">{formatDate(user.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Role</p>
                        <p className="mt-1 capitalize">{user.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deletingId === user._id}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === user._id ? "Deleting..." : "Delete user"}
                    </button>
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