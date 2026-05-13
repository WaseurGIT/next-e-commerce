"use client";

import { useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { TbBrightness2 } from "react-icons/tb";
import { FaGlobeAmericas } from "react-icons/fa";
import { useAuth } from "@/app/auth/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting...",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        confirmButtonColor: "#dc2626",
      });
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Main Container */}
      <div className="w-full h-full grid md:grid-cols-2 overflow-hidden">
        {/* Left - Image */}
        <div className="relative hidden md:flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-800 to-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl opacity-20"></div>
          <img
            src="/images/login.png"
            alt="Login"
            className="relative w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">LUXURA</h1>
              <p className="text-sm md:text-base text-[#ADC6FF] max-w-xs">
                The pinnacle of horological excellence and precision
                engineering.
              </p>
            </div>
          </div>
          <div className="absolute text-white px-6">
            <div className="fixed bottom-6 left-6">
              <div className="flex items-center gap-2 mb-2">
                <TbBrightness2 className="text-sm text-[#ADC6FF]" />
                <p className="text-xs text-[#ADC6FF]">
                  Guaranteed Authenticity
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobeAmericas className="text-sm text-[#ADC6FF]" />
                <p className="text-xs text-[#ADC6FF]">
                  Global Concierge Support
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex items-center justify-center bg-white px-6 py-10 md:px-10 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className=" mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Please enter your details to access your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
              </div>

              <div>
                <label className="text-gray-700 font-semibold text-sm">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-semibold text-sm">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  >
                    {showPassword ? (
                      <IoIosEye className="cursor-pointer" />
                    ) : (
                      <IoIosEyeOff className="cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end text-sm">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:scale-105 transition disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={() => console.log("Google login clicked")}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-all hover:bg-gray-50"
            >
              <FcGoogle className="text-2xl" />
              <span>Login with Google</span>
            </button>

            {/* Footer */}
            <p className="text-center text-gray-600 mt-6 text-sm">
              Don’t have an account?{" "}
              <Link href="/pages/Register" className="text-blue-600 font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
