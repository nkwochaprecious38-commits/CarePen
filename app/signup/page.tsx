"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, PenLine, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const H = ({ tag: T = "h2", style = {}, children, ...p }: any) => (
  <T style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", ...style }} {...p}>{children}</T>
);
const Txt = ({ style = {}, children, ...p }: any) => (
  <p style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", ...style }} {...p}>{children}</p>
);

const inputBase: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: 10,
  border: "1.5px solid #E2E8F0", background: "#FAFBFC",
  fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 14, color: "#0C1E38",
  outline: "none", boxSizing: "border-box", display: "block",
};

const specialties = [
  "Family Medicine","Internal Medicine","Emergency Medicine","Cardiology",
  "Pediatrics","Psychiatry","Orthopedics","OB/GYN","Neurology","Other",
];

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value.trim();
    const specialty = (form.elements.namedItem("specialty") as HTMLSelectElement).value;

    if (!email || !password || !firstName || !lastName || !specialty) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName, specialty },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data?.user && !data.session) {
        // Email confirmation required
        setError("Please check your email and click the confirmation link to activate your account.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setError(err?.message ?? "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F5F7FA" }}>
      {/* Left branding panel */}
      <div className="hero-bg" style={{ width: 480, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 48 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1769E8,#16B8A6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PenLine size={18} color="#fff" />
          </div>
          <H tag="span" style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>CarePen</H>
        </Link>

        <div>
          <H tag="h2" style={{ fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 16 }}>
            Start documenting better in minutes.
          </H>
          <Txt style={{ color: "rgba(255,255,255,.5)", fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            Full access to all features. Clinician approval required on every note.
          </Txt>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "AI scribe, notes, summaries, and more",
              "Clinician approval required on every note",
              "No notes enter records without your sign-off",
              "Cancel any time, no contracts",
            ].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={15} color="#16B8A6" style={{ flexShrink: 0 }} />
                <Txt style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)" }}>{t}</Txt>
              </div>
            ))}
          </div>
        </div>

        <Txt style={{ fontSize: 12.5, color: "rgba(255,255,255,.22)" }}>
          Processing of PHI requires an executed Business Associate Agreement.
        </Txt>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div className="card" style={{ padding: 40 }}>
            <H tag="h1" style={{ fontSize: 26, fontWeight: 900, color: "#0C1E38", marginBottom: 6 }}>
              Create your account
            </H>
            <Txt style={{ fontSize: 14, color: "#64748B", marginBottom: 28 }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#1769E8", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)" }}>Sign in</Link>
            </Txt>

            {error && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.2)", marginBottom: 16 }}>
                <Txt style={{ fontSize: 13, color: "#DC2626" }}>{error}</Txt>
              </div>
            )}
            {success && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(22,184,166,.06)", border: "1px solid rgba(22,184,166,.2)", marginBottom: 16 }}>
                <Txt style={{ fontSize: 13, color: "#16B8A6" }}>Account created. Redirecting to dashboard...</Txt>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "First Name", name: "firstName", placeholder: "Jane" },
                  { label: "Last Name", name: "lastName", placeholder: "Smith" },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ display: "block", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#0C1E38", marginBottom: 7 }}>{field.label}</label>
                    <input name={field.name} type="text" required placeholder={field.placeholder} style={inputBase}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#1769E8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(23,105,232,.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#0C1E38", marginBottom: 7 }}>Work Email</label>
                <input name="email" type="email" required placeholder="you@clinic.com" style={inputBase}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#1769E8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(23,105,232,.08)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#0C1E38", marginBottom: 7 }}>Specialty</label>
                <select name="specialty" required style={{ ...inputBase, appearance: "none" as const }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#1769E8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(23,105,232,.08)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }}>
                  <option value="">Select your specialty</option>
                  {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#0C1E38", marginBottom: 7 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input name="password" type={showPass ? "text" : "password"} required placeholder="Minimum 8 characters" minLength={8}
                    style={{ ...inputBase, paddingRight: 44 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#1769E8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(23,105,232,.08)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex" }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-blue" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 24px", opacity: loading ? .7 : 1, marginTop: 4 }}>
                {loading ? "Creating account..." : (<>Create Account <ArrowRight size={16} /></>)}
              </button>
            </form>

            <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 10, background: "rgba(23,105,232,.04)", border: "1px solid rgba(23,105,232,.1)" }}>
              <Txt style={{ fontSize: 12, color: "#64748B", textAlign: "center", lineHeight: 1.6 }}>
                By creating an account you agree to our Terms of Service and Privacy Policy.
                Processing of protected health information requires an executed BAA.
              </Txt>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
