"use client";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";
import { SlBag } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import { useAuth } from "@/app/auth/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="w-full h-16 fixed z-20 top-0 text-black bg-white shadow-md">
      <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section*/}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose className="text-gray-700 text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-gray-700 text-2xl" />
            )}
          </button>

          <Link
            className="text-xl sm:text-2xl font-bold flex-shrink-0"
            href="/"
          >
            LUXURA
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center">
          <div className="hidden md:flex relative items-center">
            <CiSearch className="text-gray-500 absolute left-3 text-xl" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-40"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CiSearch className="text-gray-700 text-xl" />
          </button>

          {user ? (
            <>
              <Link
                href={
                  user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
                }
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                title={`Welcome, ${user.name}`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <LiaUserSolid className="text-orange-700 text-lg sm:text-xl" />
                </div>
              </Link>

              <Link
                href="/pages/CartPage"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative flex items-center justify-center"
              >
                <SlBag className="text-gray-700 text-lg sm:text-xl" />
              </Link>

              <button
                onClick={async () => {
                  await logout();
                  Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have been successfully logged out.",
                    confirmButtonColor: "#3b82f6",
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
                title="Logout"
              >
                <RiLogoutBoxLine className="text-gray-700 text-lg sm:text-xl" />
              </button>
            </>
          ) : (
            <Link
              href="/pages/Login"
              className="hidden sm:block text-sm font-medium border ml-2 border-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <div className="md:hidden border-t px-4 py-3 bg-gray-50">
          <div className="relative flex items-center">
            <CiSearch className="text-gray-500 absolute left-3 text-xl" />
            <input
              type="text"
              placeholder="Search products..."
              autoFocus
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {!user ? (
              <Link
                href="/pages/Login"
                className="block text-sm font-medium border border-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors text-center mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={async () => {
                  await logout();
                  setIsMobileMenuOpen(false);
                  Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have been successfully logged out.",
                    confirmButtonColor: "#3b82f6",
                  });
                }}
                className="w-full text-sm font-medium border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition-colors text-center"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
