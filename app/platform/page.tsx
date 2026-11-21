import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Mic, Users, FileText, Search, BarChart3, CheckCircle2, Shield, Activity, MessageSquare } from "lucide-react";

const W: React.CSSProperties = { maxWidth: "1120px", margin: "0 auto", padding: "0 24px" };

export default function PlatformPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navigation />

      {/* Hero */}
      <section className="hero-bg" style={{ padding: "160px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span className="chip" style={{ background: "rgba(103,213,208,.12)", color: "#67D5D0", border: "1px solid rgba(103,213,208,.2)", marginBottom: "20px", display: "inline-flex" }}>The CarePen Platform</span>
          <h1 className="font-manrope" style={{ fontSize: "clamp(38px,5vw,60px)", fontWeight: 800, color: "#fff", marginBottom: "18px", letterSpacing: "-.02em", lineHeight: 1.08 }}>
            AI Documentation Built for<br /><span className="text-light-grad">Clinical Reality</span>
          </h1>
          <p className="font-inter" style={{ fontSize: "18px", color: "rgba(255,255,255,.55)", lineHeight: 1.65, maxWidth: "560px", margin: "0 auto 36px" }}>
            CarePen integrates with every stage of the clinical encounter: before, during, and after the consultation, reducing documentation time without compromising quality.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" className="btn btn-blue font-manrope" style={{ fontSize: "15px", padding: "14px 28px" }}>Start Free Trial <ArrowRight size={16} /></Link>
            <Link href="/pricing" className="btn btn-ghost-white font-manrope" style={{ fontSize: "15px", padding: "14px 28px" }}>View Pricing</Link>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section style={{ background: "#fff", padding: "96px 24px" }}>
        <div style={W}>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 56px" }}>
            <span className="chip" style={{ background: "rgba(23,105,232,.08)", color: "#1769E8", marginBottom: "16px", display: "inline-flex" }}>Platform Architecture</span>
            <h2 className="font-manrope" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#10233F", marginBottom: "14px", letterSpacing: "-.02em" }}>Supporting the Full Encounter</h2>
            <p className="font-inter" style={{ fontSize: "17px", color: "#64748B", lineHeight: 1.65 }}>Documentation assistance at every touchpoint of the clinical day.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              {
                phase: "01", label: "Pre Visit", color: "#1769E8", bg: "rgba(23,105,232,.04)", border: "rgba(23,105,232,.12)", iconComponent: Users,
                headline: "Walk in prepared. Every time.",
                desc: "Before a patient arrives, CarePen surfaces a structured overview of everything relevant: active problems, current medications, allergies, prior encounters, pending results, and outstanding tasks. Clinicians spend less time hunting for context.",
                items: ["Patient Summary View", "Medical History Overview", "Medication and Allergy Overview", "Previous Encounter Summary", "Active Problem List"],
                reverse: false,
              },
              {
                phase: "02", label: "In Visit", color: "#16B8A6", bg: "rgba(22,184,166,.04)", border: "rgba(22,184,166,.14)", iconComponent: Mic,
                headline: "Be present with the patient.",
                desc: "The ambient scribe listens to the consultation with patient consent, automatically attributing speech to the clinician and patient. No manual note-taking required during the encounter.",
                items: ["Ambient Medical Scribe", "Multi-Speaker Attribution", "Real-Time Transcription", "Live Encounter Recap", "Multilingual Support"],
                reverse: true,
              },
              {
                phase: "03", label: "Post Visit", color: "#10233F", bg: "rgba(16,35,63,.03)", border: "rgba(16,35,63,.1)", iconComponent: FileText,
                headline: "Complete documentation in minutes.",
                desc: "After the encounter, CarePen generates structured drafts for every documentation requirement. The clinician reviews, edits, and approves. Nothing enters the official record without explicit sign-off.",
                items: ["HPI Generator", "Assessment and Plan Draft", "Patient Instructions", "Discharge Summary", "Referral Letter", "Clinical Coding Suggestions"],
                reverse: false,
              },
            ].map((stage) => {
              const IconComp = stage.iconComponent;
              return (
                <div key={stage.label} className="card" style={{ padding: "0", overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div style={{ padding: "48px", order: stage.reverse ? 2 : 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                        <span className="font-manrope" style={{ fontSize: "11px", fontWeight: 700, color: stage.color, opacity: .4 }}>{stage.phase}</span>
                        <span className="chip font-manrope" style={{ background: stage.color, color: "#fff", fontSize: "11.5px" }}>{stage.label}</span>
                      </div>
                      <h3 className="font-manrope" style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 800, color: "#10233F", marginBottom: "12px", letterSpacing: "-.015em" }}>{stage.headline}</h3>
                      <p className="font-inter" style={{ fontSize: "15px", color: "#64748B", lineHeight: 1.7, marginBottom: "24px" }}>{stage.desc}</p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
                        {stage.items.map((item) => (
                          <li key={item} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                            <CheckCircle2 size={14} color={stage.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                            <span className="font-inter" style={{ fontSize: "13.5px", color: "#202B3A" }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ background: stage.bg, borderLeft: stage.reverse ? "none" : `1px solid ${stage.border}`, borderRight: stage.reverse ? `1px solid ${stage.border}` : "none", display: "flex", alignItems: "center", justifyContent: "center", order: stage.reverse ? 1 : 2, minHeight: "280px" }}>
                      <div style={{ textAlign: "center", padding: "48px" }}>
                        <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: `${stage.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                          <IconComp size={32} color={stage.color} />
                        </div>
                        <p className="font-manrope" style={{ fontWeight: 700, color: stage.color, fontSize: "15px", marginBottom: "5px" }}>{stage.label} Tools</p>
                        <p className="font-inter" style={{ color: "#94A3B8", fontSize: "13px" }}>{stage.items.length} capabilities</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="section-alt" style={{ padding: "88px 24px" }}>
        <div style={W}>
          <div style={{ textAlign: "center", maxWidth: "480px", margin: "0 auto 48px" }}>
            <h2 className="font-manrope" style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, color: "#10233F", letterSpacing: "-.02em" }}>Built with Clinical Safety in Mind</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "14px" }}>
            {[
              { icon: Shield,       color: "#1769E8", title: "Clinician Approval Required",   desc: "Every AI-generated output requires explicit clinician review and sign-off before it can be saved to patient records." },
              { icon: CheckCircle2, color: "#16B8A6", title: "HIPAA-Aware Architecture",       desc: "Designed with safeguards relevant to protected health information. BAA available before processing PHI." },
              { icon: Activity,     color: "#1769E8", title: "Source Referenced",              desc: "AI suggestions clearly distinguish documented facts from generated content and reference source records where possible." },
              { icon: Search,       color: "#16B8A6", title: "Audit Trail",                   desc: "Every documentation action is logged with timestamps, provider identity, and change history for compliance review." },
              { icon: BarChart3,    color: "#1769E8", title: "No Independent Diagnosis",       desc: "CarePen assists with documentation only. The platform does not independently diagnose, prescribe, or make clinical decisions." },
              { icon: MessageSquare,color: "#16B8A6", title: "Consent-Based Recording",        desc: "Ambient scribe functionality requires explicit patient consent before any recording or transcription begins." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card card-hover" style={{ padding: "22px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: `${color}0E`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Icon size={17} color={color} />
                </div>
                <h3 className="font-manrope" style={{ fontSize: "13.5px", fontWeight: 700, color: "#10233F", marginBottom: "6px" }}>{title}</h3>
                <p className="font-inter" style={{ fontSize: "12.5px", color: "#64748B", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#10233F", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h2 className="font-manrope" style={{ fontSize: "clamp(30px,4vw,44px)", fontWeight: 800, color: "#fff", marginBottom: "14px", letterSpacing: "-.02em" }}>See CarePen in Action</h2>
          <p className="font-inter" style={{ color: "rgba(255,255,255,.5)", fontSize: "17px", marginBottom: "32px", lineHeight: 1.65 }}>Start your free trial and experience the full platform with demo data before connecting any patient records.</p>
          <Link href="/signup" className="btn btn-blue font-manrope" style={{ fontSize: "15px", padding: "14px 28px" }}>Start Free Trial <ArrowRight size={16} /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
