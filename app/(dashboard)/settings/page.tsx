"use client";
import { useState } from "react";
import { User, Bell, Shield, Database, Link2, AlertCircle } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "data", label: "Data and Privacy", icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Settings</h1>
        <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Manage your CarePen account and workspace preferences.</p>
      </div>

      <div className="flex gap-6">
        {/* Tab nav */}
        <div className="w-48 flex-shrink-0 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${activeTab === t.id ? "bg-[#EEF4FD] text-[#1769E8]" : "text-gray-500 hover:bg-[#F4F7FA] hover:text-[#10233F]"}`}
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-lg font-bold text-[#10233F] mb-5" style={{ fontFamily: "var(--font-manrope)" }}>Profile Settings</h2>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold" style={{ background: "linear-gradient(135deg, #1769E8, #16B8A6)" }}>D</div>
                <div>
                  <div className="font-bold text-[#10233F]" style={{ fontFamily: "var(--font-manrope)" }}>Dr. Demo</div>
                  <div className="text-sm text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Physician · Demo Practice</div>
                  <button className="text-xs text-[#1769E8] hover:underline mt-1" style={{ fontFamily: "var(--font-manrope)" }}>Change photo</button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: "Dr. Demo", type: "text" },
                  { label: "Email Address", value: "demo@carepen.com", type: "email" },
                  { label: "Role", value: "Physician", type: "text" },
                  { label: "Specialty", value: "General Practice", type: "text" },
                  { label: "Organization", value: "Demo Practice", type: "text" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold text-[#374151] mb-1.5" style={{ fontFamily: "var(--font-manrope)" }}>{f.label}</label>
                    <input
                      type={f.type}
                      defaultValue={f.value}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#202B3A] focus:outline-none focus:ring-2 focus:border-[#1769E8]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                ))}
                <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}>Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div>
              <h2 className="text-lg font-bold text-[#10233F] mb-2" style={{ fontFamily: "var(--font-manrope)" }}>Integrations</h2>
              <p className="text-sm text-gray-500 mb-5" style={{ fontFamily: "var(--font-inter)" }}>Connect CarePen with your electronic health record system and other clinical tools.</p>
              <div className="flex items-start gap-3 p-4 rounded-xl border mb-5" style={{ background: "rgba(23,105,232,0.04)", borderColor: "rgba(23,105,232,0.15)" }}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#1769E8" }} />
                <p className="text-xs text-gray-600" style={{ fontFamily: "var(--font-inter)" }}>EHR integrations require configuration, testing, and appropriate data agreements before processing patient information. Contact the CarePen team to discuss your integration requirements.</p>
              </div>
              {[
                { name: "Epic", desc: "FHIR-based integration with Epic electronic health records", status: "Configure" },
                { name: "Oracle Health (Cerner)", desc: "HL7 and FHIR integration with Oracle Health systems", status: "Configure" },
                { name: "athenahealth", desc: "API integration with athenahealth practice management", status: "Configure" },
                { name: "FHIR API", desc: "Generic FHIR R4 API connection for compatible systems", status: "Configure" },
              ].map((i) => (
                <div key={i.name} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 mb-3 hover:border-[#1769E8]/20 transition-colors">
                  <div>
                    <div className="font-semibold text-[#10233F] text-sm" style={{ fontFamily: "var(--font-manrope)" }}>{i.name}</div>
                    <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{i.desc}</div>
                  </div>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-[#1769E8] border border-[#1769E8] hover:bg-blue-50 transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>{i.status}</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "data" && (
            <div>
              <h2 className="text-lg font-bold text-[#10233F] mb-2" style={{ fontFamily: "var(--font-manrope)" }}>Data and Privacy</h2>
              <p className="text-sm text-gray-500 mb-5" style={{ fontFamily: "var(--font-inter)" }}>Manage how your data is handled and stored within CarePen.</p>
              <div className="space-y-4">
                {[
                  { label: "Audit Log Access", desc: "View a full log of all actions taken in your account." },
                  { label: "Data Export", desc: "Request an export of your account data and documentation records." },
                  { label: "Data Retention Settings", desc: "Configure how long clinical documentation is retained in CarePen." },
                  { label: "Delete Account", desc: "Permanently delete your CarePen account and associated data." },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                    <div>
                      <div className="font-semibold text-[#10233F] text-sm" style={{ fontFamily: "var(--font-manrope)" }}>{d.label}</div>
                      <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{d.desc}</div>
                    </div>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-semibold text-gray-500 border border-gray-200 hover:border-[#1769E8] hover:text-[#1769E8] transition-colors" style={{ fontFamily: "var(--font-manrope)" }}>
                      {d.label === "Delete Account" ? "Request" : "View"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "security") && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "#F4F7FA" }}>
                {activeTab === "notifications" ? <Bell className="w-6 h-6 text-gray-300" /> : <Shield className="w-6 h-6 text-gray-300" />}
              </div>
              <p className="text-sm font-semibold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>
                {activeTab === "notifications" ? "Notification Preferences" : "Security Settings"}
              </p>
              <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>
                Configure after connecting your Supabase backend.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
