"use client";
import { LayoutTemplate, Stethoscope } from "lucide-react";

const specialties = [
  "Family Medicine", "Internal Medicine", "Cardiology", "Dermatology",
  "Pediatrics", "Orthopedics", "Neurology", "Psychiatry", "Emergency Medicine",
  "Oncology", "Obstetrics and Gynecology", "Urology"
];
const templateTypes = ["SOAP Note", "History and Physical", "Discharge Summary", "Referral Letter", "Patient Instructions", "Procedure Note"];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Templates</h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Specialty-specific documentation templates for structured clinical notes.</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}>Create Template</button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <h2 className="font-bold text-[#10233F] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>By Specialty</h2>
          <div className="grid grid-cols-2 gap-2">
            {specialties.map((s) => (
              <button key={s} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#202B3A] hover:bg-[#EEF4FD] hover:text-[#1769E8] transition-colors text-left" style={{ fontFamily: "var(--font-inter)" }}>
                <Stethoscope className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#16B8A6" }} />{s}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <h2 className="font-bold text-[#10233F] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>By Note Type</h2>
          <div className="space-y-2">
            {templateTypes.map((t) => (
              <button key={t} className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-[#EEF4FD]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutTemplate className="w-4 h-4" style={{ color: "#1769E8" }} />
                  <span className="text-sm font-medium text-[#202B3A]" style={{ fontFamily: "var(--font-manrope)" }}>{t}</span>
                </div>
                <span className="text-xs text-gray-300" style={{ fontFamily: "var(--font-inter)" }}>View</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
