"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-gray-900 selection:bg-green-200">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        .input-focus:focus {
          outline: none;
          border-color: #15803d;
          box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.08);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .delay-1 { animation-delay: 0.08s; opacity: 0; }
        .delay-2 { animation-delay: 0.16s; opacity: 0; }
        .delay-3 { animation-delay: 0.24s; opacity: 0; }
      `}</style>

      <div className="min-h-screen flex">
        {/* Left — Branding Panel */}
        <div className="hidden lg:flex lg:w-[45%] grain bg-green-700 relative flex-col justify-between p-12 xl:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.04] rounded-full translate-y-1/4 -translate-x-1/4" />

          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-20">
              <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold tracking-tight">R</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-body">Replate</span>
            </Link>

            <h2 className="font-serif text-[2.5rem] xl:text-[3rem] leading-[1.08] text-white mb-5">
              Welcome<br />back.
            </h2>
            <p className="font-body text-green-200/60 text-sm leading-relaxed max-w-sm">
              Your dashboard is waiting. Pick up right where you left off — your waste data, donations, and forecasts are all up to date.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { val: "2,400+", label: "restaurants on Replate" },
              { val: "1.2M", label: "meals redistributed" },
              { val: "$8.3M", label: "saved by partners this year" },
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-3">
                <span className="font-serif text-xl text-white">{stat.val}</span>
                <span className="font-body text-xs text-green-200/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2.5 mb-10 animate-fade-up">
              <div className="w-9 h-9 bg-green-700 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold tracking-tight">R</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 font-body">Replate</span>
            </div>

            <div className="animate-fade-up">
              <h1 className="font-serif text-[2rem] md:text-[2.25rem] leading-tight text-gray-900 mb-2">
                Log in to Replate
              </h1>
              <p className="font-body text-gray-400 text-sm mb-8">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-fade-up delay-1">
                <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@restaurant.com"
                  className="input-focus font-body w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition-all duration-200"
                  required
                />
              </div>

              <div className="animate-fade-up delay-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="font-body text-xs text-green-700 hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-focus font-body w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-300 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition text-xs font-body font-semibold"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="animate-fade-up delay-3 pt-2">
                <button
                  type="submit"
                  className="font-body w-full bg-green-700 text-white py-3.5 rounded-lg text-sm font-bold hover:bg-green-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="animate-fade-up delay-3 flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-body text-xs text-gray-300">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social logins */}
            <div className="animate-fade-up delay-3 flex gap-3">
              <button className="font-body flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="font-body flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.04-.39-.04-.59 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.21.06.43.06.66zm4.565 17.7c-.413.96-1.005 1.86-1.705 2.58-.797.82-1.62 1.29-2.654 1.29-1.03 0-1.78-.62-2.94-.62s-1.97.62-2.93.66c-.96.03-1.74-.52-2.63-1.37C6.02 19.58 4.56 16.18 4.56 12.52c0-3.67 2.38-5.52 4.51-5.58 1.12-.03 2.13.73 2.85.73.71 0 1.93-.87 3.39-.76.46.02 2.07.18 3.13 1.51-.1.06-1.94 1.15-1.94 3.33 0 2.66 2.3 3.56 2.37 3.58-.02.08-.37 1.32-1.27 2.6z"/>
                </svg>
                Apple
              </button>
            </div>

            <p className="animate-fade-up delay-3 font-body text-center text-sm text-gray-400 mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/onboarding" className="text-green-700 font-semibold hover:underline">
                Get Started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}