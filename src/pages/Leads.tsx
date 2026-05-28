import { useState } from 'react'
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  type DragStartEvent, type DragEndEvent, type DragOverEvent,
} from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, X, GripVertical, DollarSign, User, Tag, MessageSquare, MoreHorizontal } from 'lucide-react'
import { useStore } from '../lib/store'
import { formatCurrency, formatRelative, getInitials, leadStatusConfig, cn } from '../lib/utils'
import { teamMembers } from '../data/mockData'
import type { Lead, LeadStatus } from '../types'

const columns: { key: LeadStatus; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'qualified', label: 'Qualified' },
  { key: 'proposal', label: 'Proposal' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
]

function LeadCard({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortDragging } = useSortable({ id: lead.id })
  const member = teamMembers.find(m => m.id === lead.assignedTo)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className={cn(
      'group rounded-xl border bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow',
      isDragging ? 'shadow-xl ring-2 ring-brand-400' : 'border-slate-200'
    )}>
      <div className="flex items-start gap-2">
        <button {...attributes} {...listeners} className="mt-0.5 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500">
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-slate-900 leading-tight">{lead.title}</p>
          <p className="mt-0.5 text-[12px] text-slate-500">{lead.company}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <DollarSign className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
        <span className="text-[13px] font-semibold text-slate-900">{formatCurrency(lead.value)}</span>
        <span className="ml-auto text-[11px] text-slate-400">{lead.probability}%</span>
      </div>
      {member && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[9px] font-bold text-brand-700">
            {getInitials(member.name)}
          </div>
          <span className="text-[11px] text-slate-400">{member.name.split(' ')[0]}</span>
        </div>
      )}
      {lead.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {lead.tags.slice(0, 2).map(tag => (
            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function Column({ status, leads }: { status: LeadStatus; leads: Lead[] }) {
  const cfg = leadStatusConfig[status]
  const total = leads.reduce((s, l) => s + l.value, 0)
  const ids = leads.map(l => l.id)

  const colColors: Record<LeadStatus, string> = {
    new: 'bg-slate-50 border-slate-200',
    contacted: 'bg-blue-50 border-blue-200',
    qualified: 'bg-violet-50 border-violet-200',
    proposal: 'bg-amber-50 border-amber-200',
    won: 'bg-emerald-50 border-emerald-200',
    lost: 'bg-red-50 border-red-200',
  }

  return (
    <div className={`flex flex-col rounded-xl border ${colColors[status]} min-w-[230px] max-w-[260px] flex-shrink-0`}>
      <div className="px-3 pt-3 pb-2 border-b border-black/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${cfg.bg.replace('bg-', 'bg-').replace('100', '500')}`} />
            <span className={`text-[12px] font-semibold ${cfg.color}`}>{cfg.label}</span>
            <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">{leads.length}</span>
          </div>
        </div>
        {total > 0 && (
          <p className="mt-1 text-[12px] font-semibold text-slate-600">{formatCurrency(total)}</p>
        )}
      </div>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 p-2 min-h-[100px] flex-1">
          {leads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
        </div>
      </SortableContext>
    </div>
  )
}

function AddLeadModal({ onClose }: { onClose: () => void }) {
  const { addLead } = useStore()
  const [form, setForm] = useState({
    title: '', contactName: '', contactEmail: '', company: '',
    value: '', status: 'new' as LeadStatus, assignedTo: 'u1', probability: '30',
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    addLead({
      id: Math.random().toString(36).slice(2),
      title: form.title, contactName: form.contactName, contactEmail: form.contactEmail,
      company: form.company, value: Number(form.value) || 0,
      status: form.status, assignedTo: form.assignedTo,
      probability: Number(form.probability) || 30,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      tags: [], notes: [],
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Add Lead</h2>
          <button type="button" onClick={onClose}><X className="h-5 w-5 text-slate-400" /></button>
        </div>
        {[
          { k: 'title', l: 'Deal Title' },
          { k: 'contactName', l: 'Contact Name' },
          { k: 'contactEmail', l: 'Contact Email' },
          { k: 'company', l: 'Company' },
        ].map(({ k, l }) => (
          <div key={k}>
            <label className="mb-1 block text-[13px] font-medium text-slate-700">{l}</label>
            <input value={(form as Record<string, string>)[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" required />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[13px] font-medium text-slate-700">Deal Value ($)</label>
            <input type="number" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
          </div>
          <div>
            <label className="mb-1 block text-[13px] font-medium text-slate-700">Probability (%)</label>
            <input type="number" min="0" max="100" value={form.probability} onChange={e => setForm(p => ({ ...p, probability: e.target.value }))}
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
          <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Add Lead</button>
        </div>
      </form>
    </div>
  )
}

export function Leads() {
  const { leads, updateLeadStatus } = useStore()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const activeLead = leads.find(l => l.id === activeId)

  function onDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id))
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over) return
    const targetStatus = over.data?.current?.sortable?.containerId as LeadStatus | undefined
    const destCol = columns.find(c => c.key === over.id || (targetStatus && c.key === targetStatus))
    if (destCol && active.id !== over.id) {
      const lead = leads.find(l => l.id === active.id)
      if (lead && lead.status !== destCol.key) {
        updateLeadStatus(String(active.id), destCol.key)
      }
    }
  }

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return
    const overId = String(over.id)
    const col = columns.find(c => c.key === overId)
    if (col) {
      const lead = leads.find(l => l.id === String(active.id))
      if (lead && lead.status !== col.key) {
        updateLeadStatus(String(active.id), col.key)
      }
    }
  }

  const pipelineValue = leads.filter(l => !['won','lost'].includes(l.status)).reduce((s, l) => s + l.value, 0)
  const wonValue = leads.filter(l => l.status === 'won').reduce((s, l) => s + l.value, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 lg:px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-slate-500">Pipeline:</span>
            <span className="ml-1.5 font-semibold text-slate-900">{formatCurrency(pipelineValue)}</span>
          </div>
          <div>
            <span className="text-slate-500">Won:</span>
            <span className="ml-1.5 font-semibold text-emerald-600">{formatCurrency(wonValue)}</span>
          </div>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="ml-auto flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Add Lead
        </button>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto p-4 lg:p-6">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
          <div className="flex gap-4 h-full">
            {columns.map(col => (
              <Column key={col.key} status={col.key} leads={leads.filter(l => l.status === col.key)} />
            ))}
          </div>
          <DragOverlay>
            {activeLead && <LeadCard lead={activeLead} isDragging />}
          </DragOverlay>
        </DndContext>
      </div>

      {showAdd && <AddLeadModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
