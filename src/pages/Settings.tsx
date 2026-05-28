import { User, Bell, Shield, Users, Building, Palette } from 'lucide-react'
import { teamMembers } from '../data/mockData'
import { getInitials } from '../lib/utils'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

function FieldRow({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input defaultValue={value} type={type}
        className="col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
    </div>
  )
}

export function Settings() {
  return (
    <div className="p-4 lg:p-6 max-w-2xl space-y-6">
      <Section title="Profile">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">AM</div>
          <div>
            <p className="font-semibold text-slate-900">Alex Morgan</p>
            <p className="text-sm text-slate-500">Sales Manager</p>
            <button className="mt-1 text-[12px] text-brand-600 hover:underline">Change photo</button>
          </div>
        </div>
        <FieldRow label="Full Name" value="Alex Morgan" />
        <FieldRow label="Email" value="alex@company.com" type="email" />
        <FieldRow label="Role" value="Sales Manager" />
        <FieldRow label="Phone" value="+1 555-0100" />
        <div className="flex justify-end">
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Save Changes</button>
        </div>
      </Section>

      <Section title="Team Members">
        <div className="space-y-3">
          {teamMembers.map(m => (
            <div key={m.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {getInitials(m.name)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{m.name}</p>
                <p className="text-[12px] text-slate-400">{m.role} · {m.email}</p>
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50">
                Edit
              </button>
            </div>
          ))}
          <button className="w-full rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-colors">
            + Invite team member
          </button>
        </div>
      </Section>

      <Section title="Notifications">
        {[
          { label: 'New lead assigned to me', checked: true },
          { label: 'Task due date reminders', checked: true },
          { label: 'Lead status changes', checked: false },
          { label: 'Weekly pipeline summary', checked: true },
        ].map(n => (
          <label key={n.label} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-slate-700">{n.label}</span>
            <input type="checkbox" defaultChecked={n.checked}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          </label>
        ))}
      </Section>

      <Section title="Workspace">
        <FieldRow label="Workspace Name" value="Acme Sales Team" />
        <FieldRow label="Timezone" value="America/New_York" />
        <FieldRow label="Currency" value="USD" />
        <div className="flex justify-end">
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Save Changes</button>
        </div>
      </Section>
    </div>
  )
}
