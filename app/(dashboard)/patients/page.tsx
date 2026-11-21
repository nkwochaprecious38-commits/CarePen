"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Users, Plus, Search, ChevronRight, User, Phone, Mail, Calendar, MoreHorizontal, X, AlertCircle } from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

type Patient = {
  id: string; first_name: string; last_name: string;
  date_of_birth: string | null; gender: string | null;
  phone: string | null; email: string | null; mrn: string | null;
  created_at: string;
};

const GENDERS = ["Male", "Female", "Non-binary", "Prefer not to say", "Other"];
const SPECIALTIES_LABEL: Record<string, string> = {};

function age(dob: string | null) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000)) + "y";
}

function initials(p: Patient) {
  return `${p.first_name[0] ?? ""}${p.last_name[0] ?? ""}`.toUpperCase();
}

const AVATAR_COLORS = ["#1769E8","#16B8A6","#8B5CF6","#F59E0B","#EF4444"];
function avatarColor(id: string) {
  return AVATAR_COLORS[id.charCodeAt(0) % AVATAR_COLORS.length];
}

export default function PatientsPage() {
  const supabase = createClient();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ first_name: "", last_name: "", date_of_birth: "", gender: "", phone: "", email: "", mrn: "" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("patients").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setPatients(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.first_name.toLowerCase().includes(q) ||
      p.last_name.toLowerCase().includes(q) ||
      (p.mrn ?? "").toLowerCase().includes(q) ||
      (p.email ?? "").toLowerCase().includes(q)
    );
  });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.first_name.trim() || !form.last_name.trim()) {
      setError("First name and last name are required.");
      return;
    }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error: err } = await supabase.from("patients").insert({
      user_id: user!.id,
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      mrn: form.mrn.trim() || null,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    setShowModal(false);
    setForm({ first_name: "", last_name: "", date_of_birth: "", gender: "", phone: "", email: "", mrn: "" });
    load();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <H tag="h1" style={{ fontSize: 22, fontWeight: 900, color: "#10233F" }}>Patients</H>
          <Txt style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{patients.length} patient{patients.length !== 1 ? "s" : ""} on record</Txt>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
          <Plus size={15} /> Add Patient
        </button>
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: 400 }}>
        <Search size={15} color="#9CA3AF" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, MRN, email..."
          style={{ width: "100%", paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 13, color: "#374151", background: "#fff", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDF4", boxShadow: "0 1px 4px rgba(16,35,63,.04)", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <Txt style={{ fontSize: 13, color: "#94A3B8" }}>Loading patients...</Txt>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(23,105,232,.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Users size={22} color="#1769E8" />
            </div>
            <H tag="p" style={{ fontSize: 15, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>
              {search ? "No patients match your search" : "No patients yet"}
            </H>
            <Txt style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
              {search ? "Try a different name or MRN." : "Add your first patient to get started."}
            </Txt>
            {!search && (
              <button onClick={() => setShowModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                <Plus size={15} /> Add First Patient
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {["Patient","MRN","Age / DOB","Gender","Contact","Added",""].map((h) => (
                    <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94A3B8", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", letterSpacing: ".04em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #F8FAFC" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColor(p.id), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "#fff", fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 800 }}>{initials(p)}</span>
                        </div>
                        <div>
                          <H tag="p" style={{ fontSize: 13, fontWeight: 700, color: "#10233F" }}>{p.first_name} {p.last_name}</H>
                          {p.email && <Txt style={{ fontSize: 11.5, color: "#94A3B8" }}>{p.email}</Txt>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <Txt style={{ fontSize: 12.5, color: p.mrn ? "#374151" : "#CBD5E1", fontFamily: "var(--font-inter,'Inter',sans-serif)" }}>
                        {p.mrn ?? "—"}
                      </Txt>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <Txt style={{ fontSize: 13, color: "#374151" }}>{age(p.date_of_birth)}</Txt>
                      {p.date_of_birth && <Txt style={{ fontSize: 11.5, color: "#94A3B8" }}>{new Date(p.date_of_birth).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Txt>}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <Txt style={{ fontSize: 13, color: p.gender ? "#374151" : "#CBD5E1" }}>{p.gender ?? "—"}</Txt>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {p.phone && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Phone size={11} color="#94A3B8" /><Txt style={{ fontSize: 12, color: "#64748B" }}>{p.phone}</Txt></div>}
                        {p.email && <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Mail size={11} color="#94A3B8" /><Txt style={{ fontSize: 12, color: "#64748B" }}>{p.email}</Txt></div>}
                        {!p.phone && !p.email && <Txt style={{ fontSize: 12, color: "#CBD5E1" }}>—</Txt>}
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <Txt style={{ fontSize: 12, color: "#94A3B8" }}>{new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Txt>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <Link href={`/encounters/new?patientId=${p.id}`}
                        style={{ fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, color: "#1769E8", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        New Encounter <ChevronRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.45)", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 540, boxShadow: "0 24px 64px rgba(0,0,0,.18)", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "#F4F7FA", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={15} color="#64748B" />
            </button>

            <H tag="h2" style={{ fontSize: 18, fontWeight: 900, color: "#10233F", marginBottom: 4 }}>Add New Patient</H>
            <Txt style={{ fontSize: 13, color: "#64748B", marginBottom: 24 }}>Enter the patient's demographic information.</Txt>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(239,68,68,.07)", borderRadius: 10, border: "1px solid rgba(239,68,68,.2)", marginBottom: 16 }}>
                <AlertCircle size={15} color="#EF4444" />
                <Txt style={{ fontSize: 13, color: "#EF4444" }}>{error}</Txt>
              </div>
            )}

            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>First Name *</label>
                  <input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Last Name *</label>
                  <input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Date of Birth</label>
                  <input type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Gender</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", background: "#fff" }}>
                    <option value="">Select...</option>
                    {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>MRN (Medical Record Number)</label>
                <input value={form.mrn} onChange={(e) => setForm({ ...form, mrn: e.target.value })} placeholder="Optional"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Optional"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
              </div>

              <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
                <button type="button" onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#64748B" }}>
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  style={{ flex: 2, padding: "11px 0", borderRadius: 10, border: "none", background: saving ? "#93C5FD" : "#1769E8", color: "#fff", cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                  {saving ? "Saving..." : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
