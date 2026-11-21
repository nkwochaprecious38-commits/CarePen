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

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
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
            Welcome back.<br />Your patients are waiting.
          </H>
          <Txt style={{ color: "rgba(255,255,255,.5)", fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            Sign in to access your clinical documentation tools, patient summaries, and AI scribe sessions.
          </Txt>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "AI-generated note drafts reviewed and approved by you",
              "No notes enter records without clinician sign-off",
              "Demo mode available without real patient data",
            ].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(22,184,166,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16B8A6" }} />
                </div>
                <Txt style={{ fontSize: 13.5, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{t}</Txt>
              </div>
            ))}
          </div>
        </div>

        <Txt style={{ fontSize: 12.5, color: "rgba(255,255,255,.22)" }}>
          CarePen requires a Business Associate Agreement before processing PHI.
        </Txt>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div className="card" style={{ padding: 40 }}>
            <H tag="h1" style={{ fontSize: 26, fontWeight: 900, color: "#0C1E38", marginBottom: 6 }}>
              Sign in to your account
            </H>
            <Txt style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>
              New to CarePen?{" "}
              <Link href="/signup" style={{ color: "#1769E8", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-manrope,'Manrope',sans-serif)" }}>Create an account</Link>
            </Txt>

            {error && (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.2)", marginBottom: 4 }}>
                <Txt style={{ fontSize: 13, color: "#DC2626" }}>{error}</Txt>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#0C1E38", marginBottom: 7 }}>
                  Email address
                </label>
                <input
                  name="email"
                  type="email" required placeholder="you@clinic.com"
                  style={inputBase}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#1769E8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(23,105,232,.08)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <label style={{ fontFamily: "var(--font-manrope,'Manrope',sans-serif)", fontSize: 13, fontWeight: 700, color: "#0C1E38" }}>Password</label>
                  <Link href="/forgot-password" style={{ fontFamily: "var(--font-inter,'Inter',sans-serif)", fontSize: 12.5, fontWeight: 500, color: "#1769E8", textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"} required placeholder="Enter your password"
                    style={{ ...inputBase, paddingRight: 44 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#1769E8"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(23,105,232,.08)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 4, display: "flex",
                  }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-blue" style={{
                width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 24px",
                opacity: loading ? .7 : 1, marginTop: 4,
              }}>
                {loading ? "Signing in..." : (<>Sign In <ArrowRight size={16} /></>)}
              </button>
            </form>

            <div style={{ marginTop: 24, padding: "14px 16px", borderRadius: 10, background: "rgba(23,105,232,.04)", border: "1px solid rgba(23,105,232,.1)" }}>
              <Txt style={{ fontSize: 12, color: "#64748B", textAlign: "center", lineHeight: 1.6 }}>
                By signing in you agree to CarePen's Terms of Service and Privacy Policy.
                Processing of protected health information requires an executed BAA.
              </Txt>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
