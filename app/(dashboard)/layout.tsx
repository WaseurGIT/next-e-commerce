"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      try {
        await logout();

        await Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          title: "Error",
          text: "Logout failed. Try again.",
          icon: "error",
        });
      }
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 lg:flex">
      <aside className="w-full border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-4 lg:py-8">
        <div className="flex items-center justify-between gap-4 lg:block">
          <div className="text-left font-bold lg:text-center">
            <h2 className="text-xl sm:text-2xl">
              {user?.role === "admin" ? "Admin" : "User"} Dashboard
            </h2>
            <div className="mt-4 flex items-center gap-3 lg:justify-start">
              <Image
                src="/images/fan_1.png"
                alt={user?.name ?? "User avatar"}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold sm:text-base">
                  Welcome <span className="text-blue-500">{user?.name}</span>
                </p>
                <p className="truncate text-xs text-gray-500 sm:text-sm">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
            aria-label="Toggle dashboard menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        <ul
          className={`mt-6 space-y-2 lg:mt-8 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}
        >
          <Link href="/" className="block" onClick={closeMobileMenu}>
            <li className="rounded-md p-3 text-sm transition-colors hover:bg-gray-100 hover:text-blue-500 sm:text-base">
              Home
            </li>
          </Link>
          <Link
            href={
              user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
            }
            className="block"
            onClick={closeMobileMenu}
          >
            <li className="rounded-md p-3 text-sm transition-colors hover:bg-gray-100 hover:text-blue-500 sm:text-base">
              Dashboard
            </li>
          </Link>
          {user?.role === "admin" && (
            <div className="space-y-2">
              <Link href="/admin/AddProduct" className="block" onClick={closeMobileMenu}>
                <li className="rounded-md p-3 text-sm transition-colors hover:bg-gray-100 hover:text-blue-500 sm:text-base">
                  Add Product
                </li>
              </Link>
              <Link href="/admin/AllUsers" className="block" onClick={closeMobileMenu}>
                <li className="rounded-md p-3 text-sm transition-colors hover:bg-gray-100 hover:text-blue-500 sm:text-base">
                  All Users
                </li>
              </Link>
            </div>
          )}

          <button
            onClick={handleLogOut}
            className="mt-8 w-full cursor-pointer rounded-full border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 sm:mt-10"
          >
            Logout
          </button>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen flex-1 bg-gray-100 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
