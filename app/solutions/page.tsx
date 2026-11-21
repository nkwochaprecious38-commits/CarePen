import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

const specialties = [
  { name: "Family Medicine", color: "#1769E8", challenges: "High patient volume with diverse, multi-problem encounters requiring comprehensive, well-structured notes.", features: ["Comprehensive SOAP notes","Chronic disease management templates","Preventive care checklists","Multi-condition encounter support"] },
  { name: "Internal Medicine", color: "#16B8A6", challenges: "Complex patients with multiple comorbidities requiring detailed, structured documentation across all systems.", features: ["Multi-system review templates","Differential diagnosis support","Comprehensive hospital admissions","Detailed progress notes"] },
  { name: "Emergency Medicine", color: "#1769E8", challenges: "High acuity, fast-paced environment where every minute of documentation time is a minute away from patient care.", features: ["Rapid documentation capture","Triage-to-discharge note flow","Procedure documentation","Medical decision-making templates"] },
  { name: "Cardiology", color: "#16B8A6", challenges: "Specialized terminology, complex diagnostic workups, and detailed procedure documentation.", features: ["Cardiology-specific templates","Echo and stress test documentation","Catheterization procedure notes","Cardiac rehab documentation"] },
  { name: "Pediatrics", color: "#1769E8", challenges: "Weight-based calculations, developmental milestones, and age-specific encounter documentation.", features: ["Growth and development templates","Immunization documentation","Age-specific note formats","Parent instruction generation"] },
  { name: "Psychiatry", color: "#16B8A6", challenges: "Sensitive encounter documentation requiring precise language and structured mental status assessments.", features: ["Mental status examination templates","Therapy session documentation","Risk assessment frameworks","Medication management notes"] },
  { name: "Orthopedics", color: "#1769E8", challenges: "Procedure-heavy specialty requiring detailed operative notes and physical examination documentation.", features: ["Musculoskeletal examination templates","Pre and post-operative notes","Procedure documentation","Physical therapy referrals"] },
  { name: "OB/GYN", color: "#16B8A6", challenges: "Prenatal visit templates, delivery documentation, and gynecologic examination notes.", features: ["Prenatal visit templates","Labor and delivery notes","Gynecologic examination documentation","Postpartum care notes"] },
];

export default function SolutionsPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navigation />

      {/* Hero */}
      <section className="hero-bg" style={{ paddingTop: 160, paddingBottom: 96, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(103,213,208,.1)", color: "#67D5D0", border: "1px solid rgba(103,213,208,.2)", borderRadius: 999, padding: "6px 16px", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 12, fontWeight: 700, letterSpacing: ".05em", marginBottom: 28 }}>
            Solutions by Specialty
          </span>
          <H tag="h1" style={{ fontSize: "clamp(38px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, color: "#fff", marginBottom: 24 }}>
            Documentation Built for<br />
            <span className="text-light-grad">Every Specialty</span>
          </H>
          <Txt style={{ fontSize: 18, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px" }}>
            CarePen adapts to the specific documentation requirements of each clinical specialty with tailored templates, terminology, and workflows.
          </Txt>
          <Link href="/signup" className="btn btn-blue" style={{ fontSize: 15, padding: "14px 28px" }}>
            Start Free Trial <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Specialties grid */}
      <section style={{ background: "#F8FAFC", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
            <span style={{ display: "inline-flex", background: "rgba(23,105,232,.08)", color: "#1769E8", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", marginBottom: 16 }}>Supported Specialties</span>
            <H tag="h2" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#10233F", marginBottom: 14 }}>Tailored to Your Practice</H>
            <Txt style={{ fontSize: 17, color: "#64748B", lineHeight: 1.65 }}>Specialty-specific templates and terminology reduce configuration time and improve documentation accuracy.</Txt>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(460px,1fr))", gap: 16 }}>
            {specialties.map((s) => (
              <div key={s.name} className="card card-hover" style={{ padding: "28px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${s.color},${s.color}BB)` }}>
                    <H tag="span" style={{ fontWeight: 900, fontSize: 16, color: "#fff" }}>{s.name.charAt(0)}</H>
                  </div>
                  <div style={{ flex: 1 }}>
                    <H tag="h3" style={{ fontSize: 16, fontWeight: 800, color: "#10233F", marginBottom: 6 }}>{s.name}</H>
                    <Txt style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 14 }}>{s.challenges}</Txt>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {s.features.map((f) => (
                        <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                          <CheckCircle2 size={13} color={s.color} style={{ flexShrink: 0, marginTop: 1 }} />
                          <Txt style={{ fontSize: 12, color: "#374151" }}>{f}</Txt>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice settings */}
      <section style={{ background: "#fff", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
            <span style={{ display: "inline-flex", background: "rgba(22,184,166,.08)", color: "#16B8A6", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", marginBottom: 16 }}>Practice Settings</span>
            <H tag="h2" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#10233F" }}>Works Across Care Settings</H>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { title: "Outpatient Clinic", color: "#1769E8", desc: "High-volume ambulatory care with same-day note completion and efficient documentation workflows for every encounter type.", points: ["Follow-up and new patient notes","Annual wellness documentation","Chronic disease management","Referral coordination"] },
              { title: "Hospital Inpatient", color: "#16B8A6", desc: "Admission notes, daily progress notes, consult notes, and discharge documentation for hospitalized patients.", points: ["Admission history and physical","Daily progress notes","Consultation responses","Discharge summaries"] },
              { title: "Urgent Care", color: "#1769E8", desc: "Fast-paced environment requiring rapid documentation without sacrificing completeness or clinical accuracy.", points: ["Acute visit documentation","Rapid note generation","After-visit instructions","Specialist referral letters"] },
            ].map((s) => (
              <div key={s.title} className="card card-hover" style={{ padding: "28px" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}0E`, marginBottom: 16 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: s.color }} />
                </div>
                <H tag="h3" style={{ fontSize: 17, fontWeight: 800, color: "#10233F", marginBottom: 8 }}>{s.title}</H>
                <Txt style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.65, marginBottom: 16 }}>{s.desc}</Txt>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={13} color={s.color} style={{ flexShrink: 0 }} />
                      <Txt style={{ fontSize: 13.5, color: "#374151" }}>{pt}</Txt>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#10233F", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <H tag="h2" style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>See Your Specialty in Action</H>
          <Txt style={{ fontSize: 17, color: "rgba(255,255,255,.5)", lineHeight: 1.7, marginBottom: 36 }}>Start with our specialty templates or customize your own documentation workflow.</Txt>
          <Link href="/signup" className="btn btn-blue" style={{ fontSize: 15, padding: "14px 28px" }}>
            Get Started Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
