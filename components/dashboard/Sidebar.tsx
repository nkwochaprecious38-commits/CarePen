"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Calendar, Mic, FileText, BookOpen,
  Wand2, LayoutTemplate, CheckSquare, ClipboardList, BarChart3,
  UserCog, Settings, PenLine, ChevronLeft, ChevronRight, LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Overview",             href: "/dashboard",             icon: LayoutDashboard },
  { label: "Patients",             href: "/patients",              icon: Users },
  { label: "Encounters",           href: "/encounters",            icon: Calendar },
  { label: "AI Scribe",            href: "/ai-scribe",             icon: Mic },
  { label: "Clinical Notes",       href: "/clinical-notes",        icon: FileText },
  { label: "Patient Summaries",    href: "/patient-summaries",     icon: BookOpen },
  { label: "Note Generators",      href: "/note-generators",       icon: Wand2 },
  { label: "Templates",            href: "/templates",             icon: LayoutTemplate },
  { label: "Review",               href: "/documentation-review",  icon: CheckSquare },
  { label: "Tasks",                href: "/tasks",                 icon: ClipboardList },
  { label: "Analytics",            href: "/analytics",             icon: BarChart3 },
  { label: "Team",                 href: "/team",                  icon: UserCog },
  { label: "Settings",             href: "/settings",              icon: Settings },
];

export default function Sidebar({ displayName }: { displayName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside style={{
      display: "flex", flexDirection: "column",
      background: "#10233F", borderRight: "1px solid rgba(255,255,255,.05)",
      width: collapsed ? 64 : 240, minHeight: "100vh",
      transition: "width .25s ease", position: "relative", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "20px 16px" : "20px 16px", borderBottom: "1px solid rgba(255,255,255,.05)", justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1769E8,#16B8A6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <PenLine size={15} color="#fff" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 800, fontSize: 17, color: "#fff" }}>
            Care<span style={{ color: "#67D5D0" }}>Pen</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8,
                background: isActive ? "rgba(23,105,232,.18)" : "transparent",
                color: isActive ? "#67D5D0" : "rgba(255,255,255,.45)",
                borderRight: isActive ? "2px solid #1769E8" : "2px solid transparent",
                textDecoration: "none", transition: "all .15s",
                justifyContent: collapsed ? "center" : "flex-start",
                fontFamily: "var(--font-manrope,'Manrope',sans-serif)",
                fontSize: 13, fontWeight: 500,
              }}>
              <Icon size={16} style={{ flexShrink: 0, color: isActive ? "#67D5D0" : "rgba(255,255,255,.45)" }} />
              {!collapsed && <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <button onClick={handleSignOut}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.35)", width: "100%", justifyContent: collapsed ? "center" : "flex-start", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 500, transition: "all .15s" }}>
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button onClick={() => setCollapsed(!collapsed)}
        style={{ position: "absolute", right: -12, top: 76, width: 24, height: 24, background: "#1769E8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(23,105,232,.4)", zIndex: 10 }}>
        {collapsed ? <ChevronRight size={12} color="#fff" /> : <ChevronLeft size={12} color="#fff" />}
      </button>
    </aside>
  );
}
