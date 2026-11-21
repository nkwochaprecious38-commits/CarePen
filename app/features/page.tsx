import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight, Mic, Users, FileText, Search, ClipboardList, BookOpen,
  MessageSquare, LogOut, BarChart3, CheckCircle2, Shield, Activity,
  Calendar, Languages, Stethoscope, Sparkles,
} from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

const featureGroups = [
  {
    label: "Pre Visit", color: "#1769E8",
    features: [
      { icon: Users, name: "Patient Summary", desc: "A single-view summary of the patient's active problems, medications, allergies, vitals history, and recent encounters before the consultation begins." },
      { icon: BookOpen, name: "Medical History Overview", desc: "Organized historical context including past diagnoses, surgical history, family history, and social history drawn from documented records." },
      { icon: FileText, name: "Previous Encounter Summary", desc: "A structured recap of the most recent visits with key findings, decisions made, and outstanding follow-up items." },
      { icon: ClipboardList, name: "Active Problem List", desc: "Current active conditions with associated medications, last reviewed status, and documentation of management approach." },
      { icon: Calendar, name: "Upcoming Tasks Review", desc: "Outstanding tasks, follow-up items, and ordered tests that have not yet been completed or reviewed." },
    ],
  },
  {
    label: "In Visit", color: "#16B8A6",
    features: [
      { icon: Mic, name: "Ambient Medical Scribe", desc: "Hands-free encounter capture that records the consultation with patient consent and processes the conversation into structured clinical documentation." },
      { icon: Users, name: "Multi-Speaker Attribution", desc: "Automatically identifies and attributes speech to the clinician and patient throughout the consultation for accurate contextual understanding." },
      { icon: Activity, name: "Real-Time Transcription", desc: "Transcribes the consultation in real time with medical terminology recognition and specialty-specific vocabulary support." },
      { icon: Search, name: "Live Encounter Recap", desc: "A live-updating summary of the consultation as it progresses, allowing clinicians to verify captured information during the visit." },
      { icon: Languages, name: "Multilingual Support", desc: "Support for consultations conducted in multiple languages, with automatic language detection and bilingual documentation options." },
    ],
  },
  {
    label: "Post Visit", color: "#0C1E38",
    features: [
      { icon: BookOpen, name: "HPI Generator", desc: "Structured History of Present Illness documentation generated from the consultation, organized around the chief complaint with onset, duration, and associated symptoms." },
      { icon: ClipboardList, name: "Assessment and Plan", desc: "Draft assessment with working diagnoses and a structured treatment plan for each active problem addressed during the encounter." },
      { icon: MessageSquare, name: "Patient Instructions", desc: "Plain-language post-visit instructions covering diagnosis explanation, treatment guidance, medication information, and next steps." },
      { icon: LogOut, name: "Discharge Summary", desc: "Structured discharge documentation for hospital encounters including hospital course, discharge diagnosis, discharge medications, and follow-up instructions." },
      { icon: FileText, name: "Referral Letter", desc: "Professional referral letters with relevant patient history, reason for referral, and pertinent clinical findings formatted for the receiving specialist." },
      { icon: BarChart3, name: "Clinical Coding Assistance", desc: "ICD-10 diagnosis code suggestions with supporting documentation references for each suggested code, for clinician review and selection." },
      { icon: CheckCircle2, name: "Completeness Review", desc: "Automated review of drafted documentation identifying missing sections, incomplete elements, or inconsistencies before note finalization." },
      { icon: Stethoscope, name: "Specialty Templates", desc: "Pre-configured documentation templates for over ten clinical specialties, each customizable to individual clinician or practice preferences." },
    ],
  },
  {
    label: "Analytics and Management", color: "#1769E8",
    features: [
      { icon: BarChart3, name: "Documentation Analytics", desc: "Track documentation completion rates, average note generation time, encounter volume, and outstanding review items across your practice." },
      { icon: Activity, name: "Team Performance Overview", desc: "Aggregate reporting for clinical teams showing documentation activity, note quality metrics, and workflow efficiency indicators." },
      { icon: Shield, name: "Audit Trail", desc: "Complete log of every documentation action with timestamps, provider attribution, and change history for compliance and quality review." },
      { icon: Sparkles, name: "AI Confidence Indicators", desc: "Transparency markers on AI-generated content showing confidence levels and source references to support informed clinician review." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navigation />

      {/* Hero */}
      <section className="hero-bg" style={{ paddingTop: 160, paddingBottom: 96, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(103,213,208,.1)", color: "#67D5D0",
            border: "1px solid rgba(103,213,208,.2)", borderRadius: 999, padding: "6px 16px",
            fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12, fontWeight: 700, letterSpacing: ".05em",
            marginBottom: 28,
          }}>
            Platform Features
          </span>
          <H tag="h1" style={{ fontSize: "clamp(38px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, color: "#fff", marginBottom: 24 }}>
            Every Feature<br />
            <span className="text-light-grad">Clinicians Need</span>
          </H>
          <Txt style={{ fontSize: 18, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            A complete clinical documentation suite organized around the full encounter lifecycle.
          </Txt>
          <Link href="/signup" className="btn btn-blue" style={{ fontSize: 15, padding: "14px 28px" }}>
            Start Free Trial <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Feature groups */}
      {featureGroups.map((group, gi) => (
        <section key={group.label} style={{ padding: "80px 24px", background: gi % 2 === 0 ? "#fff" : "#F8FAFC" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
              <span style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontWeight: 800, fontSize: 12, background: group.color, color: "#fff", padding: "4px 16px", borderRadius: 999 }}>
                {group.label}
              </span>
              <div style={{ flex: 1, height: 1, background: `${group.color}20` }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
              {group.features.map((f) => (
                <div key={f.name} className="card card-hover" style={{ padding: "24px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${group.color}0E` }}>
                    <f.icon size={19} color={group.color} />
                  </div>
                  <div>
                    <H tag="h3" style={{ fontSize: 14, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>{f.name}</H>
                    <Txt style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</Txt>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ background: "#10233F", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <H tag="h2" style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
            Start Documenting Better Today
          </H>
          <Txt style={{ fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 36 }}>
            All features available during your free trial. No credit card required.
          </Txt>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Link href="/signup" className="btn btn-blue" style={{ fontSize: 15, padding: "13px 24px" }}>
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="btn btn-ghost-white" style={{ fontSize: 15, padding: "13px 24px" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
