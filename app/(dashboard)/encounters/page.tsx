"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Calendar, Plus, Search, Clock, Stethoscope, FileText, X, AlertCircle, ChevronDown } from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

type Encounter = {
  id: string; encounter_date: string; encounter_type: string;
  chief_complaint: string | null; status: string; created_at: string;
  patients: { first_name: string; last_name: string } | null;
};
type Patient = { id: string; first_name: string; last_name: string };

const ENCOUNTER_TYPES = ["Office Visit","Telehealth","Follow-up","Urgent Care","Procedure","Consultation","Annual Physical","New Patient"];
const STATUSES = ["draft","in_progress","complete"];

function statusStyle(status: string) {
  if (status === "complete")     return { bg: "rgba(22,184,166,.1)",  color: "#16B8A6" };
  if (status === "in_progress")  return { bg: "rgba(245,158,11,.1)",  color: "#F59E0B" };
  return { bg: "rgba(23,105,232,.08)", color: "#1769E8" };
}

function statusLabel(s: string) {
  return s === "in_progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1);
}

export default function EncountersPage() {
  const supabase = createClient();
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ patient_id: "", encounter_date: new Date().toISOString().split("T")[0], encounter_type: "Office Visit", chief_complaint: "", status: "draft" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [encResult, patResult] = await Promise.all([
      supabase.from("encounters")
        .select("id, encounter_date, encounter_type, chief_complaint, status, created_at, patients(first_name, last_name)")
        .eq("user_id", user.id)
        .order("encounter_date", { ascending: false }),
      supabase.from("patients").select("id, first_name, last_name").eq("user_id", user.id).order("last_name"),
    ]);
    setEncounters((encResult.data as any) ?? []);
    setPatients(patResult.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = encounters.filter((e) => {
    const q = search.toLowerCase();
    const p = e.patients;
    const matchSearch = !q || (p ? `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) : false) || e.encounter_type.toLowerCase().includes(q) || (e.chief_complaint ?? "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.patient_id) { setError("Please select a patient."); return; }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error: err } = await supabase.from("encounters").insert({
      user_id: user!.id,
      patient_id: form.patient_id,
      encounter_date: form.encounter_date,
      encounter_type: form.encounter_type,
      chief_complaint: form.chief_complaint.trim() || null,
      status: form.status,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    setShowModal(false);
    setForm({ patient_id: "", encounter_date: new Date().toISOString().split("T")[0], encounter_type: "Office Visit", chief_complaint: "", status: "draft" });
    load();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <H tag="h1" style={{ fontSize: 22, fontWeight: 900, color: "#10233F" }}>Encounters</H>
          <Txt style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{encounters.length} encounter{encounters.length !== 1 ? "s" : ""} total</Txt>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
          <Plus size={15} /> New Encounter
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
          <Search size={15} color="#9CA3AF" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by patient, type, complaint..."
            style={{ width: "100%", paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 13, color: "#374151", background: "#fff", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid", borderColor: filterStatus === s ? "#1769E8" : "#E2E8F0", background: filterStatus === s ? "rgba(23,105,232,.07)" : "#fff", color: filterStatus === s ? "#1769E8" : "#64748B", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap" }}>
              {s === "all" ? "All" : statusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDF4", boxShadow: "0 1px 4px rgba(16,35,63,.04)", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center" }}>
            <Txt style={{ fontSize: 13, color: "#94A3B8" }}>Loading encounters...</Txt>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(23,105,232,.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Calendar size={22} color="#1769E8" />
            </div>
            <H tag="p" style={{ fontSize: 15, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>
              {search || filterStatus !== "all" ? "No matching encounters" : "No encounters yet"}
            </H>
            <Txt style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
              {search || filterStatus !== "all" ? "Try adjusting your filters." : "Create your first encounter to begin documenting patient visits."}
            </Txt>
            {!search && filterStatus === "all" && patients.length === 0 && (
              <Link href="/patients" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                Add a Patient First
              </Link>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                  {["Patient","Type","Date","Chief Complaint","Status","Notes",""].map((h) => (
                    <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94A3B8", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", letterSpacing: ".04em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((enc) => {
                  const ss = statusStyle(enc.status);
                  const p = enc.patients;
                  return (
                    <tr key={enc.id} style={{ borderBottom: "1px solid #F8FAFC" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(23,105,232,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Stethoscope size={13} color="#1769E8" />
                          </div>
                          <H tag="p" style={{ fontSize: 13, fontWeight: 700, color: "#10233F" }}>
                            {p ? `${p.first_name} ${p.last_name}` : "Unknown Patient"}
                          </H>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px" }}><Txt style={{ fontSize: 13, color: "#374151" }}>{enc.encounter_type}</Txt></td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <Clock size={12} color="#94A3B8" />
                          <Txt style={{ fontSize: 12.5, color: "#64748B" }}>{new Date(enc.encounter_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Txt>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <Txt style={{ fontSize: 12.5, color: enc.chief_complaint ? "#374151" : "#CBD5E1", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {enc.chief_complaint ?? "—"}
                        </Txt>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ fontSize: 11.5, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, background: ss.bg, color: ss.color, padding: "3px 10px", borderRadius: 999 }}>
                          {statusLabel(enc.status)}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <Link href={`/clinical-notes?encounterId=${enc.id}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, color: "#16B8A6", textDecoration: "none" }}>
                          <FileText size={13} /> Notes
                        </Link>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <Link href={`/encounters/${enc.id}`}
                          style={{ fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, color: "#1769E8", textDecoration: "none" }}>
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Encounter Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.45)", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 500, boxShadow: "0 24px 64px rgba(0,0,0,.18)", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "#F4F7FA", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={15} color="#64748B" />
            </button>

            <H tag="h2" style={{ fontSize: 18, fontWeight: 900, color: "#10233F", marginBottom: 4 }}>New Encounter</H>
            <Txt style={{ fontSize: 13, color: "#64748B", marginBottom: 24 }}>Create a new clinical encounter for a patient.</Txt>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(239,68,68,.07)", borderRadius: 10, border: "1px solid rgba(239,68,68,.2)", marginBottom: 16 }}>
                <AlertCircle size={15} color="#EF4444" />
                <Txt style={{ fontSize: 13, color: "#EF4444" }}>{error}</Txt>
              </div>
            )}

            {patients.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <Txt style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>You need to add a patient before creating an encounter.</Txt>
                <Link href="/patients" onClick={() => setShowModal(false)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                  Add a Patient
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Patient *</label>
                  <select value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} required
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", background: "#fff" }}>
                    <option value="">Select patient...</option>
                    {patients.map((p) => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Date *</label>
                    <input type="date" value={form.encounter_date} onChange={(e) => setForm({ ...form, encounter_date: e.target.value })} required
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Type *</label>
                    <select value={form.encounter_type} onChange={(e) => setForm({ ...form, encounter_type: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", background: "#fff" }}>
                      {ENCOUNTER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Chief Complaint</label>
                  <input value={form.chief_complaint} onChange={(e) => setForm({ ...form, chief_complaint: e.target.value })} placeholder="e.g. Chest pain, shortness of breath..."
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box" }} />
                </div>

                <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
                  <button type="button" onClick={() => setShowModal(false)}
                    style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#64748B" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ flex: 2, padding: "11px 0", borderRadius: 10, border: "none", background: saving ? "#93C5FD" : "#1769E8", color: "#fff", cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                    {saving ? "Creating..." : "Create Encounter"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
