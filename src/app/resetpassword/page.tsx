"use client";
import { useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (!email.includes("@")) {
      setMsg("Please enter a valid email.");
      return;
    }

    // prototype behavior:
    setMsg("If an account exists for this email, a reset link would be sent.");
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Reset password</h1>
        <p className="text-sm text-gray-600 mb-6">Enter your email to receive a reset link.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@restaurant.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-3"
          />
          <button className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold">
            Send reset link
          </button>
        </form>

        {msg && <p className="text-sm text-gray-700 mt-4">{msg}</p>}

        <p className="text-sm text-gray-500 mt-6">
          <Link href="/login" className="text-green-700 font-semibold hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}