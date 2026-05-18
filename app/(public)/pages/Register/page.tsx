"use client";

import { useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Link from "next/link";
import { useAuth } from "@/app/auth/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        return Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Passwords do not match",
        });
      }
      if (!agreeTerms) {
        return Swal.fire({
          icon: "warning",
          title: "Terms Required ⚠️",
          text: "You must agree to the terms & conditions",
        });
      }
      setIsLoading(true);

      const success = await register(fullName, email, password);
      // console.log("Registration success:", fullName, email, password, success);
      
      setIsLoading(false);
      if (success) {
        await Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Welcome to LUXURA!",
          timer: 1500,
          showConfirmButton: false,
        });

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAgreeTerms(false);

        router.push("/pages/Login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Email may already exist or something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        // text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6 py-10 mt-10 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center md:text-left">
            <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Join LUXURA for exclusive access to premium collections and
              personalized services.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors text-lg"
                >
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors text-lg"
                >
                  {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/pages/Login"
              className="text-blue-600 font-bold hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT - IMAGE */}
      <div className="hidden md:flex relative items-center justify-center overflow-hidden">
        <img
          src="/images/register.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white px-10 text-center">
          <h1 className="text-4xl font-bold mb-3">LUXURA</h1>
          <p className="text-gray-300 max-w-sm">
            Experience luxury like never before with premium watches crafted for
            perfection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
