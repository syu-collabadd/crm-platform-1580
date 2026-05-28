import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Customer, Lead, Task, Activity } from '../types'
import { customers as initCustomers, leads as initLeads, tasks as initTasks, activities as initActivities } from '../data/mockData'

interface StoreCtx {
  customers: Customer[]
  leads: Lead[]
  tasks: Task[]
  activities: Activity[]
  updateLeadStatus: (id: string, status: Lead['status']) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  addTask: (task: Task) => void
  addNote: (type: 'customer' | 'lead', id: string, content: string, author: string) => void
  addCustomer: (c: Customer) => void
  addLead: (l: Lead) => void
}

const StoreContext = createContext<StoreCtx | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initCustomers)
  const [leads, setLeads] = useState<Lead[]>(initLeads)
  const [tasks, setTasks] = useState<Task[]>(initTasks)
  const [activities, setActivities] = useState<Activity[]>(initActivities)

  const pushActivity = useCallback((act: Activity) => {
    setActivities(prev => [act, ...prev])
  }, [])

  const updateLeadStatus = useCallback((id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l))
    pushActivity({
      id: Math.random().toString(36).slice(2), type: 'status_changed',
      message: `Lead status changed to ${status}`, user: 'You',
      timestamp: new Date().toISOString(), relatedId: id,
    })
  }, [pushActivity])

  const updateTaskStatus = useCallback((id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    if (status === 'done') {
      pushActivity({
        id: Math.random().toString(36).slice(2), type: 'task_completed',
        message: `Task marked as done`, user: 'You',
        timestamp: new Date().toISOString(), relatedId: id,
      })
    }
  }, [pushActivity])

  const addTask = useCallback((task: Task) => {
    setTasks(prev => [task, ...prev])
  }, [])

  const addNote = useCallback((type: 'customer' | 'lead', id: string, content: string, author: string) => {
    const note = { id: Math.random().toString(36).slice(2), content, author, createdAt: new Date().toISOString() }
    if (type === 'customer') {
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, notes: [note, ...c.notes] } : c))
    } else {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: [note, ...l.notes] } : l))
    }
    pushActivity({
      id: Math.random().toString(36).slice(2), type: 'note_added',
      message: `Note added`, user: author, timestamp: new Date().toISOString(), relatedId: id,
    })
  }, [pushActivity])

  const addCustomer = useCallback((c: Customer) => {
    setCustomers(prev => [c, ...prev])
    pushActivity({
      id: Math.random().toString(36).slice(2), type: 'customer_added',
      message: `New customer: ${c.name}`, user: 'You', timestamp: new Date().toISOString(),
    })
  }, [pushActivity])

  const addLead = useCallback((l: Lead) => {
    setLeads(prev => [l, ...prev])
    pushActivity({
      id: Math.random().toString(36).slice(2), type: 'lead_created',
      message: `New lead: ${l.title}`, user: 'You', timestamp: new Date().toISOString(),
    })
  }, [pushActivity])

  return (
    <StoreContext.Provider value={{ customers, leads, tasks, activities, updateLeadStatus, updateTaskStatus, addTask, addNote, addCustomer, addLead }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}
