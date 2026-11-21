"use client";
import { useState } from "react";
import { Search, Users, ChevronRight, Pill, AlertTriangle, Calendar, Activity } from "lucide-react";

const demoPatients = [
  { id: "P001", name: "Patient A", age: 54, conditions: ["Hypertension", "Type 2 Diabetes"], meds: 3, lastVisit: "3 weeks ago", allergies: 1 },
  { id: "P002", name: "Patient B", age: 32, conditions: ["Asthma"], meds: 2, lastVisit: "1 month ago", allergies: 0 },
  { id: "P003", name: "Patient C", age: 67, conditions: ["COPD", "Heart Failure", "Atrial Fibrillation"], meds: 7, lastVisit: "1 week ago", allergies: 2 },
  { id: "P004", name: "Patient D", age: 45, conditions: ["Anxiety", "Depression"], meds: 2, lastVisit: "2 weeks ago", allergies: 0 },
];

export default function PatientSummariesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof demoPatients[0] | null>(null);

  const filtered = demoPatients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Patient Summaries</h1>
        <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Organized patient summaries to prepare for each consultation.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient list */}
        <div className="bg-white rounded-2xl card-shadow border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-[#1769E8] text-[#202B3A] placeholder:text-gray-400"
                style={{ fontFamily: "var(--font-inter)" }}
              />
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#F4F7FA] transition-colors ${selected?.id === p.id ? "bg-[#EEF4FD]" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "#10233F" }}>
                    {p.name[0]}{p.name.split(" ")[1]?.[0] || ""}
                  </div>
                  <div>
                    <div className="font-semibold text-[#10233F] text-sm" style={{ fontFamily: "var(--font-manrope)" }}>{p.name}</div>
                    <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Age {p.age} · Last visit {p.lastVisit}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-300 p-3 text-center" style={{ fontFamily: "var(--font-inter)" }}>Demonstration data only</p>
        </div>

        {/* Summary panel */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="bg-white rounded-2xl card-shadow border border-gray-100 h-full flex items-center justify-center py-20">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Select a patient to view their summary</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl card-shadow border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold" style={{ background: "linear-gradient(135deg, #1769E8, #16B8A6)" }}>
                  {selected.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>{selected.name}</h2>
                  <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Age {selected.age} · Last visit {selected.lastVisit}</p>
                  <p className="text-xs text-amber-600 mt-1" style={{ fontFamily: "var(--font-inter)" }}>Demonstration data only. Not a real patient record.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                {[
                  { icon: Activity, label: "Active Conditions", value: `${selected.conditions.length} documented`, detail: selected.conditions.join(", "), color: "#1769E8" },
                  { icon: Pill, label: "Medications", value: `${selected.meds} active on record`, detail: "Review full medication list in EHR", color: "#16B8A6" },
                  { icon: AlertTriangle, label: "Allergies", value: `${selected.allergies} documented`, detail: selected.allergies > 0 ? "Review allergy details before prescribing" : "No documented allergies on record", color: selected.allergies > 0 ? "#F59E0B" : "#16B8A6" },
                  { icon: Calendar, label: "Last Visit", value: selected.lastVisit, detail: "Previous encounter available for review", color: "#10233F" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl" style={{ background: "#F4F7FA" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      <span className="text-xs font-bold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>{item.label}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#202B3A] mb-0.5" style={{ fontFamily: "var(--font-manrope)" }}>{item.value}</div>
                    <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{item.detail}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border" style={{ background: "rgba(23,105,232,0.03)", borderColor: "rgba(23,105,232,0.1)" }}>
                <div className="text-xs font-bold text-[#10233F] mb-2" style={{ fontFamily: "var(--font-manrope)" }}>AI Summary Note</div>
                <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  This patient has {selected.conditions.length} documented active condition{selected.conditions.length !== 1 ? "s" : ""}: {selected.conditions.join(", ")}. There are {selected.meds} medications on record and {selected.allergies} documented {selected.allergies === 1 ? "allergy" : "allergies"}. Last encounter was {selected.lastVisit}. This summary is generated from demonstration data and should not be used for clinical decision-making.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
