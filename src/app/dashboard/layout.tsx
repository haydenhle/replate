import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#d8d1c7]">
      {/* Page Content */}
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}