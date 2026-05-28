import { useState } from 'react'
import { Zap, Plus, ToggleLeft, ToggleRight, ArrowRight, CheckCircle2 } from 'lucide-react'

const presetWorkflows = [
  {
    id: 'w1', name: 'New Lead Assignment', active: true,
    trigger: 'Lead created', action: 'Assign to next available rep (round-robin)',
    description: 'Automatically route new leads to team members in order.',
    runs: 24,
  },
  {
    id: 'w2', name: 'Follow-up Task on Qualified Lead', active: true,
    trigger: 'Lead status → Qualified', action: 'Create follow-up task (due in 2 days)',
    description: 'Auto-create a follow-up task when a lead reaches Qualified stage.',
    runs: 11,
  },
  {
    id: 'w3', name: 'Won Deal Onboarding Task', active: false,
    trigger: 'Lead status → Won', action: 'Create onboarding task + notify team',
    description: 'Kick off onboarding checklist when a deal is marked Won.',
    runs: 6,
  },
  {
    id: 'w4', name: 'Overdue Task Alert', active: true,
    trigger: 'Task past due date', action: 'Send in-app notification to assignee',
    description: 'Alert assigned team member when a task becomes overdue.',
    runs: 18,
  },
]

export function Workflows() {
  const [workflows, setWorkflows] = useState(presetWorkflows)

  function toggle(id: string) {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w))
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Automation Workflows</h2>
          <p className="mt-0.5 text-sm text-slate-500">Automate repetitive tasks and lead routing.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> New Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Workflows', value: workflows.filter(w => w.active).length.toString(), color: 'text-emerald-600' },
          { label: 'Total Runs (30d)', value: workflows.reduce((s, w) => s + w.runs, 0).toString(), color: 'text-brand-600' },
          { label: 'Time Saved', value: '~4h / wk', color: 'text-violet-600' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[12px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Workflow cards */}
      <div className="space-y-3">
        {workflows.map(w => (
          <div key={w.id} className={`rounded-xl border bg-white p-5 transition-all ${w.active ? 'border-slate-200' : 'border-slate-100 opacity-70'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${w.active ? 'bg-brand-100' : 'bg-slate-100'}`}>
                  <Zap className={`h-4.5 w-4.5 ${w.active ? 'text-brand-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{w.name}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{w.description}</p>
                </div>
              </div>
              <button onClick={() => toggle(w.id)} className="shrink-0">
                {w.active
                  ? <ToggleRight className="h-6 w-6 text-brand-600" />
                  : <ToggleLeft className="h-6 w-6 text-slate-300" />
                }
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700">⚡ {w.trigger}</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="rounded-lg bg-brand-50 px-2.5 py-1 font-medium text-brand-700">{w.action}</span>
              <span className="ml-auto flex items-center gap-1 text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> {w.runs} runs
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
        <Zap className="mx-auto h-8 w-8 text-slate-300" />
        <p className="mt-2 text-sm font-medium text-slate-500">Build a custom workflow</p>
        <p className="mt-1 text-[12px] text-slate-400">Trigger on any CRM event and automate actions across your team.</p>
        <button className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
          Create Workflow
        </button>
      </div>
    </div>
  )
}
