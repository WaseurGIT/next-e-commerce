"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            The LUXURA Journal
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">
            Subscribe to receive exclusive early access to new collections and
            private event invitations.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#005AC2] focus:border-transparent placeholder-gray-500 text-sm sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-black text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-r-lg transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              Join Now
            </button>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm sm:text-base text-center">
              Thank you for subscribing! Check your email for exclusive offers.
            </div>
          )}
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-600 px-2">
          By subscribing, you agree to our{" "}
          <a href="#" className="text-[#005AC2] hover:underline font-medium">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#005AC2] hover:underline font-medium">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Subscribe;
