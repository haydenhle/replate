"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide navbar on auth/onboarding pages
  const hideNavbar =
    pathname === "/login" ||
    pathname === "/onboarding";
  if (hideNavbar) return null;

  const isHome = pathname === "/";
  const isAppPage = pathname.startsWith("/dashboard");

  const handleDashboardClick = () => {
    const devBypass = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
    if (!devBypass && !auth?.currentUser) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  const linkClass = (active: boolean) =>
    `text-[13px] font-medium transition-colors duration-200 ${
      active
        ? "text-green-700 font-semibold"
        : "text-gray-400 hover:text-gray-900"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50"
         style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center justify-between px-5 md:px-10 py-4 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-green-700 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">R</span>
          </div>
          <span className="text-base font-bold tracking-tight text-gray-900">Replate</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && (
            <>
              <a href="#problem" className={linkClass(false)}>Problem</a>
              <a href="#approach" className={linkClass(false)}>Approach</a>
              <a href="#how" className={linkClass(false)}>How It Works</a>
              <a href="#impact" className={linkClass(false)}>Impact</a>
            </>
          )}

          {isAppPage && (
            <>
              <Link href="/dashboard" className={linkClass(pathname === "/dashboard")}>
                Overview
              </Link>
              <Link href="/dashboard/log-waste" className={linkClass(pathname === "/dashboard/log-waste")}>
                Log Waste
              </Link>
              <Link href="/dashboard/donations" className={linkClass(pathname === "/dashboard/donations")}>
                Donations
              </Link>
              <Link href="/dashboard/sustainability" className={linkClass(pathname === "/dashboard/sustainability")}>
                Sustainability
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isHome && (
            <Link
              href="/onboarding"
              className="text-[13px] text-gray-400 font-medium hover:text-gray-900 transition"
            >
              Get Started
            </Link>
          )}

          {isAppPage && (
            <button className="relative text-gray-400 hover:text-gray-600 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
          )}

          <button
            onClick={handleDashboardClick}
            className="bg-green-700 text-white px-5 py-2 rounded-md text-[13px] font-semibold hover:bg-green-800 transition-all duration-200"
          >
            {auth?.currentUser ? "Dashboard" : "Log In"}
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-gray-400 ml-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
}