import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, TrendingUp, CheckSquare, Settings, Zap, ChevronRight, X } from 'lucide-react'
import { cn } from '../lib/utils'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/leads', icon: TrendingUp, label: 'Leads' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/workflows', icon: Zap, label: 'Workflows' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-slate-900 transition-transform duration-200 lg:static lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">CRM Platform</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              {location.pathname === to && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shrink-0">AM</div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white truncate">Alex Morgan</p>
              <p className="text-[11px] text-slate-400 truncate">Sales Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
