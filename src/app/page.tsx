"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-gray-900 overflow-x-hidden selection:bg-green-200">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.08); }
        .hover-shift { transition: all 0.3s ease; }
        .hover-shift:hover { transform: translateX(4px); }
        .grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); }
      `}</style>

      {/* Nav */}
      <nav className="font-body flex items-center justify-between px-5 md:px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-green-700 rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-bold tracking-tight">R</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">Replate</span>
        </div>
        <div className="hidden md:flex items-center gap-9 text-[13px] text-gray-500 font-medium">
          <a href="#problem" className="hover:text-gray-900 transition">Problem</a>
          <a href="#approach" className="hover:text-gray-900 transition">Approach</a>
          <a href="#how" className="hover:text-gray-900 transition">How It Works</a>
          <a href="#impact" className="hover:text-gray-900 transition">Impact</a>
        </div>
        <Link href="/onboarding" className="font-body bg-gray-900 text-white text-[13px] px-5 py-2.5 rounded-md font-semibold hover:bg-gray-800 transition">
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-5 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-3">
            <p className="font-body text-green-700 text-sm font-semibold tracking-wide mb-5">
              The #3 contributor to global greenhouse emissions is food waste.
            </p>
            <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.05] tracking-tight text-gray-900 mb-6">
              Your buffet throws away<br className="hidden md:block" /> more than it serves.
            </h1>
            <p className="font-body text-gray-500 text-base md:text-[17px] leading-relaxed max-w-lg mb-10">
              Replate predicts surplus before it happens, routes excess to shelters and food banks, and turns your biggest cost into a competitive edge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/onboarding" className="font-body bg-green-700 text-white px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-green-800 transition text-center">
                Start Reducing Waste
              </Link>
              <a href="#how" className="font-body border border-gray-300 text-gray-700 px-7 py-3.5 rounded-md text-sm font-semibold hover:border-gray-400 transition text-center">
                How It Works
              </a>
            </div>
          </div>

          {/* Stats stack */}
          <div className="lg:col-span-2 space-y-3">
            {[
              { val: "30–50%", label: "of buffet food discarded daily", accent: "border-l-red-400" },
              { val: "$218B", label: "lost to food waste in the US per year", accent: "border-l-amber-400" },
              { val: "3–5%", label: "average restaurant profit margin", accent: "border-l-green-600" },
              { val: "10%", label: "of global emissions from food waste", accent: "border-l-gray-400" },
            ].map((s, i) => (
              <div key={i} className={`hover-lift bg-white border border-gray-100 ${s.accent} border-l-[3px] rounded-lg px-5 py-4 cursor-default`}>
                <p className="font-serif text-2xl text-gray-900">{s.val}</p>
                <p className="font-body text-sm text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-5 md:px-10"><div className="border-t border-gray-200" /></div>

      {/* Problem */}
      <section id="problem" className="px-5 md:px-10 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="font-body text-red-500 text-xs font-bold uppercase tracking-widest mb-3">The Problem</p>
            <h2 className="font-serif text-3xl md:text-[2.5rem] leading-tight mb-5">
              Current solutions<br />move waste around.<br />They don&apos;t stop it.
            </h2>
            <p className="font-body text-gray-400 text-sm leading-relaxed max-w-md">
              Apps like Too Good To Go sell mystery bags at closing time. That&apos;s reactive. The real issue is predictable — restaurants know by 2pm they over-prepped Tuesday&apos;s soup, or that rain means half the reservations will no-show.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Mystery bags sold to individuals — can't solve bulk surplus",
              "No demand forecasting — same overproduction repeats weekly",
              "No distinction between buffet line waste and plate waste",
              "Restaurants need shelters, food banks, and commercial partners — not one-off buyers",
            ].map((point, i) => (
              <div key={i} className="hover-shift font-body flex gap-3 items-start bg-white border border-gray-100 rounded-lg px-5 py-4 cursor-default">
                <span className="text-red-400 text-xs mt-1">✕</span>
                <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="grain bg-green-700 text-white px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <p className="font-body text-green-300 text-xs font-bold uppercase tracking-widest mb-3">Our Approach</p>
            <h2 className="font-serif text-3xl md:text-[2.5rem] leading-tight mb-5">
              Remove future waste,<br />not just move leftovers.
            </h2>
            <p className="font-body text-green-200/70 text-sm leading-relaxed max-w-md">
              We&apos;re giving struggling restaurants a new revenue stream — selling surplus cheaply beats throwing it away — and a marketing advantage. A sustainability score attracts the consumers who care.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Forecast demand", desc: "Analyze patterns by weather, day, season, and menu item to prep smarter." },
              { label: "Bulk redistribution", desc: "Match surplus with shelters, food banks, nearby restaurants, and catering ops." },
              { label: "Smart waste sorting", desc: "Buffet line surplus → donate. Plate waste → compost. Nothing to landfill." },
              { label: "Sustainability as brand", desc: "Track CO₂ saved, meals donated, waste diverted. Make it your edge." },
            ].map((item, i) => (
              <div key={i} className="hover-shift flex gap-4 items-start bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-lg px-5 py-4 cursor-default">
                <span className="text-green-300 text-xs mt-1 font-bold">✓</span>
                <div>
                  <p className="font-body text-sm font-semibold text-white">{item.label}</p>
                  <p className="font-body text-sm text-green-200/60 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="px-5 md:px-10 py-16 md:py-24 max-w-7xl mx-auto">
        <p className="font-body text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Process</p>
        <h2 className="font-serif text-3xl md:text-[2.5rem] leading-tight mb-12 md:mb-16">Four steps to zero waste.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "01", title: "Log", desc: "Staff logs daily production and end-of-day waste through a dead-simple dashboard. Takes 2 minutes." },
            { num: "02", title: "Analyze", desc: "Replate spots patterns you can't see — which items waste most, which days spike, what weather does to demand." },
            { num: "03", title: "Redistribute", desc: "Surplus gets matched to the right destination automatically. Shelters for bulk. Compost for plate waste." },
            { num: "04", title: "Improve", desc: "Prep recommendations get sharper every week. Waste drops. Margins grow. Your sustainability score goes up." },
          ].map((step, i) => (
            <div key={i} className="hover-lift group bg-white border border-gray-100 rounded-xl p-6 cursor-default">
              <span className="font-serif text-4xl text-gray-200 group-hover:text-green-600 transition-colors duration-300">{step.num}</span>
              <h3 className="font-body text-base font-bold text-gray-900 mt-4 mb-2">{step.title}</h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="bg-[#111] text-white px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-5">
            <div className="md:col-span-1">
              <p className="font-body text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Impact</p>
              <h2 className="font-serif text-3xl md:text-[2.5rem] leading-tight">
                Not charity.<br />Better business.
              </h2>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              {[
                { icon: "💰", title: "Revenue from surplus", desc: "Food you'd throw away becomes income. Sell it cheaply to partners instead of paying for disposal." },
                { icon: "📉", title: "Lower food costs", desc: "Smarter forecasting means buying and prepping less. Margins grow on that razor-thin 3–5%." },
                { icon: "🤝", title: "Community trust", desc: "Feed people who need it. Partner with local shelters. Build real goodwill, not greenwashing." },
                { icon: "🌱", title: "Measurable impact", desc: "Real-time CO₂ tracking, meals donated count, waste diverted metrics. Numbers you can put on your wall." },
              ].map((card, i) => (
                <div key={i} className="hover-lift bg-white/[0.05] border border-white/[0.08] rounded-xl p-6 cursor-default">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="font-body text-sm font-bold text-white mt-3 mb-1.5">{card.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain bg-green-700 text-white px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-[2.75rem] leading-tight mb-4">
            Your waste has a pattern.<br />Let&apos;s break it.
          </h2>
          <p className="font-body text-green-200/70 text-sm md:text-base mb-10 max-w-lg mx-auto">
            Join Replate and turn your restaurant&apos;s biggest cost into revenue, community impact, and a brand people trust.
          </p>
          <Link href="/onboarding" className="font-body inline-block bg-white text-green-800 px-9 py-4 rounded-md text-sm font-bold hover:bg-green-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-gray-600 text-xs font-body px-5 md:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-700 rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">R</span>
            </div>
            <span className="font-semibold text-gray-500">Replate</span>
          </div>
          <p className="text-gray-600">© 2026 Replate. Reducing waste, restoring value.</p>
        </div>
      </footer>
    </main>
  );
}