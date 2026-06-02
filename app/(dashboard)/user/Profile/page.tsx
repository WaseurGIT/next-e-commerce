"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  LoaderCircle,
  Mail,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import axiosSecure from "@/app/auth/axiosSecure";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  createdAt?: string;
}

const formatDate = (value?: string) => {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const getInitials = (name?: string) => {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const response = await axiosSecure.get("/me", {
          withCredentials: true,
        });


        setUser(response.data);
        setError(null);
      } catch (requestError: any) {

        const status = requestError?.response?.status;
        setError(
          status === 401
            ? "Your session expired. Please sign in again to view this profile."
            : "We could not load the profile information right now.",
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const profileSummary = useMemo(() => {
    if (!user) {
      return [
        { label: "Role", value: "-" },
      ];
    }

    return [
      {
        label: "Member since",
        value: formatDate(user.createdAt),
      },
    ];
  }, [user]);


  return (
    <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl bg-slate-950 px-4 py-5 text-white shadow-2xl ring-1 ring-white/10 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.16),_transparent_26%),linear-gradient(135deg,_rgba(2,6,23,0.96),_rgba(15,23,42,0.92))]" />
      <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl sm:-left-24 sm:h-72 sm:w-72" />
      <div className="absolute -right-20 bottom-4 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl sm:-right-24 sm:h-72 sm:w-72" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 sm:space-y-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
                User account overview
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                View the essentials for your account, confirm your access level,
                and keep your contact details close at hand.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[26rem] lg:grid-cols-3">
            {profileSummary.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 sm:px-5"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[18rem] items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-10 backdrop-blur-xl sm:min-h-[24rem]">
            <div className="flex flex-col items-center gap-3 text-center">
              <LoaderCircle className="h-8 w-8 animate-spin text-sky-300" />
              <p className="text-sm text-slate-300">Loading profile...</p>
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
                  Profile unavailable
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-rose-100/80">
                  {error}
                </p>
                <Link
                  href="/Login"
                  className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                >
                  Go to login
                </Link>
              </div>
            </div>
          </div>
        ) : user ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)] lg:gap-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl sm:p-6 lg:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-300 text-lg font-bold text-slate-950 shadow-lg shadow-sky-500/20 sm:h-20 sm:w-20 sm:text-xl lg:h-24 lg:w-24 lg:rounded-3xl lg:text-2xl">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(user.name)
                      )}
                    </div>
                    {/* <div className="absolute -bottom-2 -right-2 rounded-full border border-slate-900 bg-emerald-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-950 shadow-lg shadow-emerald-500/20">
                      Active
                    </div> */}
                  </div>

                  <div className="min-w-0 space-y-2">
                    <div>
                      <h2 className="truncate text-2xl font-semibold text-white sm:text-3xl">
                        {user.name}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-300 sm:gap-3">
                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5">
                          <Mail className="h-4 w-4 text-sky-300" />
                          <span className="truncate">{user.email}</span>
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5">
                          <UserCircle2 className="h-4 w-4 text-emerald-300" />
                          {user.role === "admin" ? "Administrator" : "Customer"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Account status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Secure
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Session-based authentication is active.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Created on
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {formatDate(user.createdAt)}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {user.createdAt
                      ? "Your original registration date."
                      : "No creation date returned by the API."}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Current role
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {user.role === "admin" ? "Admin access" : "User access"}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Permission level controls the dashboard experience.
                  </p>
                </div>
              </div> */}
            </section>

            <aside className="space-y-5 sm:space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl sm:p-6">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Timezone aware
                  </p>
                  <p className="mt-2 text-sm font-medium text-white sm:text-base">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date())}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  );
}
