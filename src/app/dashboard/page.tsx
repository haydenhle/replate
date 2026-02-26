"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

// ── All data lives here. Replace with API calls when backend is ready. ──

interface SurplusItem {
  item: string;
  prepped: number;
  sold: number;
}

interface Donation {
  org: string;
  items: string;
  time: string;
  status: string;
}

interface WasteDay {
  day: string;
  val: number;
}

interface Forecast {
  title: string;
  description: string;
  type: "warning" | "positive" | "neutral";
}

function useDashboardData() {
  // Top-level stats 
  const stats = {
    foodSaved: 0,          // lbs
    mealsProvided: 0,       // count
    co2Reduced: 0,          // kg
  };

  // Sustainability score 
  const sustainability = {
    score: 0,               // out of 100???
    changeFromLastMonth: 0, // +/- points
  };

  // Week-over-week waste change 
  const weeklyChange = 0;   // percentage, negative = improvement (LMK if u agree)

  // Today's surplus items 
  const surplusItems: SurplusItem[] = [];

  // Recent donations 
  const donations: Donation[] = [];

  // Weekly waste data
  const weeklyWaste: WasteDay[] = [
    { day: "Mon", val: 0 },
    { day: "Tue", val: 0 },
    { day: "Wed", val: 0 },
    { day: "Thu", val: 0 },
    { day: "Fri", val: 0 },
    { day: "Sat", val: 0 },
    { day: "Sun", val: 0 },
  ];

  // AI forecasts 
  const forecasts: Forecast[] = [];

  return { stats, sustainability, weeklyChange, surplusItems, donations, weeklyWaste, forecasts };
}

// ── Helpers ──

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function getSurplusPct(item: SurplusItem): number {
  if (item.prepped === 0) return 0;
  return Math.round((item.sold / item.prepped) * 100);
}

function getSurplus(item: SurplusItem): number {
  return item.prepped - item.sold;
}

function getBarColor(val: number, max: number): string {
  if (max === 0) return "#d1d5db";
  const pct = val / max;
  if (pct <= 0.5) return "#15803d";
  if (pct <= 0.75) return "#d97706";
  return "#dc2626";
}

function getProgressColor(pct: number): string {
  if (pct >= 85) return "#15803d";
  if (pct >= 75) return "#d97706";
  return "#dc2626";
}

// ── Component ──

export default function Dashboard() {
  const router = useRouter();
  const { stats, sustainability, weeklyChange, surplusItems, donations, weeklyWaste, forecasts } = useDashboardData();

  useEffect(() => {
    // TODO: Re-enable when Firebase auth is wired up
    // const devBypass = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";
    // if (!devBypass && !auth?.currentUser) {
    //   router.push("/login");
    // }
  }, [router]);

  const maxWaste = Math.max(...weeklyWaste.map((d) => d.val), 1);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-gray-900 selection:bg-green-200">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.1); }
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .delay-1 { animation-delay: 0.06s; opacity: 0; }
        .delay-2 { animation-delay: 0.12s; opacity: 0; }
        .delay-3 { animation-delay: 0.18s; opacity: 0; }
        .delay-4 { animation-delay: 0.24s; opacity: 0; }
        .delay-5 { animation-delay: 0.30s; opacity: 0; }
        .delay-6 { animation-delay: 0.36s; opacity: 0; }
        .delay-7 { animation-delay: 0.42s; opacity: 0; }
        .delay-8 { animation-delay: 0.48s; opacity: 0; }
        .tab-active {
          color: #15803d;
          position: relative;
        }
        .tab-active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 2px;
          background: #15803d;
          border-radius: 1px;
        }
        .progress-bar {
          transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>



      {/* Hero Banner */}
      <section className="animate-fade-up relative overflow-hidden">
        <div className="grain bg-green-700 relative">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute top-4 left-[10%] w-32 h-32 border border-white rounded-full" />
            <div className="absolute top-8 right-[15%] w-20 h-20 border border-white rounded-full" />
            <div className="absolute bottom-4 left-[30%] w-24 h-24 border border-white rounded-full" />
            <div className="absolute top-2 left-[50%] w-16 h-16 border border-white rounded-full" />
            <div className="absolute bottom-6 right-[25%] w-28 h-28 border border-white rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16 relative z-10 text-center">
            <h1 className="font-serif text-[1.75rem] md:text-[2.25rem] leading-tight text-white mb-3">
              Cut Food Waste. Save Money. Feed Communities.
            </h1>
            <p className="font-body text-green-200/60 text-sm md:text-[15px] mb-6 max-w-lg mx-auto">
              AI-powered waste prediction &amp; redistribution for restaurants
            </p>
            <Link
              href="#"
              className="font-body inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-white/20 transition-all duration-300"
            >
              For Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 -mt-6 relative z-20">
        <div className="animate-fade-up delay-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <p className="font-body text-gray-400 text-xs font-bold uppercase tracking-widest mb-5 text-center">
            Your Impact
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                value: formatNumber(stats.foodSaved),
                label: "Food Saved",
                sublabel: "lbs this month",
                icon: (
                  <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                ),
                color: "bg-green-50",
              },
              {
                value: formatNumber(stats.mealsProvided),
                label: "Meals Provided",
                sublabel: "to local shelters",
                icon: (
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                ),
                color: "bg-amber-50",
              },
              {
                value: formatNumber(stats.co2Reduced),
                label: "CO₂ Emissions Reduced",
                sublabel: "kg offset",
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                ),
                color: "bg-emerald-50",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`animate-fade-up delay-${i + 2} hover-lift bg-[#f8f7f4] rounded-xl p-5 flex flex-col items-center text-center cursor-default`}
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <p className="font-serif text-2xl md:text-[1.75rem] text-gray-900">{stat.value}</p>
                <p className="font-body text-sm font-semibold text-gray-600 mt-0.5">{stat.label}</p>
                <p className="font-body text-xs text-gray-400">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-4">

          {/* Today's Surplus */}
          <div className="animate-fade-up delay-4 md:col-span-2 bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-body text-sm font-bold text-gray-900">Today&apos;s Surplus</h3>
                <p className="font-body text-xs text-gray-400 mt-0.5">Real-time waste tracking</p>
              </div>
              {weeklyChange !== 0 && (
                <span className={`font-body text-xs px-3 py-1 rounded-full font-semibold ${
                  weeklyChange < 0
                    ? "text-green-700 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}>
                  {weeklyChange < 0 ? "↓" : "↑"} {Math.abs(weeklyChange)}% vs last week
                </span>
              )}
            </div>

            {surplusItems.length > 0 ? (
              <div className="space-y-4">
                {surplusItems.map((row, i) => {
                  const pct = getSurplusPct(row);
                  const surplus = getSurplus(row);
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <p className="font-body text-sm text-gray-700 w-44 truncate">{row.item}</p>
                      <div className="flex-1">
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="progress-bar h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: getProgressColor(pct),
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-32 justify-end">
                        <span className="font-body text-xs text-gray-400">{row.sold}/{row.prepped}</span>
                        <span className={`font-body text-xs font-semibold px-2 py-0.5 rounded ${
                          surplus <= 15 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                        }`}>
                          {surplus} left
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                </div>
                <p className="font-body text-sm text-gray-400">No surplus data yet</p>
                <p className="font-body text-xs text-gray-300 mt-1">Log today&apos;s prep to start tracking</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="animate-fade-up delay-5 space-y-4">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-body text-sm font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Log Today's Prep", icon: "📝", desc: "Record production" },
                  { label: "View Donations", icon: "🤝", desc: "Track redistribution" },
                  { label: "Get Forecast", icon: "📊", desc: "Tomorrow's prediction" },
                  { label: "Export Report", icon: "📄", desc: "Download PDF" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 bg-[#f8f7f4] hover:bg-gray-100 rounded-lg px-4 py-3 transition-all duration-200 text-left group"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <div>
                      <p className="font-body text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{action.label}</p>
                      <p className="font-body text-xs text-gray-400">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sustainability Score */}
            <div className="grain bg-green-700 rounded-xl p-6 text-white">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-green-300 mb-2">Your Score</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-serif text-4xl leading-none">{sustainability.score}</span>
                <span className="font-body text-sm text-green-200/60 mb-1">/100</span>
              </div>
              <p className="font-body text-xs text-green-200/50 mb-3">Sustainability Rating</p>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="progress-bar h-full bg-green-300 rounded-full" style={{ width: `${sustainability.score}%` }} />
              </div>
              {sustainability.changeFromLastMonth !== 0 && (
                <p className="font-body text-xs text-green-200/40 mt-2">
                  {sustainability.changeFromLastMonth > 0 ? "+" : ""}{sustainability.changeFromLastMonth} points from last month
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-3 gap-4 mt-4">

          {/* Recent Donations */}
          <div className="animate-fade-up delay-6 bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-body text-sm font-bold text-gray-900">Recent Donations</h3>
              {donations.length > 0 && (
                <a href="#" className="font-body text-xs text-green-700 font-semibold hover:underline">View All</a>
              )}
            </div>
            {donations.length > 0 ? (
              <div className="space-y-3">
                {donations.map((donation, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-green-700 text-xs font-bold">{donation.org.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-gray-900 truncate">{donation.org}</p>
                      <p className="font-body text-xs text-gray-400 truncate">{donation.items}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-body text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium">{donation.status}</span>
                      <p className="font-body text-xs text-gray-300 mt-1">{donation.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-gray-300 text-lg">🤝</span>
                </div>
                <p className="font-body text-sm text-gray-400">No donations yet</p>
                <p className="font-body text-xs text-gray-300 mt-1">Surplus will be matched automatically</p>
              </div>
            )}
          </div>

          {/* Weekly Waste Trend */}
          <div className="animate-fade-up delay-7 bg-white border border-gray-100 rounded-xl p-6">
            <h3 className="font-body text-sm font-bold text-gray-900 mb-1">Weekly Waste Trend</h3>
            <p className="font-body text-xs text-gray-400 mb-5">Last 7 days (lbs wasted)</p>
            <div className="flex items-end gap-2 h-32">
              {weeklyWaste.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full bg-gray-100 rounded-md overflow-hidden flex flex-col justify-end" style={{ height: "100px" }}>
                    {d.val > 0 && (
                      <div
                        className="w-full rounded-md transition-all duration-700"
                        style={{
                          height: `${(d.val / maxWaste) * 100}%`,
                          backgroundColor: getBarColor(d.val, maxWaste),
                          opacity: 0.75,
                        }}
                      />
                    )}
                  </div>
                  <span className="font-body text-[10px] text-gray-400">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Forecast */}
          <div className="animate-fade-up delay-8 bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-amber-50 rounded-md flex items-center justify-center">
                <span className="text-xs">🧠</span>
              </div>
              <h3 className="font-body text-sm font-bold text-gray-900">AI Forecast</h3>
            </div>
            {forecasts.length > 0 ? (
              <div className="space-y-3">
                {forecasts.map((f, i) => {
                  const styles = {
                    warning: "bg-amber-50/50 border-amber-100 text-amber-700",
                    positive: "bg-green-50/50 border-green-100 text-green-700",
                    neutral: "bg-gray-50 border-gray-100 text-gray-600",
                  };
                  const descStyles = {
                    warning: "text-amber-600/70",
                    positive: "text-green-600/70",
                    neutral: "text-gray-400",
                  };
                  return (
                    <div key={i} className={`border rounded-lg px-4 py-3 ${styles[f.type]}`}>
                      <p className="font-body text-xs font-semibold">{f.title}</p>
                      <p className={`font-body text-xs mt-1 leading-relaxed ${descStyles[f.type]}`}>
                        {f.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-gray-300 text-lg">🧠</span>
                </div>
                <p className="font-body text-sm text-gray-400">No forecasts yet</p>
                <p className="font-body text-xs text-gray-300 mt-1">Log a few days of data to unlock predictions</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 text-xs font-body px-5 md:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-700 rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">R</span>
            </div>
            <span className="font-semibold text-gray-400">Replate Dashboard</span>
          </div>
          <p className="text-gray-400">© 2026 Replate. Reducing waste, restoring value.</p>
        </div>
      </footer>
    </main>
  );
}