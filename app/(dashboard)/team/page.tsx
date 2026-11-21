"use client";
import { UserCog, Mail, Shield, Plus } from "lucide-react";

const members = [
  { name: "Dr. Demo", email: "demo@carepen.com", role: "Physician", access: "Admin", status: "Active" },
  { name: "Nurse Demo", email: "nurse@carepen.com", role: "Registered Nurse", access: "Clinical", status: "Active" },
  { name: "PA Demo", email: "pa@carepen.com", role: "Physician Assistant", access: "Clinical", status: "Active" },
  { name: "Admin Demo", email: "admin@carepen.com", role: "Healthcare Administrator", access: "Admin", status: "Active" },
];

export default function TeamPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Team Management</h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Manage team members, roles, and access controls for your CarePen workspace.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}>
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Team Members", value: "4", icon: UserCog, color: "#1769E8" },
          { label: "Admin Access", value: "2", icon: Shield, color: "#16B8A6" },
          { label: "Pending Invites", value: "0", icon: Mail, color: "#F59E0B" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 card-shadow border border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${s.color}12` }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>{s.value}</div>
              <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl card-shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#F4F7FA" }}>
              {["Member", "Email", "Role", "Access Level", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-manrope)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {members.map((m) => (
              <tr key={m.name} className="hover:bg-[#F4F7FA] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#10233F" }}>{m.name[0]}</div>
                    <span className="font-semibold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>{m.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>{m.email}</td>
                <td className="px-4 py-3 text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>{m.role}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: m.access === "Admin" ? "rgba(23,105,232,0.1)" : "rgba(22,184,166,0.1)", color: m.access === "Admin" ? "#1769E8" : "#16B8A6", fontFamily: "var(--font-manrope)" }}>{m.access}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(22,184,166,0.1)", color: "#16B8A6", fontFamily: "var(--font-manrope)" }}>{m.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-gray-400 hover:text-[#1769E8] transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-300 p-3 text-center" style={{ fontFamily: "var(--font-inter)" }}>Demonstration data only</p>
      </div>
    </div>
  );
}
