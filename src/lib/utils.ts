import { clsx, type ClassValue } from 'clsx'
import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns'
import type { LeadStatus, TaskPriority, TaskStatus } from '../types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  return format(d, 'MMM d, yyyy')
}

export function formatRelative(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
}

export function isDueSoon(dateStr: string): boolean {
  const d = new Date(dateStr)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 2)
  return d <= tomorrow && !isPast(d)
}

export function isOverdue(dateStr: string): boolean {
  return isPast(new Date(dateStr + 'T23:59:59'))
}

export const leadStatusConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: 'text-slate-600', bg: 'bg-slate-100' },
  contacted: { label: 'Contacted', color: 'text-blue-600', bg: 'bg-blue-100' },
  qualified: { label: 'Qualified', color: 'text-violet-600', bg: 'bg-violet-100' },
  proposal: { label: 'Proposal', color: 'text-amber-600', bg: 'bg-amber-100' },
  won: { label: 'Won', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  lost: { label: 'Lost', color: 'text-red-600', bg: 'bg-red-100' },
}

export const priorityConfig: Record<TaskPriority, { label: string; color: string; bg: string; dot: string }> = {
  low: { label: 'Low', color: 'text-slate-600', bg: 'bg-slate-100', dot: 'bg-slate-400' },
  medium: { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-400' },
  high: { label: 'High', color: 'text-red-600', bg: 'bg-red-100', dot: 'bg-red-500' },
}

export const taskStatusConfig: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  todo: { label: 'To Do', color: 'text-slate-600', bg: 'bg-slate-100' },
  in_progress: { label: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-100' },
  done: { label: 'Done', color: 'text-emerald-600', bg: 'bg-emerald-100' },
}

export function getInitials(name: string): string {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)
}
