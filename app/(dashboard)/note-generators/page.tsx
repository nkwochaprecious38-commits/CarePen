"use client";
import { useState } from "react";
import { BookOpen, ClipboardList, MessageSquare, LogOut, FileText, BarChart3, ChevronRight, AlertCircle } from "lucide-react";

const generators = [
  { id: "hpi", icon: BookOpen, label: "HPI Generator", desc: "Generate a structured History of Present Illness from encounter notes or consultation transcription.", color: "#1769E8" },
  { id: "ap", icon: ClipboardList, label: "Assessment and Plan Generator", desc: "Draft a structured clinical assessment and treatment plan based on the encounter information.", color: "#16B8A6" },
  { id: "instructions", icon: MessageSquare, label: "Patient Instructions Generator", desc: "Create clear, patient-friendly instructions covering treatment, medications, and follow-up steps.", color: "#1769E8" },
  { id: "discharge", icon: LogOut, label: "Discharge Summary Generator", desc: "Prepare organized discharge documentation including hospital course, instructions, and follow-up plans.", color: "#16B8A6" },
  { id: "referral", icon: FileText, label: "Referral Letter Generator", desc: "Generate a structured referral letter with relevant patient encounter information and clinical question.", color: "#1769E8" },
  { id: "coding", icon: BarChart3, label: "Clinical Coding Assistance", desc: "Receive ICD-10 coding suggestions based on documented diagnoses and encounter content for clinician review.", color: "#16B8A6" },
];

export default function NoteGeneratorsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedGen = generators.find((g) => g.id === selected);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setOutput(
        selected === "hpi"
          ? "The patient presents with a [duration]-day history of [symptom]. The onset was [gradual/sudden]. The symptom is described as [character] in nature, located [location]. Severity is rated [X]/10. The symptom is exacerbated by [factors] and relieved by [factors]. Associated symptoms include [list]. No prior episodes documented in the available records.\n\n[This is a demonstration draft. Clinician review and completion required before saving.]"
          : selected === "ap"
          ? "Assessment:\n1. [Primary diagnosis]: Based on the documented history and examination findings.\n2. [Secondary consideration]: To be further evaluated.\n\nPlan:\n1. [Investigation/referral]: As indicated.\n2. Patient education provided regarding [topic].\n3. Follow-up: [timeframe]\n\n[This is a demonstration draft. All clinical decisions must be made by the responsible clinician.]"
          : "[This is a demonstration output for the selected generator. Connect an AI language model API to generate real clinical documentation drafts. All output requires clinician review before clinical use.]"
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Note Generators</h1>
        <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Generate structured clinical documentation drafts for review and approval.</p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl border mb-6" style={{ background: "rgba(23,105,232,0.04)", borderColor: "rgba(23,105,232,0.15)" }}>
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#1769E8" }} />
        <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>
          All outputs are AI-generated drafts. No documentation is saved to the official record without explicit clinician review and approval. CarePen generates drafts: clinicians make all final clinical decisions.
        </p>
      </div>

      {!selected ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generators.map((g) => (
            <button
              key={g.id}
              onClick={() => { setSelected(g.id); setInput(""); setOutput(""); }}
              className="bg-white rounded-2xl p-6 card-shadow card-shadow-hover border border-gray-100 text-left group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${g.color}12` }}>
                <g.icon className="w-5 h-5" style={{ color: g.color }} />
              </div>
              <h3 className="font-bold text-[#10233F] mb-2 text-sm" style={{ fontFamily: "var(--font-manrope)" }}>{g.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>{g.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: g.color, fontFamily: "var(--font-manrope)" }}>
                Open generator <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSelected(null)} className="text-sm text-[#1769E8] hover:underline" style={{ fontFamily: "var(--font-manrope)" }}>
              Back to generators
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-bold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>{selectedGen?.label}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#10233F] mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
                Clinical Context Input
              </label>
              <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                Paste consultation notes, transcript excerpt, or relevant clinical information.
              </p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={10}
                placeholder="Paste clinical notes or consultation context here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-[#1769E8] resize-none text-[#202B3A] placeholder:text-gray-300"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || loading}
                className="mt-3 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}
              >
                {loading ? "Generating..." : "Generate Draft"}
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#10233F] mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
                Generated Draft
              </label>
              <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                Review and edit before including in the official record.
              </p>
              {output ? (
                <div>
                  <textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-[#1769E8] resize-none text-[#202B3A]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#16B8A6", fontFamily: "var(--font-manrope)" }}>Approve and Save</button>
                    <button onClick={() => setOutput("")} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#1769E8] border border-[#1769E8]" style={{ fontFamily: "var(--font-manrope)" }}>Discard</button>
                  </div>
                </div>
              ) : (
                <div className="h-48 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <p className="text-sm text-gray-300" style={{ fontFamily: "var(--font-inter)" }}>Output will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
