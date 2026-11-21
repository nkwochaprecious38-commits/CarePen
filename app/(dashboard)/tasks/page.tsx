"use client";
import { useState } from "react";
import { ClipboardList, CheckCircle2, Clock, Plus } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Complete discharge summary for Patient D", priority: "High", due: "Today", done: false },
  { id: 2, title: "Review HPI draft for Patient C", priority: "High", due: "Today", done: false },
  { id: 3, title: "Sign off on referral letter for Patient E", priority: "Medium", due: "Tomorrow", done: false },
  { id: 4, title: "Update medication list for Patient A", priority: "Low", due: "This week", done: true },
  { id: 5, title: "Complete coding review for last week's encounters", priority: "Medium", due: "This week", done: true },
];

const priorityColor: Record<string, string> = {
  High: "#ef4444", Medium: "#F59E0B", Low: "#16B8A6"
};

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id: number) => setTasks((t) => t.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  const pending = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10233F] mb-1" style={{ fontFamily: "var(--font-manrope)" }}>Tasks</h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>Documentation tasks and clinical follow-up actions.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "#1769E8", fontFamily: "var(--font-manrope)" }}>
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Pending", value: pending.length, icon: Clock, color: "#F59E0B" },
          { label: "Completed", value: done.length, icon: CheckCircle2, color: "#16B8A6" },
          { label: "Total", value: tasks.length, icon: ClipboardList, color: "#1769E8" },
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
      <div className="bg-white rounded-2xl card-shadow border border-gray-100 overflow-hidden mb-4">
        <div className="px-5 py-3 border-b border-gray-100 font-bold text-xs text-gray-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-manrope)" }}>Pending Tasks</div>
        {pending.map((task) => (
          <div key={task.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-[#F4F7FA] transition-colors">
            <button onClick={() => toggle(task.id)} className="w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all hover:border-[#16B8A6]" style={{ borderColor: "#d1d5db" }} />
            <div className="flex-1">
              <div className="font-medium text-[#10233F] text-sm" style={{ fontFamily: "var(--font-manrope)" }}>{task.title}</div>
              <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>Due: {task.due}</div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${priorityColor[task.priority]}15`, color: priorityColor[task.priority], fontFamily: "var(--font-manrope)" }}>{task.priority}</span>
          </div>
        ))}
        {pending.length === 0 && <div className="py-8 text-center text-sm text-gray-300" style={{ fontFamily: "var(--font-inter)" }}>All tasks complete.</div>}
      </div>
      {done.length > 0 && (
        <div className="bg-white rounded-2xl card-shadow border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 font-bold text-xs text-gray-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-manrope)" }}>Completed</div>
          {done.map((task) => (
            <div key={task.id} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 opacity-60">
              <button onClick={() => toggle(task.id)} className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#16B8A6" }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </button>
              <div className="flex-1">
                <div className="font-medium text-[#10233F] text-sm line-through" style={{ fontFamily: "var(--font-manrope)" }}>{task.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
