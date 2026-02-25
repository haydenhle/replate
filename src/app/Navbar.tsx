"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";
  const isAppPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/dashboard/sustainability") ||
    pathname.startsWith("/dashboard/log-waste") ||
    pathname.startsWith("/dashboard/donations");

  const handleDashboardClick = () => {
    if (!auth?.currentUser) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green-700 rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-bold tracking-tight">
              R
            </span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Replate
          </span>
        </Link>

        {/* CENTER NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          
          {/* Marketing Nav (Home Only) */}
          {isHome && (
            <>
              <a href="#problem" className="hover:text-gray-900 transition">
                Problem
              </a>
              <a href="#approach" className="hover:text-gray-900 transition">
                Approach
              </a>
              <a href="#how" className="hover:text-gray-900 transition">
                How It Works
              </a>
              <a href="#sustainability" className="hover:text-gray-900 transition">
                Sustainability
              </a>
            </>
          )}

          {/* App Nav (Dashboard + Product Pages) */}
          {isAppPage && (
            <>
              <Link href="/dashboard" className="hover:text-gray-900 transition">
                Dashboard
              </Link>
              <Link href="/dashboard/sustainability" className="hover:text-gray-900 transition">
                Sustainability Data
              </Link>
              <Link href="/dashboard/log-waste" className="hover:text-gray-900 transition">
                Waste Logging
              </Link>
              <Link href="/dashboard/donations" className="hover:text-gray-900 transition">
                Donations
              </Link>
            </>
          )}
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-4">
          {!auth?.currentUser && (
            <Link
              href="/onboarding"
              className="text-sm text-gray-500 hover:text-gray-900 transition"
            >
              Get Started
            </Link>
          )}

          <button
            onClick={handleDashboardClick}
            className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-800 transition"
          >
            {auth?.currentUser ? "Dashboard" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}