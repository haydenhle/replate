"use client";
import Link from "next/link";
import { useState } from "react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    ownerName: "", email: "", phone: "",
    restaurantName: "", city: "", state: "",
    cuisineType: "", buffetStyle: "", avgDailyCovers: "",
    estimatedWastePercent: "", topWastedItems: "",
    currentWasteMethod: "", hasComposting: "", hasDonationPartner: "",
    goals: [] as string[], heardAboutUs: "", additionalNotes: "",
  });

  const set = (field: string, val: string) => setForm((p) => ({ ...p, [field]: val }));
  const flip = (g: string) => setForm((p) => ({
    ...p, goals: p.goals.includes(g) ? p.goals.filter((x) => x !== g) : [...p.goals, g],
  }));

  const inp = "w-full bg-transparent border border-gray-200 rounded-md px-4 py-3 text-sm font-body text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700/20 transition";
  const sel = "w-full bg-white border border-gray-200 rounded-md px-4 py-3 text-sm font-body text-gray-900 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700/20 transition appearance-none";

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-gray-900 selection:bg-green-200">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 md:px-10 py-6 md:py-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-20">

          {/* Left — sticky context */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-16">
              <h1 className="font-serif text-[2.5rem] leading-[1.1] mb-4">
                Get on Replate.
              </h1>
              <p className="font-body text-gray-400 text-[15px] leading-relaxed mb-12 max-w-[280px]">
                Three minutes. We&apos;ll build your dashboard from what you tell us here.
              </p>

              {/* Step indicator — minimal */}
              <div className="font-body text-sm space-y-4">
                {["You", "Restaurant", "Waste", "Goals"].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      step > i + 1 ? "bg-green-700" : step === i + 1 ? "bg-gray-900 scale-150" : "bg-gray-300"
                    }`} />
                    <span className={`transition-colors ${
                      step === i + 1 ? "text-gray-900 font-semibold" : step > i + 1 ? "text-green-700" : "text-gray-300"
                    }`}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Contextual hint that changes per step */}
              <div className="mt-14 border-l-2 border-gray-200 pl-4">
                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  {step === 1 && "We just need to know who we're talking to."}
                  {step === 2 && "Cuisine and buffet style affect waste patterns — this matters for forecasting."}
                  {step === 3 && "Don't stress about exact numbers. Rough estimates are enough to start."}
                  {step === 4 && "This shapes what your dashboard shows you first."}
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {/* Mobile header */}
            <div className="lg:hidden mb-6">
              <h1 className="font-serif text-[1.75rem] leading-tight mb-2">Get on Replate.</h1>
              <div className="flex items-center gap-3 mt-4 font-body text-xs text-gray-400">
                {["You", "Restaurant", "Waste", "Goals"].map((label, i) => (
                  <span key={i} className={step === i + 1 ? "text-gray-900 font-semibold" : step > i + 1 ? "text-green-700" : ""}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8">

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl">Who&apos;s setting this up?</h2>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Name</label>
                    <input type="text" value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} placeholder="Maria Santos" className={inp} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="maria@restaurant.com" className={inp} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(555) 123-4567" className={inp} />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-serif text-xl">Tell us about the restaurant.</h2>
                    <p className="font-body text-xs text-gray-400 mt-1">We use this to set up your waste categories and find nearby partners.</p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Restaurant name</label>
                    <input type="text" value={form.restaurantName} onChange={(e) => set("restaurantName", e.target.value)} placeholder="Golden Dragon Buffet" className={inp} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">City</label>
                      <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="San Jose" className={inp} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">State</label>
                      <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="CA" className={inp} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Cuisine</label>
                    <select value={form.cuisineType} onChange={(e) => set("cuisineType", e.target.value)} className={sel}>
                      <option value="">Pick one</option>
                      <option value="american">American</option>
                      <option value="chinese">Chinese</option>
                      <option value="indian">Indian</option>
                      <option value="japanese">Japanese</option>
                      <option value="korean">Korean</option>
                      <option value="mexican">Mexican</option>
                      <option value="italian">Italian</option>
                      <option value="mixed">Mixed / International</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Buffet style</label>
                      <select value={form.buffetStyle} onChange={(e) => set("buffetStyle", e.target.value)} className={sel}>
                        <option value="">Pick one</option>
                        <option value="ayce">All-You-Can-Eat</option>
                        <option value="brunch">Brunch</option>
                        <option value="lunch-dinner">Lunch &amp; Dinner</option>
                        <option value="catering">Catering / Events</option>
                        <option value="hotel">Hotel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Daily guests</label>
                      <input type="number" value={form.avgDailyCovers} onChange={(e) => set("avgDailyCovers", e.target.value)} placeholder="~200" className={inp} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-serif text-xl">Where are you at with waste?</h2>
                    <p className="font-body text-xs text-gray-400 mt-1">Ballpark is fine. We&apos;ll get precise once you start logging.</p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">How much food do you think gets tossed daily?</label>
                    <select value={form.estimatedWastePercent} onChange={(e) => set("estimatedWastePercent", e.target.value)} className={sel}>
                      <option value="">Take a guess</option>
                      <option value="under-10">Under 10%</option>
                      <option value="10-20">10–20%</option>
                      <option value="20-30">20–30%</option>
                      <option value="30-40">30–40%</option>
                      <option value="40-50">40–50%</option>
                      <option value="over-50">Over 50%</option>
                      <option value="unknown">Honestly no idea</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Items you waste the most</label>
                    <input type="text" value={form.topWastedItems} onChange={(e) => set("topWastedItems", e.target.value)} placeholder="rice, soup, the salad bar stuff" className={inp} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Where does waste go currently?</label>
                    <select value={form.currentWasteMethod} onChange={(e) => set("currentWasteMethod", e.target.value)} className={sel}>
                      <option value="">Select</option>
                      <option value="trash">Straight to trash</option>
                      <option value="some-composting">We compost some</option>
                      <option value="some-donations">We donate some</option>
                      <option value="mixed">Bit of everything</option>
                      <option value="unsure">Not really sure</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Composting?</label>
                      <select value={form.hasComposting} onChange={(e) => set("hasComposting", e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option value="yes">Yep</option>
                        <option value="no">Nope</option>
                        <option value="interested">Not yet, want to</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">Donation partner?</label>
                      <select value={form.hasDonationPartner} onChange={(e) => set("hasDonationPartner", e.target.value)} className={sel}>
                        <option value="">Select</option>
                        <option value="yes">Already have one</option>
                        <option value="no">No</option>
                        <option value="interested">Want one</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-xl">What matters most to you?</h2>
                  <div className="space-y-2">
                    {[
                      { v: "reduce-costs", l: "Spend less on food I'm throwing away" },
                      { v: "donate-surplus", l: "Get surplus to people who need it" },
                      { v: "forecast-demand", l: "Know how much to actually prep" },
                      { v: "composting", l: "Start or improve composting" },
                      { v: "sustainability-score", l: "Use sustainability as a selling point" },
                      { v: "compliance", l: "Stay ahead of waste regulations" },
                    ].map((g) => (
                      <button key={g.v} onClick={() => flip(g.v)}
                        className={`font-body w-full text-left px-4 py-3 rounded-md border text-sm transition-all duration-200 ${
                          form.goals.includes(g.v)
                            ? "border-green-700 bg-green-700/5 text-green-800 font-medium"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}>
                        {g.l}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[13px] font-body font-semibold text-gray-600 mb-1.5">How&apos;d you find us?</label>
                    <select value={form.heardAboutUs} onChange={(e) => set("heardAboutUs", e.target.value)} className={sel}>
                      <option value="">Select</option>
                      <option value="search">Googled it</option>
                      <option value="social">Social media</option>
                      <option value="referral">Another restaurant told me</option>
                      <option value="news">Article / news</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                </div>
              )}

              {/* Nav */}
              <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-100">
                {step > 1 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="font-body text-sm text-gray-400 hover:text-gray-700 font-medium transition">
                    ← Back
                  </button>
                ) : <div />}
                {step < 4 ? (
                  <button onClick={() => setStep((s) => s + 1)} className="font-body bg-gray-900 text-white px-7 py-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition">
                    Next
                  </button>
                ) : (
                  <button onClick={() => alert("Submitted! (Demo)")} className="font-body bg-green-700 text-white px-7 py-3 rounded-md text-sm font-semibold hover:bg-green-800 transition">
                    Build My Dashboard →
                  </button>
                )}
              </div>
            </div>

            <p className="font-body text-center text-[11px] text-gray-300 mt-5">
              We don&apos;t share your info. Ever.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}