"use client";
import { useState } from "react";
import { Mic, MicOff, Play, Square, Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react";

export default function AIScribePage() {
  const [recording, setRecording] = useState(false);
  const [generated, setGenerated] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>AI Medical Scribe</h1>
        <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Capture a consultation and generate structured clinical documentation for review.</p>
      </div>

      {/* Consent notice */}
      <div className="mb-6 flex items-start gap-3 p-4 rounded-xl border" style={{ background: "rgba(23,105,232,0.04)", borderColor: "rgba(23,105,232,0.15)" }}>
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#1769E8" }} />
        <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>
          <strong style={{ fontFamily: "var(--font-manrope)", color: "#10233F" }}>Consent required:</strong> Obtain informed consent from all parties before recording any consultation. This feature must only be used in accordance with applicable privacy laws and your organization's consent procedures.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recorder */}
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <h2 className="font-bold text-[#10233F] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>Consultation Recording</h2>

          <div className="flex flex-col items-center py-8">
            <button
              onClick={() => { setRecording(!recording); if (recording) setGenerated(true); }}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg mb-4 ${recording ? "pulse-teal" : ""}`}
              style={{ background: recording ? "#ef4444" : "#1769E8" }}
            >
              {recording ? <Square className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
            </button>
            <span className="font-semibold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>
              {recording ? "Recording in progress" : "Start Recording"}
            </span>
            <span className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
              {recording ? "Click to stop and generate note" : "Click to begin ambient capture"}
            </span>
            {recording && (
              <div className="mt-4 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full pulse-teal" style={{ background: "#16B8A6" }} />
                <span className="text-xs" style={{ color: "#16B8A6", fontFamily: "var(--font-manrope)" }}>Transcribing in real time</span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 text-center mb-3" style={{ fontFamily: "var(--font-inter)" }}>Or upload an authorized recording</p>
            <label className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#1769E8] transition-colors">
              <Upload className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400" style={{ fontFamily: "var(--font-manrope)" }}>Upload audio file</span>
              <input type="file" accept="audio/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* Generated note */}
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>Generated Note Draft</h2>
            {generated && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", fontFamily: "var(--font-manrope)" }}>Awaiting Review</span>}
          </div>

          {!generated ? (
            <div className="flex flex-col items-center py-12 text-center">
              <FileText className="w-12 h-12 text-gray-200 mb-3" />
              <p className="text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Start a recording or upload audio to generate a note draft.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-lg" style={{ background: "#F4F7FA" }}>
                <div className="text-xs font-bold text-[#1769E8] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Chief Complaint</div>
                <p className="text-xs text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>Chest discomfort, 3-day duration, exertional.</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "#F4F7FA" }}>
                <div className="text-xs font-bold text-[#1769E8] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>History of Present Illness</div>
                <p className="text-xs text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>Patient presents with a 3-day history of chest discomfort worsening with exertion, specifically stair climbing. No associated shortness of breath or palpitations documented at this time. Assessment ongoing.</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: "#F4F7FA" }}>
                <div className="text-xs font-bold text-[#1769E8] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Assessment</div>
                <p className="text-xs text-gray-600 italic" style={{ fontFamily: "var(--font-inter)" }}>Draft for clinician review and completion.</p>
              </div>
              <div className="p-2 rounded-lg border" style={{ borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.04)" }}>
                <p className="text-xs text-amber-700" style={{ fontFamily: "var(--font-inter)" }}>This is an AI-generated draft. All content must be reviewed and approved by the responsible clinician before entering the official record.</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}>Review and Edit</button>
                <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-[#1769E8] border border-[#1769E8]" style={{ fontFamily: "var(--font-manrope)" }}>Discard Draft</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
