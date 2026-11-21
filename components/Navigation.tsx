"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PenLine } from "lucide-react";

const links = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "nav-glass" : "bg-transparent"}`}
      style={{ height: "64px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "linear-gradient(135deg,#1769E8,#16B8A6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PenLine size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="font-manrope" style={{ fontWeight: 800, fontSize: "18px", color: scrolled ? "#10233F" : "#fff" }}>
            CarePen
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-manrope"
              style={{ fontWeight: 500, fontSize: "14px", color: scrolled ? "#202B3A" : "rgba(255,255,255,.85)", textDecoration: "none", transition: "opacity .15s" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="hidden-mobile">
          <Link
            href="/login"
            className="btn font-manrope"
            style={{ fontWeight: 600, fontSize: "14px", padding: "9px 18px", color: scrolled ? "#1769E8" : "rgba(255,255,255,.85)", background: "transparent", border: "none", cursor: "pointer", textDecoration: "none" }}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="btn btn-blue font-manrope"
            style={{ fontSize: "14px", padding: "9px 18px" }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#10233F" : "#fff", padding: "6px", display: "none" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #E8EDF4", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-manrope"
              style={{ padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, color: "#202B3A", textDecoration: "none", display: "block" }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid #E8EDF4", marginTop: "8px", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link href="/login" onClick={() => setOpen(false)} className="btn btn-ghost-blue font-manrope" style={{ justifyContent: "center", fontSize: "14px" }}>Log In</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="btn btn-blue font-manrope" style={{ justifyContent: "center", fontSize: "14px" }}>Get Started</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
