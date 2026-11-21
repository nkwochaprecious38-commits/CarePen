import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import { Bell, Search } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  noStore();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, specialty")
    .eq("id", user?.id ?? "")
    .single();

  const initials = profile
    ? `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase()
    : "DR";
  const displayName = profile?.first_name
    ? `Dr. ${profile.first_name} ${profile.last_name ?? ""}`.trim()
    : "Dr. Demo";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F7FA" }}>
      <Sidebar displayName={displayName} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 1px 4px rgba(16,35,63,.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, maxWidth: 360 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={15} color="#9CA3AF" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input type="text" placeholder="Search patients, notes..."
                style={{ width: "100%", paddingLeft: 36, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#374151", background: "#F4F7FA", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ position: "relative", width: 36, height: 36, borderRadius: 8, background: "#F4F7FA", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={16} color="#64748B" />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1769E8,#16B8A6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 800 }}>{initials}</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#10233F", lineHeight: 1.2, fontFamily: "var(--font-manrope,'Manrope',sans-serif)" }}>{displayName}</p>
                <p style={{ fontSize: 11, color: "#64748B", fontFamily: "var(--font-inter,'Inter',sans-serif)" }}>{profile?.specialty ?? "Physician"}</p>
              </div>
            </div>
          </div>
        </header>
        <main style={{ flex: 1, padding: 24, overflow: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
