import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Mic, Users, FileText,
  ClipboardList, BookOpen, MessageSquare, LogOut,
  BarChart3, Clock, FolderX, AlertCircle, Calendar,
  Shield, Activity, Stethoscope, Sparkles, ChevronRight,
} from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

const Chip = ({ label, bg = "rgba(23,105,232,.1)", color = "#1769E8" }: any) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    background: bg, color, border: `1px solid ${color}22`,
    borderRadius: 999, padding: "5px 14px",
    fontFamily: "var(--font-manrope,'Manrope',sans-serif)",
    fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em",
  }}>{label}</span>
);

export default function HomePage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navigation />

      {/* HERO */}
      <section className="hero-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .025, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 100px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 28 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(103,213,208,.1)", color: "#67D5D0",
              border: "1px solid rgba(103,213,208,.2)", borderRadius: 999, padding: "6px 16px",
              fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12, fontWeight: 700, letterSpacing: ".05em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16B8A6", display: "inline-block" }} />
              AI Clinical Documentation Platform
            </span>
          </div>

          <H tag="h1" style={{ fontSize: "clamp(44px,7vw,80px)", fontWeight: 900, lineHeight: 1.05, color: "#fff", marginBottom: 28 }}>
            Better Clinical Notes.<br />
            <span className="text-light-grad">More Time for Patients.</span>
          </H>

          <Txt style={{ fontSize: 18, color: "rgba(255,255,255,.58)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 44px" }}>
            CarePen turns patient conversations into structured clinical documentation,
            so you can focus on care rather than charting.
          </Txt>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            <Link href="/signup" className="btn btn-blue" style={{ fontSize: 15, padding: "14px 28px" }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link href="/platform" className="btn btn-ghost-white" style={{ fontSize: 15, padding: "14px 28px" }}>
              Explore Platform
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 28px" }}>
            {["14-day free trial, no card required", "Clinician approval required on every note", "No lock-in contracts"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <CheckCircle2 size={14} color="#16B8A6" />
                <Txt style={{ fontSize: 13.5, color: "rgba(255,255,255,.45)" }}>{t}</Txt>
              </div>
            ))}
          </div>

          {/* Dashboard preview */}
          <div style={{ marginTop: 72, position: "relative" }}>
            <div style={{ position: "absolute", inset: "-40px -40px 0",
              background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(23,105,232,.2), transparent)",
              pointerEvents: "none" }} />
            <div style={{ borderRadius: 16, overflow: "hidden",
              border: "1px solid rgba(255,255,255,.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.05)",
              maxWidth: 920, margin: "0 auto", position: "relative" }}>
              {/* Browser chrome */}
              <div style={{ background: "rgba(255,255,255,.05)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#FF5F57","#FFBD2E","#28CA42"].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <div style={{ background: "rgba(255,255,255,.07)", borderRadius: 6, padding: "4px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28CA42" }} />
                    <Txt style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>app.carepen.com/dashboard</Txt>
                  </div>
                </div>
              </div>
              {/* Dashboard UI */}
              <div style={{ background: "#F4F7FA", padding: 20, display: "flex", gap: 16 }}>
                {/* Sidebar */}
                <div style={{ width: 160, flexShrink: 0, background: "#10233F", borderRadius: 12, padding: "16px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#1769E8,#16B8A6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#fff", fontSize: 10, fontFamily: "var(--font-manrope)", fontWeight: 800 }}>CP</span>
                    </div>
                    <span style={{ color: "#fff", fontSize: 12, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 800 }}>CarePen</span>
                  </div>
                  {[{ label: "Overview", active: true }, { label: "Patients", active: false }, { label: "AI Scribe", active: false }, { label: "Notes", active: false }, { label: "Analytics", active: false }].map((item) => (
                    <div key={item.label} style={{ padding: "7px 10px", borderRadius: 7, marginBottom: 2,
                      background: item.active ? "rgba(23,105,232,.2)" : "transparent",
                      color: item.active ? "#67D5D0" : "rgba(255,255,255,.38)",
                      fontSize: 11.5, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 500,
                      display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.active ? "#16B8A6" : "transparent", flexShrink: 0 }} />
                      {item.label}
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <H tag="h3" style={{ fontSize: 14, fontWeight: 800, color: "#10233F" }}>Good morning, Dr. Okafor</H>
                      <Txt style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Wednesday, 21 November 2026</Txt>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10.5, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, background: "rgba(245,158,11,.1)", color: "#F59E0B", padding: "3px 10px", borderRadius: 999 }}>Demo Mode</span>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1769E8,#16B8A6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontSize: 10, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 800 }}>JO</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
                    {[{ label: "Encounters", value: "12", color: "#1769E8" }, { label: "In Review", value: "4", color: "#F59E0B" }, { label: "Completed", value: "28", color: "#16B8A6" }, { label: "Patients", value: "156", color: "#10233F" }].map((s) => (
                      <div key={s.label} style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", boxShadow: "0 1px 6px rgba(16,35,63,.06)" }}>
                        <div style={{ fontSize: 20, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 900, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 10, fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#94A3B8", marginTop: 2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 10 }}>
                    <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", boxShadow: "0 1px 6px rgba(16,35,63,.06)" }}>
                      <H tag="h4" style={{ fontSize: 11, fontWeight: 800, color: "#10233F", marginBottom: 10 }}>Documentation Activity</H>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56 }}>
                        {[6,10,14,9,16,8,5].map((v, i) => (
                          <div key={i} style={{ flex: 1, height: `${(v/16)*100}%`, borderRadius: "2px 2px 0 0", background: i === 4 ? "#1769E8" : "#EEF2F7" }} />
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                        {["M","T","W","T","F","S","S"].map((d, i) => (
                          <span key={i} style={{ fontSize: 9, fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#CBD5E1", flex: 1, textAlign: "center" }}>{d}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", boxShadow: "0 1px 6px rgba(16,35,63,.06)" }}>
                      <H tag="h4" style={{ fontSize: 11, fontWeight: 800, color: "#10233F", marginBottom: 10 }}>Recent Notes</H>
                      {[{ name: "Patient A", status: "Complete", c: "#16B8A6" }, { name: "Patient B", status: "Review", c: "#F59E0B" }, { name: "Patient C", status: "Draft", c: "#1769E8" }].map((n) => (
                        <div key={n.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F4F7FA" }}>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-inter,'Inter',sans-serif)", color: "#1E293B" }}>{n.name}</span>
                          <span style={{ fontSize: 9, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 700, background: `${n.c}18`, color: n.c, padding: "2px 7px", borderRadius: 999 }}>{n.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge: Scribe */}
            <div style={{ position: "absolute", bottom: -20, left: "10%",
              background: "#fff", borderRadius: 14, padding: "10px 16px",
              boxShadow: "0 8px 32px rgba(16,35,63,.18)", border: "1px solid #E8EDF4",
              display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(22,184,166,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mic size={16} color="#16B8A6" />
              </div>
              <div>
                <H tag="p" style={{ fontSize: 12, fontWeight: 800, color: "#10233F" }}>AI Scribe Active</H>
                <Txt style={{ fontSize: 11, color: "#94A3B8" }}>Generating note draft</Txt>
              </div>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16B8A6" }} className="pulse-dot" />
            </div>
            {/* Floating badge: Approved */}
            <div style={{ position: "absolute", top: -18, right: "10%",
              background: "#fff", borderRadius: 14, padding: "10px 16px",
              boxShadow: "0 8px 32px rgba(16,35,63,.18)", border: "1px solid #E8EDF4",
              display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(23,105,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={16} color="#1769E8" />
              </div>
              <div>
                <H tag="p" style={{ fontSize: 12, fontWeight: 800, color: "#10233F" }}>Note Approved</H>
                <Txt style={{ fontSize: 11, color: "#94A3B8" }}>Patient A · Follow-up</Txt>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTY STRIP */}
      <section style={{ background: "#fff", padding: "36px 24px", borderBottom: "1px solid #E8EDF4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <Txt style={{ fontSize: 12, color: "#94A3B8", marginBottom: 20, letterSpacing: ".06em", fontWeight: 600, fontFamily: "var(--font-manrope,'Manrope',sans-serif)" }}>
            DESIGNED FOR CLINICIANS ACROSS EVERY SPECIALTY
          </Txt>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 32px" }}>
            {["Family Medicine","Internal Medicine","Emergency Medicine","Cardiology","Pediatrics","Psychiatry","Orthopedics","OB/GYN"].map((s) => (
              <span key={s} style={{ fontSize: 13.5, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 600, color: "#CBD5E1" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ background: "#F8FAFC", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
            <Chip label="The Documentation Problem" />
            <H tag="h2" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#10233F", margin: "20px 0 16px" }}>
              Documentation Consumes Clinical Time
            </H>
            <Txt style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7 }}>
              Healthcare professionals spend hours each day on paperwork, leaving less time for the care that matters most.
            </Txt>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
            {[
              { icon: Clock, title: "After-Hours Charting", desc: "Documentation burden extends long after the last patient leaves the clinic." },
              { icon: FileText, title: "Repetitive Structuring", desc: "Writing the same clinical note sections repeatedly for every encounter." },
              { icon: Calendar, title: "Consultation Prep Time", desc: "Hours spent reviewing charts before consultations without organized access." },
              { icon: FolderX, title: "Fragmented Records", desc: "Patient history scattered across systems, making context retrieval slow." },
              { icon: LogOut, title: "Discharge Documentation", desc: "Discharge summaries require significant time and cross-team coordination." },
              { icon: AlertCircle, title: "Documentation Gaps", desc: "Incomplete records affecting care continuity and clinical coding." },
              { icon: ClipboardList, title: "Administrative Burden", desc: "Non-clinical tasks consuming time that belongs at the bedside." },
              { icon: Activity, title: "Coding Complexity", desc: "ICD-10 coding without documentation references slows down billing." },
            ].map((item) => (
              <div key={item.title} className="card card-hover" style={{ padding: "24px" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(23,105,232,.07)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <item.icon size={18} color="#1769E8" />
                </div>
                <H tag="h3" style={{ fontSize: 14, fontWeight: 800, color: "#10233F", marginBottom: 8 }}>{item.title}</H>
                <Txt style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{item.desc}</Txt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM 3 PHASES */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 64px" }}>
            <Chip label="Connected Documentation" bg="rgba(22,184,166,.08)" color="#16B8A6" />
            <H tag="h2" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#10233F", margin: "20px 0 16px" }}>
              Supporting the Full Encounter
            </H>
            <Txt style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7 }}>
              CarePen works with clinicians before, during, and after every patient consultation.
            </Txt>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {[
              { n: "01", label: "Pre Visit", color: "#1769E8", headline: "Arrive prepared for every consultation", desc: "Review structured summaries, active conditions, medications, allergies, and previous notes before the patient arrives.", items: ["Patient Summary View","Medical History Overview","Medication Overview","Previous Encounter Summary","Active Problem List"] },
              { n: "02", label: "In Visit", color: "#16B8A6", headline: "Be present with the patient", desc: "The ambient scribe captures the consultation naturally. No manual notes during the encounter.", items: ["Ambient Medical Scribe","Multi-Speaker Attribution","Real-Time Transcription","Live Encounter Recap","Multilingual Support"] },
              { n: "03", label: "Post Visit", color: "#10233F", headline: "Complete documentation in minutes", desc: "CarePen generates structured drafts. Clinicians review and approve before anything enters the official record.", items: ["HPI Generator","Assessment and Plan","Patient Instructions","Discharge Summary","Clinical Coding Assistance"] },
            ].map((stage) => (
              <div key={stage.n} className="card" style={{ padding: "32px", borderTop: `3px solid ${stage.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 11, fontWeight: 700, color: `${stage.color}80` }}>{stage.n}</span>
                  <span style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12, fontWeight: 800, background: stage.color, color: "#fff", padding: "3px 12px", borderRadius: 999 }}>{stage.label}</span>
                </div>
                <H tag="h3" style={{ fontSize: 20, fontWeight: 900, color: "#10233F", marginBottom: 10 }}>{stage.headline}</H>
                <Txt style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 20 }}>{stage.desc}</Txt>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {stage.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={14} color={stage.color} style={{ flexShrink: 0 }} />
                      <Txt style={{ fontSize: 13.5, color: "#1E293B" }}>{item}</Txt>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#F8FAFC", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
            <Chip label="Platform Capabilities" />
            <H tag="h2" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#10233F", margin: "20px 0 16px" }}>
              Every Tool Clinicians Need
            </H>
            <Txt style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7 }}>
              A complete suite organized around how clinicians actually document.
            </Txt>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginBottom: 40 }}>
            {[
              { icon: Mic, title: "Ambient Medical Scribe", desc: "Capture consultations and generate structured notes from clinical conversation, hands-free.", color: "#1769E8" },
              { icon: Users, title: "Patient Summaries", desc: "Instant, organized summaries of patient history, conditions, medications, and recent visits.", color: "#16B8A6" },
              { icon: BookOpen, title: "HPI Generator", desc: "Structured History of Present Illness documentation generated from consultation context.", color: "#1769E8" },
              { icon: ClipboardList, title: "Assessment and Plan", desc: "Draft clinical assessments and treatment plans for each active problem addressed.", color: "#16B8A6" },
              { icon: MessageSquare, title: "Patient Instructions", desc: "Plain-language post-visit instructions covering treatment, medications, and next steps.", color: "#1769E8" },
              { icon: LogOut, title: "Discharge Summary", desc: "Organized discharge documentation with hospital course, instructions, and follow-up plans.", color: "#16B8A6" },
              { icon: FileText, title: "Referral Letters", desc: "Structured referral letters with relevant patient encounter information for specialists.", color: "#1769E8" },
              { icon: BarChart3, title: "Clinical Coding Assistance", desc: "ICD-10 suggestions with documentation references, for clinician review and selection.", color: "#16B8A6" },
              { icon: Stethoscope, title: "Specialty Templates", desc: "Pre-configured templates for over ten specialties with customizable documentation sections.", color: "#1769E8" },
              { icon: Activity, title: "Documentation Analytics", desc: "Track note completion rates, encounter volume, and documentation workflow efficiency.", color: "#16B8A6" },
              { icon: CheckCircle2, title: "Completeness Review", desc: "Identify missing sections and documentation gaps before notes are finalized.", color: "#1769E8" },
              { icon: Sparkles, title: "Multilingual Support", desc: "Support for consultations in multiple languages with automatic language detection.", color: "#16B8A6" },
            ].map((f) => (
              <div key={f.title} className="card card-hover" style={{ padding: "22px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <f.icon size={18} color={f.color} />
                </div>
                <div>
                  <H tag="h3" style={{ fontSize: 14, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>{f.title}</H>
                  <Txt style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</Txt>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/features" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 14, fontWeight: 700, color: "#1769E8", textDecoration: "none" }}>
              Explore all features <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 64px" }}>
            <Chip label="Simple Workflow" bg="rgba(22,184,166,.08)" color="#16B8A6" />
            <H tag="h2" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#10233F", margin: "20px 0 16px" }}>
              How CarePen Works
            </H>
            <Txt style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7 }}>
              From consultation preparation to signed documentation in four straightforward steps.
            </Txt>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32 }}>
            {[
              { n: "1", title: "Prepare", color: "#1769E8", desc: "Review patient summaries, conditions, and previous encounters before the consultation begins." },
              { n: "2", title: "Capture", color: "#2278EE", desc: "Record the consultation with patient consent. Ambient audio capture or manual input." },
              { n: "3", title: "Generate", color: "#19A89E", desc: "CarePen processes the encounter and produces structured clinical documentation drafts." },
              { n: "4", title: "Review", color: "#16B8A6", desc: "The clinician reviews, edits, and approves. Nothing enters the record without sign-off." },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
                  background: `linear-gradient(135deg,${step.color},${step.color}BB)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 6px 20px ${step.color}40` }}>
                  <H tag="span" style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{step.n}</H>
                </div>
                <H tag="h3" style={{ fontSize: 17, fontWeight: 900, color: "#10233F", marginBottom: 10 }}>{step.title}</H>
                <Txt style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.65 }}>{step.desc}</Txt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section style={{ background: "#F8FAFC", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {[
              { icon: Shield, color: "#1769E8", title: "Clinician-Controlled", desc: "No note is finalized without explicit clinician review and approval. CarePen generates drafts. You make all final decisions." },
              { icon: CheckCircle2, color: "#16B8A6", title: "HIPAA-Aware Architecture", desc: "Designed with safeguards relevant to protected health information. Appropriate BAA required before processing PHI." },
              { icon: Sparkles, color: "#1769E8", title: "Transparent AI Outputs", desc: "CarePen clearly distinguishes documented facts from AI-generated suggestions and references source records where possible." },
            ].map((p) => (
              <div key={p.title} className="card" style={{ padding: "28px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${p.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <p.icon size={22} color={p.color} />
                </div>
                <H tag="h3" style={{ fontSize: 16, fontWeight: 900, color: "#10233F", marginBottom: 10 }}>{p.title}</H>
                <Txt style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.65 }}>{p.desc}</Txt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#10233F", padding: "96px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "30%", width: 400, height: 400, borderRadius: "50%", background: "rgba(23,105,232,.15)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "25%", width: 300, height: 300, borderRadius: "50%", background: "rgba(22,184,166,.1)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Chip label="Get Started Today" bg="rgba(103,213,208,.1)" color="#67D5D0" />
          <H tag="h2" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "#fff", margin: "24px 0 20px", lineHeight: 1.1 }}>
            Start Documenting Smarter
          </H>
          <Txt style={{ fontSize: 18, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 40 }}>
            Join clinicians who use CarePen to spend less time on documentation and more time with their patients.
          </Txt>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" className="btn btn-blue" style={{ fontSize: 15, padding: "14px 28px" }}>
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="btn btn-ghost-white" style={{ fontSize: 15, padding: "14px 28px" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
