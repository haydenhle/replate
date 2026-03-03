import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f8f7f4] min-h-screen">
  <div className="mx-auto max-w-6xl px-6 py-10">
    {children}
  </div>
</div>
  );
}