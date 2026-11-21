export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Users, Calendar, FileText, CheckCircle2, FileEdit, ClipboardList, TrendingUp, Stethoscope, Clock, Plus } from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

function statusStyle(status: string) {
  if (status === "complete")   return { bg: "rgba(22,184,166,.1)",  color: "#16B8A6" };
  if (status === "in_review")  return { bg: "rgba(245,158,11,.1)",  color: "#F59E0B" };
  if (status === "draft")      return { bg: "rgba(23,105,232,.08)", color: "#1769E8" };
  return { bg: "#F4F7FA", color: "#64748B" };
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const uid = user?.id ?? "";

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, specialty")
    .eq("id", uid)
    .single();

  const [
    { count: patientCount },
    { count: encounterCount },
    { count: noteDraftCount },
    { count: noteReviewCount },
    { count: noteCompleteCount },
    { data: recentEncounters },
  ] = await Promise.all([
    supabase.from("patients").select("*", { count: "exact", head: true }).eq("user_id", uid),
    supabase.from("encounters").select("*", { count: "exact", head: true }).eq("user_id", uid).eq("encounter_date", new Date().toISOString().split("T")[0]),
    supabase.from("notes").select("*", { count: "exact", head: true }).eq("user_id", uid).eq("status", "draft"),
    supabase.from("notes").select("*", { count: "exact", head: true }).eq("user_id", uid).eq("status", "in_review"),
    supabase.from("notes").select("*", { count: "exact", head: true }).eq("user_id", uid).eq("status", "approved"),
    supabase.from("encounters")
      .select("id, encounter_type, encounter_date, chief_complaint, status, patients(first_name, last_name)")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const firstName = profile?.first_name ?? "Doctor";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const stats = [
    { label: "Total Patients",    value: patientCount ?? 0,    icon: Users,       color: "#1769E8", bg: "rgba(23,105,232,.07)" },
    { label: "Today's Encounters", value: encounterCount ?? 0, icon: Calendar,    color: "#16B8A6", bg: "rgba(22,184,166,.07)" },
    { label: "Notes In Review",   value: noteReviewCount ?? 0,  icon: FileEdit,    color: "#F59E0B", bg: "rgba(245,158,11,.08)" },
    { label: "Approved Notes",    value: noteCompleteCount ?? 0, icon: CheckCircle2, color: "#16B8A6", bg: "rgba(22,184,166,.07)" },
    { label: "Draft Notes",       value: noteDraftCount ?? 0,  icon: FileText,    color: "#1769E8", bg: "rgba(23,105,232,.07)" },
    { label: "Encounters Total",  value: (patientCount ?? 0) > 0 ? "Active" : "0", icon: ClipboardList, color: "#8B5CF6", bg: "rgba(139,92,246,.07)" },
  ];

  const hasData = (patientCount ?? 0) > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <H tag="h1" style={{ fontSize: 22, fontWeight: 900, color: "#10233F" }}>{greeting}, {firstName}</H>
          <Txt style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{today}</Txt>
        </div>
        <Link href="/encounters/new" className="btn btn-blue" style={{ fontSize: 13, padding: "10px 18px" }}>
          <Plus size={15} /> New Encounter
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 }}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "18px 16px", border: "1px solid #E8EDF4", boxShadow: "0 1px 4px rgba(16,35,63,.04)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon size={16} color={s.color} />
              </div>
              <H tag="p" style={{ fontSize: 26, fontWeight: 900, color: "#10233F", lineHeight: 1 }}>{s.value}</H>
              <Txt style={{ fontSize: 11.5, color: "#64748B", marginTop: 4 }}>{s.label}</Txt>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Recent encounters */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDF4", boxShadow: "0 1px 4px rgba(16,35,63,.04)", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <H tag="h2" style={{ fontSize: 15, fontWeight: 800, color: "#10233F" }}>Recent Encounters</H>
            <Link href="/encounters" style={{ fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, color: "#1769E8", textDecoration: "none" }}>View all</Link>
          </div>
          {!hasData ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(23,105,232,.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Calendar size={22} color="#1769E8" />
              </div>
              <H tag="p" style={{ fontSize: 15, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>No encounters yet</H>
              <Txt style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>Add your first patient, then create an encounter to get started.</Txt>
              <Link href="/patients/new" className="btn btn-blue" style={{ fontSize: 13, padding: "9px 18px" }}>Add First Patient</Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                    {["Patient","Type","Date","Status",""].map((h) => (
                      <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94A3B8", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", letterSpacing: ".04em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(recentEncounters ?? []).map((enc: any) => {
                    const ss = statusStyle(enc.status);
                    const patient = enc.patients as any;
                    return (
                      <tr key={enc.id} style={{ borderBottom: "1px solid #F8FAFC" }}>
                        <td style={{ padding: "12px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(23,105,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Stethoscope size={13} color="#1769E8" />
                            </div>
                            <H tag="span" style={{ fontSize: 13, fontWeight: 700, color: "#10233F" }}>
                              {patient ? `${patient.first_name} ${patient.last_name}` : "Unknown"}
                            </H>
                          </div>
                        </td>
                        <td style={{ padding: "12px 20px" }}><Txt style={{ fontSize: 13, color: "#374151" }}>{enc.encounter_type}</Txt></td>
                        <td style={{ padding: "12px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <Clock size={12} color="#94A3B8" />
                            <Txt style={{ fontSize: 12, color: "#94A3B8" }}>{new Date(enc.encounter_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</Txt>
                          </div>
                        </td>
                        <td style={{ padding: "12px 20px" }}>
                          <span style={{ fontSize: 11.5, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, background: ss.bg, color: ss.color, padding: "3px 10px", borderRadius: 999 }}>
                            {enc.status.replace("_", " ")}
                          </span>
                        </td>
                        <td style={{ padding: "12px 20px" }}>
                          <Link href={`/encounters/${enc.id}`} style={{ fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, color: "#1769E8", textDecoration: "none" }}>View</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDF4", padding: "20px", boxShadow: "0 1px 4px rgba(16,35,63,.04)" }}>
            <H tag="h2" style={{ fontSize: 15, fontWeight: 800, color: "#10233F", marginBottom: 16 }}>Quick Actions</H>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Add New Patient",    href: "/patients/new",    color: "#1769E8", bg: "rgba(23,105,232,.07)" },
                { label: "New Encounter",      href: "/encounters/new",  color: "#16B8A6", bg: "rgba(22,184,166,.07)" },
                { label: "Review Notes",       href: "/documentation-review", color: "#F59E0B", bg: "rgba(245,158,11,.08)" },
                { label: "View All Patients",  href: "/patients",        color: "#8B5CF6", bg: "rgba(139,92,246,.07)" },
              ].map((a) => (
                <Link key={a.href} href={a.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: a.bg, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: a.color }}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg,#10233F,#0C1A2E)", borderRadius: 16, padding: "20px", border: "1px solid rgba(255,255,255,.07)" }}>
            <H tag="h3" style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Gemini AI Scribe</H>
            <Txt style={{ fontSize: 12.5, color: "rgba(255,255,255,.45)", lineHeight: 1.6, marginBottom: 16 }}>
              Connect your Gemini API key to enable AI-powered note generation from encounter recordings.
            </Txt>
            <Link href="/settings" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12.5, fontWeight: 700, color: "#67D5D0", textDecoration: "none" }}>
              Configure in Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
