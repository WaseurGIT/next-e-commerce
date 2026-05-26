"use client";

import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";
import Swal from "sweetalert2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
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
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Logout failed. Try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex">
      <aside className="w-64 h-screen px-2">
        <div className="text-xl text-center py-12 font-bold">
          <h2> {user?.role === "admin" ? "Admin" : "User"} Dashboard</h2>
          <div className="flex items-center justify-center gap-3 pt-3">
            <img
              src="/images/fan_1.png"
              alt={user?.name}
              className="w-8 h-8 rounded-full mx-auto"
            />
            <div>
              <p className="text-sm font-semibold">
                Welcome <span className="text-blue-500">{user?.name}</span>
              </p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        <ul className="">
          <Link href="/" className="">
            <li className="p-2 rounded-md hover:text-blue-500 hover:underline">
              Home
            </li>
          </Link>
          <Link
            href={
              user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
            }
          >
            <li className="p-2 rounded-md hover:text-blue-500 hover:underline">
              Dashboard
            </li>
          </Link>
          {user?.role === "admin" && (
            <div>
              <Link href="/" className="">
                <li className="p-2 rounded-md hover:text-blue-500 hover:underline">
                  Add Product
                </li>
              </Link>
              <Link href="/" className="">
                <li className="p-2 rounded-md hover:text-blue-500 hover:underline">
                  All Users
                </li>
              </Link>
            </div>
          )}

          <button
            onClick={handleLogOut}
            className="w-full  mt-12 cursor-pointer text-sm font-medium border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition-colors text-center"
          >
            Logout
          </button>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 min-h-screen p-6">{children}</main>
    </div>
  );
}
