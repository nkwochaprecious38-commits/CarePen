"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { FileText, Plus, Search, CheckCircle2, Clock, Edit3, X, AlertCircle, Save, Check, ChevronDown } from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

type Note = {
  id: string; note_type: string; content: string | null; status: string;
  approved_at: string | null; created_at: string; updated_at: string;
  encounters: { encounter_type: string; encounter_date: string } | null;
  patients: { first_name: string; last_name: string } | null;
};
type Encounter = { id: string; encounter_type: string; encounter_date: string; patient_id: string; patients: { first_name: string; last_name: string } | null };

const NOTE_TYPES = ["Progress Note","SOAP Note","HPI","Assessment & Plan","Procedure Note","Discharge Summary","Referral Letter","Prior Authorization","Prescription Note","Other"];
const STATUSES = ["draft","in_review","approved"];

function statusStyle(status: string) {
  if (status === "approved")  return { bg: "rgba(22,184,166,.1)",  color: "#16B8A6" };
  if (status === "in_review") return { bg: "rgba(245,158,11,.1)",  color: "#F59E0B" };
  return { bg: "rgba(23,105,232,.08)", color: "#1769E8" };
}
function statusLabel(s: string) {
  if (s === "in_review") return "In Review";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const SOAP_TEMPLATE = `SUBJECTIVE:
[Chief complaint and history of present illness]

OBJECTIVE:
[Physical examination findings, vital signs, lab/imaging results]

ASSESSMENT:
[Diagnosis or differential diagnoses]

PLAN:
[Treatment plan, medications, follow-up, referrals]
`;

export default function ClinicalNotesPage() {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);
  const [approving, setApproving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ encounter_id: "", note_type: "SOAP Note", content: SOAP_TEMPLATE, status: "draft" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const [notesRes, encRes] = await Promise.all([
      supabase.from("notes")
        .select("id, note_type, content, status, approved_at, created_at, updated_at, encounters(encounter_type, encounter_date), patients(first_name, last_name)")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false }),
      supabase.from("encounters")
        .select("id, encounter_type, encounter_date, patient_id, patients(first_name, last_name)")
        .eq("user_id", user.id)
        .order("encounter_date", { ascending: false }),
    ]);
    setNotes((notesRes.data as any) ?? []);
    setEncounters((encRes.data as any) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = notes.filter((n) => {
    const q = search.toLowerCase();
    const p = n.patients;
    const matchSearch = !q || (p ? `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) : false) || n.note_type.toLowerCase().includes(q) || (n.content ?? "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || n.status === filterStatus;
    return matchSearch && matchStatus;
  });

  async function handleSaveNote(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.encounter_id) { setError("Please select an encounter."); return; }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const enc = encounters.find((e) => e.id === form.encounter_id);
    if (!enc) { setError("Encounter not found."); setSaving(false); return; }

    if (editNote) {
      const { error: err } = await supabase.from("notes").update({
        note_type: form.note_type,
        content: form.content,
        status: form.status,
        updated_at: new Date().toISOString(),
      }).eq("id", editNote.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const patientId = enc.patient_id;
      const { error: err } = await supabase.from("notes").insert({
        user_id: user!.id,
        encounter_id: form.encounter_id,
        patient_id: patientId ?? "",
        note_type: form.note_type,
        content: form.content,
        status: form.status,
      });
      if (err) { setError(err.message); setSaving(false); return; }
    }
    setSaving(false);
    setShowModal(false);
    setEditNote(null);
    setForm({ encounter_id: "", note_type: "SOAP Note", content: SOAP_TEMPLATE, status: "draft" });
    load();
  }

  async function handleApprove(noteId: string) {
    setApproving(noteId);
    await supabase.from("notes").update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", noteId);
    setApproving(null);
    load();
  }

  function openEdit(note: Note) {
    const enc = encounters.find((e) => e.id === (note as any).encounter_id) ?? encounters[0];
    setEditNote(note);
    setForm({ encounter_id: enc?.id ?? "", note_type: note.note_type, content: note.content ?? "", status: note.status });
    setError("");
    setShowModal(true);
  }

  function openNew() {
    setEditNote(null);
    setForm({ encounter_id: encounters[0]?.id ?? "", note_type: "SOAP Note", content: SOAP_TEMPLATE, status: "draft" });
    setError("");
    setShowModal(true);
  }

  const draftCount = notes.filter((n) => n.status === "draft").length;
  const reviewCount = notes.filter((n) => n.status === "in_review").length;
  const approvedCount = notes.filter((n) => n.status === "approved").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <H tag="h1" style={{ fontSize: 22, fontWeight: 900, color: "#10233F" }}>Clinical Notes</H>
          <Txt style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{notes.length} note{notes.length !== 1 ? "s" : ""} total</Txt>
        </div>
        <button onClick={openNew} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
          <Plus size={15} /> New Note
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {[
          { label: "Draft", value: draftCount, color: "#1769E8", bg: "rgba(23,105,232,.07)" },
          { label: "Awaiting Review", value: reviewCount, color: "#F59E0B", bg: "rgba(245,158,11,.08)" },
          { label: "Approved", value: approvedCount, color: "#16B8A6", bg: "rgba(22,184,166,.07)" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid #E8EDF4", boxShadow: "0 1px 4px rgba(16,35,63,.04)", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FileText size={16} color={s.color} />
            </div>
            <div>
              <H tag="p" style={{ fontSize: 22, fontWeight: 900, color: "#10233F", lineHeight: 1 }}>{s.value}</H>
              <Txt style={{ fontSize: 11.5, color: "#64748B", marginTop: 3 }}>{s.label}</Txt>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
          <Search size={15} color="#9CA3AF" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by patient, note type, content..."
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

      {/* Notes List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", border: "1px solid #E8EDF4" }}>
            <Txt style={{ fontSize: 13, color: "#94A3B8" }}>Loading notes...</Txt>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: "48px 24px", textAlign: "center", border: "1px solid #E8EDF4" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(23,105,232,.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <FileText size={22} color="#1769E8" />
            </div>
            <H tag="p" style={{ fontSize: 15, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>
              {search || filterStatus !== "all" ? "No matching notes" : "No notes yet"}
            </H>
            <Txt style={{ fontSize: 13, color: "#94A3B8", marginBottom: 20 }}>
              {search || filterStatus !== "all" ? "Try adjusting your filters." : encounters.length === 0 ? "Create an encounter first, then add notes to it." : "Create your first clinical note."}
            </Txt>
            {!search && filterStatus === "all" && encounters.length === 0 && (
              <Link href="/encounters" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                Create an Encounter
              </Link>
            )}
          </div>
        ) : (
          filtered.map((note) => {
            const ss = statusStyle(note.status);
            const p = note.patients;
            const enc = note.encounters;
            const preview = (note.content ?? "").replace(/\n/g, " ").slice(0, 120);
            return (
              <div key={note.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E8EDF4", boxShadow: "0 1px 4px rgba(16,35,63,.04)", padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: ss.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={16} color={ss.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                    <H tag="p" style={{ fontSize: 14, fontWeight: 800, color: "#10233F" }}>{note.note_type}</H>
                    <span style={{ fontSize: 11.5, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, background: ss.bg, color: ss.color, padding: "2px 10px", borderRadius: 999 }}>
                      {statusLabel(note.status)}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                    {p && <Txt style={{ fontSize: 12, color: "#64748B" }}>{p.first_name} {p.last_name}</Txt>}
                    {enc && (
                      <Txt style={{ fontSize: 12, color: "#94A3B8" }}>
                        {enc.encounter_type} · {new Date(enc.encounter_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </Txt>
                    )}
                  </div>
                  {preview && (
                    <Txt style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>
                      {preview}{note.content && note.content.length > 120 ? "..." : ""}
                    </Txt>
                  )}
                  {note.approved_at && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                      <CheckCircle2 size={12} color="#16B8A6" />
                      <Txt style={{ fontSize: 11, color: "#16B8A6" }}>Approved {new Date(note.approved_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Txt>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                  <button onClick={() => openEdit(note)}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12, fontWeight: 700, color: "#374151" }}>
                    <Edit3 size={12} /> Edit
                  </button>
                  {note.status !== "approved" && (
                    <button onClick={() => handleApprove(note.id)} disabled={approving === note.id}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: "none", background: approving === note.id ? "#D1FAE5" : "#16B8A6", cursor: approving === note.id ? "not-allowed" : "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                      <Check size={12} /> {approving === note.id ? "..." : "Approve"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Note Editor Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.45)", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 680, boxShadow: "0 24px 64px rgba(0,0,0,.18)", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => { setShowModal(false); setEditNote(null); }} style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", background: "#F4F7FA", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={15} color="#64748B" />
            </button>

            <H tag="h2" style={{ fontSize: 18, fontWeight: 900, color: "#10233F", marginBottom: 4 }}>{editNote ? "Edit Note" : "New Clinical Note"}</H>
            <Txt style={{ fontSize: 13, color: "#64748B", marginBottom: 24 }}>
              {editNote ? "Update the note content below. Clinician review required before approving." : "Write a clinical note for a patient encounter. Clinician review required before approval."}
            </Txt>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(239,68,68,.07)", borderRadius: 10, border: "1px solid rgba(239,68,68,.2)", marginBottom: 16 }}>
                <AlertCircle size={15} color="#EF4444" />
                <Txt style={{ fontSize: 13, color: "#EF4444" }}>{error}</Txt>
              </div>
            )}

            {!editNote && encounters.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <Txt style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>You need to create an encounter before adding a note.</Txt>
                <Link href="/encounters" onClick={() => setShowModal(false)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1769E8", color: "#fff", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                  Create an Encounter
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSaveNote} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Encounter *</label>
                    <select value={form.encounter_id} onChange={(e) => setForm({ ...form, encounter_id: e.target.value })} required disabled={!!editNote}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", background: "#fff" }}>
                      <option value="">Select encounter...</option>
                      {encounters.map((enc) => (
                        <option key={enc.id} value={enc.id}>
                          {enc.patients ? `${enc.patients.first_name} ${enc.patients.last_name} — ` : ""}{enc.encounter_type} ({new Date(enc.encounter_date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Note Type *</label>
                    <select value={form.note_type} onChange={(e) => setForm({ ...form, note_type: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", background: "#fff" }}>
                      {NOTE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)" }}>Note Content</label>
                    <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: "var(--font-inter,'Inter',sans-serif)" }}>Clinician review required before approval</span>
                  </div>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12}
                    placeholder="Enter clinical note here..."
                    style={{ width: "100%", padding: "12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", marginBottom: 6 }}>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, color: "#10233F", fontFamily: "var(--font-inter,'Inter',sans-serif)", outline: "none", boxSizing: "border-box", background: "#fff" }}>
                    <option value="draft">Draft</option>
                    <option value="in_review">Submit for Review</option>
                  </select>
                </div>

                <div style={{ background: "rgba(245,158,11,.06)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(245,158,11,.2)" }}>
                  <Txt style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>
                    Important: AI-generated content requires clinician review before entering the official medical record. Use the Approve button on a note only after thorough clinical verification.
                  </Txt>
                </div>

                <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                  <button type="button" onClick={() => { setShowModal(false); setEditNote(null); }}
                    style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1px solid #E2E8F0", background: "#fff", cursor: "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#64748B" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 0", borderRadius: 10, border: "none", background: saving ? "#93C5FD" : "#1769E8", color: "#fff", cursor: saving ? "not-allowed" : "pointer", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700 }}>
                    <Save size={14} /> {saving ? "Saving..." : editNote ? "Save Changes" : "Save Note"}
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
