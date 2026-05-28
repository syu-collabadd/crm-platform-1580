import { Menu, Bell, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/customers': 'Customers',
  '/leads': 'Leads Pipeline',
  '/tasks': 'Tasks',
  '/workflows': 'Workflows',
  '/settings': 'Settings',
}

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'CRM Platform'

  return (
    <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-500">
          <Search className="h-3.5 w-3.5" />
          <span className="text-[13px]">Search...</span>
          <kbd className="ml-2 rounded bg-white border border-slate-200 px-1.5 text-[10px] text-slate-400 font-mono">⌘K</kbd>
        </div>
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" />
        </button>
      </div>
    </header>
  )
}
