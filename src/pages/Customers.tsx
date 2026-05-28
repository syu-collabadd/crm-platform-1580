import { useState } from 'react'
import { Search, Plus, X, Building2, Mail, Phone, Tag, MessageSquare, ChevronRight, Filter } from 'lucide-react'
import { useStore } from '../lib/store'
import { formatCurrency, formatDate, formatRelative, getInitials, cn } from '../lib/utils'
import type { Customer } from '../types'

const statusColors = {
  active: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  inactive: { bg: 'bg-slate-100', text: 'text-slate-600' },
  prospect: { bg: 'bg-blue-100', text: 'text-blue-700' },
}

function CustomerRow({ customer, onClick }: { customer: Customer; onClick: () => void }) {
  const sc = statusColors[customer.status]
  return (
    <tr className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={onClick}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
            {getInitials(customer.name)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{customer.name}</p>
            <p className="text-[12px] text-slate-400">{customer.email}</p>
          </div>
        </div>
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <Building2 className="h-3.5 w-3.5 text-slate-400" />
          {customer.company}
        </div>
      </td>
      <td className="hidden px-4 py-3 sm:table-cell">
        <span className="text-sm text-slate-600">{customer.industry}</span>
      </td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${sc.bg} ${sc.text}`}>
          {customer.status}
        </span>
      </td>
      <td className="hidden px-4 py-3 md:table-cell text-sm font-medium text-slate-900">
        {customer.value > 0 ? formatCurrency(customer.value) : '—'}
      </td>
      <td className="px-4 py-3">
        <ChevronRight className="h-4 w-4 text-slate-300" />
      </td>
    </tr>
  )
}

function CustomerDetail({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  const { addNote } = useStore()
  const [noteText, setNoteText] = useState('')
  const sc = statusColors[customer.status]

  function submitNote() {
    if (!noteText.trim()) return
    addNote('customer', customer.id, noteText.trim(), 'Alex Morgan')
    setNoteText('')
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-lg font-bold text-brand-700">
              {getInitials(customer.name)}
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">{customer.name}</h2>
              <p className="text-[13px] text-slate-500">{customer.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100">
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Status + value */}
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-[12px] font-medium capitalize ${sc.bg} ${sc.text}`}>{customer.status}</span>
            {customer.value > 0 && (
              <span className="text-sm font-semibold text-slate-900">{formatCurrency(customer.value)}</span>
            )}
          </div>

          {/* Contact info */}
          <div className="rounded-xl border border-slate-200 p-4 space-y-3">
            <h3 className="text-[13px] font-semibold text-slate-900 uppercase tracking-wider">Contact</h3>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" />
              <a href={`mailto:${customer.email}`} className="hover:text-brand-600">{customer.email}</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Building2 className="h-4 w-4 text-slate-400" />
              <span>{customer.industry}</span>
            </div>
            <div className="text-[12px] text-slate-400">Customer since {formatDate(customer.createdAt)}</div>
          </div>

          {/* Tags */}
          {customer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {customer.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[12px] font-medium text-slate-600">
                  <Tag className="h-3 w-3" />{tag}
                </span>
              ))}
            </div>
          )}

          {/* Notes */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-slate-900 uppercase tracking-wider">
              <MessageSquare className="h-3.5 w-3.5" /> Notes
            </h3>
            <div className="space-y-3 mb-3">
              {customer.notes.map(note => (
                <div key={note.id} className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                  <p className="text-sm text-slate-700">{note.content}</p>
                  <p className="mt-1.5 text-[11px] text-slate-400">{note.author} · {formatRelative(note.createdAt)}</p>
                </div>
              ))}
              {customer.notes.length === 0 && <p className="text-[13px] text-slate-400">No notes yet.</p>}
            </div>
            <div className="flex gap-2">
              <input
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitNote()}
                placeholder="Add a note..."
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                onClick={submitNote}
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddCustomerModal({ onClose }: { onClose: () => void }) {
  const { addCustomer } = useStore()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', industry: '', status: 'prospect' as const })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    addCustomer({
      ...form, id: Math.random().toString(36).slice(2), value: 0,
      createdAt: new Date().toISOString().slice(0, 10), tags: [], notes: [],
    })
    onClose()
  }

  const field = (key: keyof typeof form, label: string, type = 'text', opts?: { [k: string]: string }[]) => (
    <div key={key}>
      <label className="mb-1 block text-[13px] font-medium text-slate-700">{label}</label>
      {opts ? (
        <select value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100">
          {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" required />
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Add Customer</h2>
          <button type="button" onClick={onClose}><X className="h-5 w-5 text-slate-400" /></button>
        </div>
        {field('name', 'Full Name')}
        {field('email', 'Email', 'email')}
        {field('phone', 'Phone')}
        {field('company', 'Company')}
        {field('industry', 'Industry')}
        {field('status', 'Status', 'select', [
          { value: 'prospect', label: 'Prospect' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ])}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Add Customer</button>
        </div>
      </form>
    </div>
  )
}

export function Customers() {
  const { customers } = useStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all')
  const [selected, setSelected] = useState<Customer | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="flex-1 text-sm outline-none placeholder:text-slate-400"
          />
          {search && <button onClick={() => setSearch('')}><X className="h-3.5 w-3.5 text-slate-400" /></button>}
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-1">
          {(['all', 'active', 'inactive', 'prospect'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={cn('rounded-md px-3 py-1 text-[12px] font-medium capitalize transition-colors',
                filter === s ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100')}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <span className="text-[13px] font-medium text-slate-500">{filtered.length} customers</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Name</th>
                <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:table-cell">Company</th>
                <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:table-cell">Industry</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="hidden px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:table-cell">Value</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => <CustomerRow key={c.id} customer={c} onClick={() => setSelected(c)} />)}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No customers match your search.</div>
          )}
        </div>
      </div>

      {selected && <CustomerDetail customer={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddCustomerModal onClose={() => setShowAdd(false)} />}
    </div>
  )
}
