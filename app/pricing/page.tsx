import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Building2, Sparkles } from "lucide-react";

const W: React.CSSProperties = { maxWidth: "1120px", margin: "0 auto", padding: "0 24px" };

const plans = [
  {
    name: "Starter",
    price: "$47",
    period: "/month",
    description: "For individual clinicians starting with AI documentation.",
    color: "#1769E8",
    icon: Zap,
    href: "https://selar.com/47plan?currency=USD",
    highlight: false,
    features: [
      "Ambient Medical Scribe",
      "Up to 50 encounters per month",
      "Patient summaries",
      "HPI and Assessment drafts",
      "Patient instructions generator",
      "Basic clinical note templates",
      "Export to PDF",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$57",
    period: "/month",
    description: "For busy clinicians who need a complete documentation suite.",
    color: "#1769E8",
    icon: Sparkles,
    href: "https://selar.com/57plan?currency=USD",
    highlight: true,
    features: [
      "Everything in Starter",
      "Unlimited encounters",
      "Discharge summary generator",
      "Referral letter generator",
      "Clinical coding assistance",
      "Completeness review",
      "Specialty templates (10+)",
      "Multi-language support",
      "Documentation analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$97",
    period: "/month",
    description: "For clinics and healthcare teams needing shared workflows.",
    color: "#16B8A6",
    icon: Building2,
    href: "https://selar.com/97plan?currency=USD",
    highlight: false,
    features: [
      "Everything in Professional",
      "Team workspace",
      "Up to 5 providers",
      "Shared patient records",
      "Team analytics dashboard",
      "Admin controls",
      "Custom branding options",
      "Dedicated account manager",
      "BAA available on request",
      "SLA and uptime commitment",
    ],
  },
];

export default function PricingPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navigation />

      {/* Hero */}
      <section style={{ background: "#fff", padding: "160px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <span className="chip" style={{ background: "rgba(23,105,232,.08)", color: "#1769E8", marginBottom: "20px", display: "inline-flex" }}>Simple, Transparent Pricing</span>
          <h1 className="font-manrope" style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, color: "#10233F", marginBottom: "16px", letterSpacing: "-.02em" }}>
            Choose Your Plan
          </h1>
          <p className="font-inter" style={{ fontSize: "18px", color: "#64748B", lineHeight: 1.65, maxWidth: "420px", margin: "0 auto" }}>
            All plans include a 14-day free trial. No credit card required to start. Cancel any time.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-alt" style={{ padding: "0 24px 96px" }}>
        <div style={W}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px", alignItems: "stretch" }}>
            {plans.map((plan) => {
              const Icon = plan.icon;
              if (plan.highlight) {
                return (
                  <div key={plan.name} style={{ background: "#10233F", borderRadius: "20px", border: "2px solid #1769E8", boxShadow: "0 24px 64px rgba(16,35,63,.35)", position: "relative", overflow: "hidden", padding: "36px 32px", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#1769E8,#16B8A6)" }} />
                    <div style={{ marginBottom: "24px" }}>
                      <span className="chip font-manrope" style={{ background: "rgba(103,213,208,.15)", color: "#67D5D0", border: "1px solid rgba(103,213,208,.2)", marginBottom: "16px", display: "inline-flex", fontSize: "11px" }}>Most Popular</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(23,105,232,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={18} color="#67D5D0" />
                        </div>
                        <h2 className="font-manrope" style={{ fontWeight: 800, fontSize: "22px", color: "#fff" }}>{plan.name}</h2>
                      </div>
                      <p className="font-inter" style={{ fontSize: "14px", color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>{plan.description}</p>
                    </div>
                    <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                        <span className="font-manrope" style={{ fontSize: "58px", lineHeight: 1, fontWeight: 800, color: "#fff" }}>{plan.price}</span>
                        <span className="font-inter" style={{ fontSize: "15px", color: "rgba(255,255,255,.35)", marginBottom: "10px" }}>{plan.period}</span>
                      </div>
                    </div>
                    <a href={plan.href} target="_blank" rel="noopener noreferrer" className="btn btn-blue font-manrope" style={{ justifyContent: "center", marginBottom: "28px", fontSize: "15px" }}>
                      Get Started <ArrowRight size={15} />
                    </a>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                      {plan.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <CheckCircle2 size={15} color="#16B8A6" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "1px" }} />
                          <span className="font-inter" style={{ fontSize: "13.5px", color: "rgba(255,255,255,.75)" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <div key={plan.name} className="card card-hover" style={{ padding: "36px 32px", display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: `${plan.color}0E`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={18} color={plan.color} />
                      </div>
                      <h2 className="font-manrope" style={{ fontWeight: 800, fontSize: "22px", color: "#10233F" }}>{plan.name}</h2>
                    </div>
                    <p className="font-inter" style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6 }}>{plan.description}</p>
                  </div>
                  <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid #E8EDF4" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                      <span className="font-manrope" style={{ fontSize: "58px", lineHeight: 1, fontWeight: 800, color: "#10233F" }}>{plan.price}</span>
                      <span className="font-inter" style={{ fontSize: "15px", color: "#94A3B8", marginBottom: "10px" }}>{plan.period}</span>
                    </div>
                  </div>
                  <a href={plan.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-blue font-manrope" style={{ justifyContent: "center", marginBottom: "28px", fontSize: "15px", padding: "13px 20px" }}>
                    Get Started <ArrowRight size={15} />
                  </a>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <CheckCircle2 size={15} color={plan.color} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "1px" }} />
                        <span className="font-inter" style={{ fontSize: "13.5px", color: "#374151" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "88px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <h2 className="font-manrope" style={{ fontSize: "clamp(26px,3.5vw,34px)", fontWeight: 800, color: "#10233F", textAlign: "center", marginBottom: "44px", letterSpacing: "-.015em" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { q: "Is there a free trial?",           a: "Yes. All plans include a 14-day free trial. No credit card is required to start." },
              { q: "Can I change my plan later?",      a: "You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle." },
              { q: "Is CarePen HIPAA-compliant?",      a: "CarePen is designed with HIPAA-aware architecture. Before processing protected health information, an appropriate Business Associate Agreement must be in place. Contact our team for more details." },
              { q: "What specialties does CarePen support?", a: "CarePen supports over ten clinical specialties including Family Medicine, Internal Medicine, Emergency Medicine, Cardiology, Pediatrics, Psychiatry, and more." },
              { q: "Do I need to install any hardware?", a: "No. CarePen works in your browser. No additional hardware or software installation is required." },
            ].map((item) => (
              <div key={item.q} className="card" style={{ padding: "22px 26px" }}>
                <h3 className="font-manrope" style={{ fontWeight: 700, color: "#10233F", fontSize: "15px", marginBottom: "7px" }}>{item.q}</h3>
                <p className="font-inter" style={{ fontSize: "13.5px", color: "#64748B", lineHeight: 1.65 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-alt" style={{ padding: "88px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 className="font-manrope" style={{ fontSize: "clamp(28px,4vw,38px)", fontWeight: 800, color: "#10233F", marginBottom: "14px", letterSpacing: "-.02em" }}>Ready to Reclaim Your Time?</h2>
          <p className="font-inter" style={{ fontSize: "17px", color: "#64748B", marginBottom: "32px", lineHeight: 1.65 }}>Start your free trial today. No credit card required.</p>
          <Link href="/signup" className="btn btn-blue font-manrope" style={{ fontSize: "15px", padding: "14px 28px" }}>
            Start Free Trial <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
