import { TrendingUp, Users, CheckSquare, DollarSign, ArrowUpRight, ArrowDownRight, Clock, Activity } from 'lucide-react'
import { useStore } from '../lib/store'
import { formatCurrency, formatDate, formatRelative, priorityConfig, leadStatusConfig, getInitials } from '../lib/utils'
import { teamMembers } from '../data/mockData'

function StatCard({ label, value, change, positive, icon: Icon, color }: {
  label: string; value: string; change?: string; positive?: boolean; icon: React.ElementType; color: string
}) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          {change && (
            <div className={`mt-1.5 flex items-center gap-1 text-[12px] font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              <span>{change} vs last month</span>
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function PipelineBar() {
  const { leads } = useStore()
  const stages: Array<{ key: typeof leads[0]['status']; label: string; color: string }> = [
    { key: 'new', label: 'New', color: 'bg-slate-400' },
    { key: 'contacted', label: 'Contacted', color: 'bg-blue-400' },
    { key: 'qualified', label: 'Qualified', color: 'bg-violet-500' },
    { key: 'proposal', label: 'Proposal', color: 'bg-amber-400' },
    { key: 'won', label: 'Won', color: 'bg-emerald-500' },
  ]
  const active = leads.filter(l => l.status !== 'lost')
  const total = active.length || 1

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Pipeline Overview</h3>
        <span className="text-[13px] text-slate-500">{active.length} active leads</span>
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 gap-0.5">
        {stages.map(s => {
          const count = active.filter(l => l.status === s.key).length
          const pct = (count / total) * 100
          return pct > 0 ? (
            <div key={s.key} className={`${s.color} transition-all`} style={{ width: `${pct}%` }} title={`${s.label}: ${count}`} />
          ) : null
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {stages.map(s => {
          const count = active.filter(l => l.status === s.key).length
          const value = active.filter(l => l.status === s.key).reduce((sum, l) => sum + l.value, 0)
          return (
            <div key={s.key} className="text-center">
              <div className={`mx-auto mb-1 h-2 w-2 rounded-full ${s.color}`} />
              <p className="text-[11px] text-slate-500">{s.label}</p>
              <p className="text-sm font-semibold text-slate-900">{count}</p>
              <p className="text-[11px] text-slate-400">{formatCurrency(value)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Dashboard() {
  const { leads, tasks, customers, activities } = useStore()

  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status))
  const pipelineValue = activeLeads.reduce((s, l) => s + l.value, 0)
  const wonThisMonth = leads.filter(l => l.status === 'won').reduce((s, l) => s + l.value, 0)
  const openTasks = tasks.filter(t => t.status !== 'done')
  const upcomingTasks = tasks.filter(t => t.status !== 'done').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5)

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Pipeline Value" value={formatCurrency(pipelineValue)} change="+12%" positive icon={DollarSign} color="bg-brand-600" />
        <StatCard label="Active Leads" value={String(activeLeads.length)} change="+3" positive icon={TrendingUp} color="bg-violet-500" />
        <StatCard label="Customers" value={String(customers.filter(c => c.status === 'active').length)} change="+2" positive icon={Users} color="bg-emerald-500" />
        <StatCard label="Open Tasks" value={String(openTasks.length)} change="-4" positive icon={CheckSquare} color="bg-amber-500" />
      </div>

      {/* Pipeline bar */}
      <PipelineBar />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming tasks */}
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Upcoming Tasks</h3>
            <span className="text-[12px] text-slate-500">{openTasks.length} open</span>
          </div>
          <div className="space-y-2.5">
            {upcomingTasks.map(task => {
              const member = teamMembers.find(m => m.id === task.assignedTo)
              const p = priorityConfig[task.priority]
              return (
                <div key={task.id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors">
                  <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${p.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-900 truncate">{task.title}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(task.dueDate)}</span>
                      {member && <span>· {member.name.split(' ')[0]}</span>}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${p.bg} ${p.color}`}>{p.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xl bg-white border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            <Activity className="h-4 w-4 text-slate-400" />
          </div>
          <div className="space-y-3">
            {activities.slice(0, 6).map(act => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-600">
                  {getInitials(act.user)}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-slate-700">{act.message}</p>
                  <p className="text-[11px] text-slate-400">{act.user} · {formatRelative(act.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue highlight */}
      <div className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-200">Won Revenue (All Time)</p>
            <p className="mt-1 text-3xl font-bold">{formatCurrency(wonThisMonth)}</p>
            <p className="mt-1 text-[13px] text-brand-200">{leads.filter(l => l.status === 'won').length} deals closed</p>
          </div>
          <TrendingUp className="h-12 w-12 text-brand-300" />
        </div>
      </div>
    </div>
  )
}
