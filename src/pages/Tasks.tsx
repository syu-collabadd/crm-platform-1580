import { useState } from 'react'
import { Plus, X, CheckCircle2, Circle, Clock, Filter, Search } from 'lucide-react'
import { useStore } from '../lib/store'
import { formatDate, priorityConfig, taskStatusConfig, isOverdue, isDueSoon, getInitials, cn } from '../lib/utils'
import { teamMembers } from '../data/mockData'
import type { Task, TaskPriority, TaskStatus } from '../types'

function StatusToggle({ status, onChange }: { status: TaskStatus; onChange: (s: TaskStatus) => void }) {
  const cycle: TaskStatus[] = ['todo', 'in_progress', 'done']
  const next = cycle[(cycle.indexOf(status) + 1) % cycle.length]
  const colors = { todo: 'text-slate-400 hover:text-slate-600', in_progress: 'text-blue-500 hover:text-blue-700', done: 'text-emerald-500 hover:text-emerald-700' }

  return (
    <button onClick={e => { e.stopPropagation(); onChange(next) }} className={`transition-colors ${colors[status]}`}>
      {status === 'done' ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
    </button>
  )
}

function TaskRow({ task, onClick }: { task: Task; onClick: () => void }) {
  const { updateTaskStatus } = useStore()
  const member = teamMembers.find(m => m.id === task.assignedTo)
  const p = priorityConfig[task.priority]
  const overdue = task.status !== 'done' && isOverdue(task.dueDate)
  const soon = task.status !== 'done' && !overdue && isDueSoon(task.dueDate)

  return (
    <div className={cn(
      'flex items-start gap-3 rounded-lg border p-3.5 hover:bg-slate-50 cursor-pointer transition-colors',
      task.status === 'done' ? 'border-slate-100 bg-slate-50/50 opacity-60' : 'border-slate-200 bg-white'
    )} onClick={onClick}>
      <div className="pt-0.5">
        <StatusToggle status={task.status} onChange={s => updateTaskStatus(task.id, s)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm font-medium text-slate-900', task.status === 'done' && 'line-through text-slate-400')}>
            {task.title}
          </p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${p.bg} ${p.color}`}>{p.label}</span>
        </div>
        {task.description && <p className="mt-0.5 text-[12px] text-slate-400 truncate">{task.description}</p>}
        <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
          <div className={cn('flex items-center gap-1 text-[11px] font-medium',
            overdue ? 'text-red-500' : soon ? 'text-amber-500' : 'text-slate-400')}>
            <Clock className="h-3 w-3" />
            {formatDate(task.dueDate)}
            {overdue && <span>(Overdue)</span>}
          </div>
          {member && (
            <div className="flex items-center gap-1">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-[8px] font-bold text-brand-700">
                {getInitials(member.name)}
              </div>
              <span className="text-[11px] text-slate-400">{member.name.split(' ')[0]}</span>
            </div>
          )}
          {task.relatedTo && (
            <span className="text-[11px] text-slate-400">· {task.relatedTo.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}

function AddTaskModal({ onClose }: { onClose: () => void }) {
  const { addTask } = useStore()
  const [form, setForm] = useState({
    title: '', description: '', priority: 'medium' as TaskPriority,
    assignedTo: 'u1', dueDate: new Date().toISOString().slice(0, 10),
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    addTask({
      id: Math.random().toString(36).slice(2),
      ...form, status: 'todo',
      createdAt: new Date().toISOString().slice(0, 10), tags: [],
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Add Task</h2>
          <button type="button" onClick={onClose}><X className="h-5 w-5 text-slate-400" /></button>
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-medium text-slate-700">Task Title</label>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-medium text-slate-700">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[13px] font-medium text-slate-700">Priority</label>
            <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as TaskPriority }))}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[13px] font-medium text-slate-700">Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-[13px] font-medium text-slate-700">Assign To</label>
          <select value={form.assignedTo} onChange={e => setForm(p => ({ ...p, assignedTo: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
            {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Add Task</button>
        </div>
      </form>
    </div>
  )
}

export function Tasks() {
  const { tasks } = useStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all')
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState<Task | null>(null)

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter
    const matchAssignee = assigneeFilter === 'all' || t.assignedTo === assigneeFilter
    return matchSearch && matchStatus && matchPriority && matchAssignee
  })

  const grouped = {
    todo: filtered.filter(t => t.status === 'todo'),
    in_progress: filtered.filter(t => t.status === 'in_progress'),
    done: filtered.filter(t => t.status === 'done'),
  }

  const overdueCount = tasks.filter(t => t.status !== 'done' && isOverdue(t.dueDate)).length

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {overdueCount > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
          <Clock className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-red-700">{overdueCount} task{overdueCount > 1 ? 's' : ''} overdue</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-40 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..."
            className="flex-1 text-sm outline-none placeholder:text-slate-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none">
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as typeof priorityFilter)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none">
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={assigneeFilter} onChange={e => setAssigneeFilter(e.target.value)}
          className="hidden sm:block rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none">
          <option value="all">All Assignees</option>
          {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <button onClick={() => setShowAdd(true)}
          className="ml-auto flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      {/* Grouped sections */}
      <div className="space-y-6">
        {([['in_progress', 'In Progress'], ['todo', 'To Do'], ['done', 'Done']] as const).map(([key, label]) => {
          const group = grouped[key]
          if (group.length === 0 && key === 'done') return null
          const cfg = taskStatusConfig[key]
          return (
            <div key={key}>
              <div className="mb-2 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cfg.bg} ${cfg.color}`}>{label}</span>
                <span className="text-[12px] text-slate-400">{group.length}</span>
              </div>
              <div className="space-y-2">
                {group.map(t => <TaskRow key={t.id} task={t} onClick={() => setSelected(t)} />)}
                {group.length === 0 && <p className="text-[13px] text-slate-400 py-2">No tasks here.</p>}
              </div>
            </div>
          )
        })}
      </div>

      {showAdd && <AddTaskModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
