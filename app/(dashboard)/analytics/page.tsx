"use client";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const weeklyNotes = [
  { day: "Mon", completed: 14, draft: 3 },
  { day: "Tue", completed: 18, draft: 2 },
  { day: "Wed", completed: 22, draft: 4 },
  { day: "Thu", completed: 16, draft: 1 },
  { day: "Fri", completed: 24, draft: 3 },
  { day: "Sat", completed: 8, draft: 1 },
  { day: "Sun", completed: 4, draft: 0 },
];

const monthlyTrend = [
  { month: "Jun", notes: 280 },
  { month: "Jul", notes: 310 },
  { month: "Aug", notes: 295 },
  { month: "Sep", notes: 340 },
  { month: "Oct", notes: 380 },
  { month: "Nov", notes: 420 },
];

const noteTypes = [
  { name: "SOAP Notes", value: 45, color: "#1769E8" },
  { name: "H&P", value: 20, color: "#16B8A6" },
  { name: "Discharge Summary", value: 15, color: "#67D5D0" },
  { name: "Referral Letter", value: 12, color: "#10233F" },
  { name: "Patient Instructions", value: 8, color: "#202B3A" },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Analytics</h1>
        <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Documentation activity, workflow efficiency, and platform usage. All data shown is demonstration only.</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Notes This Month", value: "420", change: "+10.5%", positive: true },
          { label: "Avg. Time Per Note", value: "4.2 min", change: "-18% vs last month", positive: true },
          { label: "Review Rate", value: "98.3%", change: "Notes reviewed before saving", positive: true },
          { label: "Completion Rate", value: "94.7%", change: "Notes fully completed", positive: true },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl p-5 card-shadow border border-gray-100">
            <div className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>{k.value}</div>
            <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>{k.label}</div>
            <div className="text-xs font-semibold" style={{ color: k.positive ? "#16B8A6" : "#ef4444", fontFamily: "var(--font-manrope)" }}>{k.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly bar chart */}
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <h3 className="font-bold text-[#10233F] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>Weekly Note Activity</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyNotes} barSize={18} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }} />
              <Bar dataKey="completed" fill="#1769E8" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="draft" fill="#67D5D0" radius={[4, 4, 0, 0]} name="Draft" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
          <h3 className="font-bold text-[#10233F] mb-4" style={{ fontFamily: "var(--font-manrope)" }}>Monthly Documentation Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }} />
              <Line type="monotone" dataKey="notes" stroke="#1769E8" strokeWidth={2.5} dot={{ r: 4, fill: "#1769E8" }} name="Notes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Note types pie */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-gray-100">
        <h3 className="font-bold text-[#10233F] mb-6" style={{ fontFamily: "var(--font-manrope)" }}>Note Type Distribution</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <PieChart width={220} height={220}>
              <Pie data={noteTypes} cx={110} cy={110} innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value">
                {noteTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }} />
            </PieChart>
          </div>
          <div className="flex-1 space-y-3">
            {noteTypes.map((t) => (
              <div key={t.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                  <span className="text-sm text-[#202B3A]" style={{ fontFamily: "var(--font-inter)" }}>{t.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: "#F4F7FA" }}>
                    <div className="h-full rounded-full" style={{ width: `${t.value}%`, background: t.color }} />
                  </div>
                  <span className="text-sm font-semibold text-[#10233F] w-8 text-right" style={{ fontFamily: "var(--font-manrope)" }}>{t.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-4 text-center" style={{ fontFamily: "var(--font-inter)" }}>All analytics shown are demonstration data only.</p>
      </div>
    </div>
  );
}
