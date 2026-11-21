"use client";
import { useState } from "react";
import { CheckSquare, AlertCircle, AlertTriangle, CheckCircle2, Eye } from "lucide-react";

const reviews = [
  {
    id: "R001", patient: "Patient B", noteType: "H&P", date: "Today",
    issues: [
      { severity: "warning", text: "Review of Systems section appears incomplete. Only 2 of the expected systems are documented." },
      { severity: "info", text: "Physical Examination section present but lacks documented vital signs." },
    ],
  },
  {
    id: "R002", patient: "Patient C", noteType: "SOAP Note", date: "Today",
    issues: [
      { severity: "warning", text: "Assessment section references a diagnosis not supported by the documented findings in this note." },
    ],
  },
  {
    id: "R003", patient: "Patient F", noteType: "SOAP Note", date: "2 days ago",
    issues: [
      { severity: "info", text: "No follow-up plan documented in the Plan section." },
      { severity: "info", text: "Medication reconciliation may be incomplete based on available records." },
    ],
  },
];

export default function DocumentationReviewPage() {
  const [selected, setSelected] = useState(reviews[0]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Documentation Completeness Review</h1>
        <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Identify gaps and potential issues in clinical notes before they are finalized.</p>
      </div>
      <div className="flex items-start gap-3 p-4 rounded-xl border mb-6" style={{ background: "rgba(23,105,232,0.04)", borderColor: "rgba(23,105,232,0.15)" }}>
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#1769E8" }} />
        <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>Completeness flags are suggestions only. The responsible clinician determines what constitutes complete and appropriate documentation for each encounter.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {reviews.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected.id === r.id ? "border-[#1769E8] bg-[#EEF4FD]" : "border-gray-100 bg-white hover:border-blue-100"} card-shadow`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#10233F] text-sm" style={{ fontFamily: "var(--font-manrope)" }}>{r.patient}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", fontFamily: "var(--font-manrope)" }}>{r.issues.length} flag{r.issues.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{r.noteType} · {r.date}</div>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>{selected.patient}</h2>
              <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{selected.noteType} · {selected.date}</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1769E8] border border-[#1769E8] hover:bg-blue-50 transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
              <Eye className="w-3.5 h-3.5" /> View Note
            </button>
          </div>
          <div className="space-y-3">
            {selected.issues.map((issue, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${issue.severity === "warning" ? "bg-amber-50 border border-amber-100" : "bg-[#F4F7FA] border border-gray-100"}`}>
                {issue.severity === "warning"
                  ? <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                  : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#1769E8" }} />}
                <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>{issue.text}</p>
              </div>
            ))}
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(22,184,166,0.05)", border: "1px solid rgba(22,184,166,0.15)" }}>
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#16B8A6" }} />
              <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>All flagged items require clinician judgment before the note is approved. These flags are informational only.</p>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}>Acknowledge and Approve</button>
            <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#1769E8] border border-[#1769E8]" style={{ fontFamily: "var(--font-manrope)" }}>Return to Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
