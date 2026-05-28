export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  status: 'active' | 'inactive' | 'prospect'
  value: number
  createdAt: string
  avatar?: string
  tags: string[]
  notes: Note[]
}

export interface Lead {
  id: string
  title: string
  contactName: string
  contactEmail: string
  company: string
  value: number
  status: LeadStatus
  assignedTo: string
  createdAt: string
  updatedAt: string
  probability: number
  notes: Note[]
  tags: string[]
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  dueDate: string
  createdAt: string
  relatedTo?: { type: 'customer' | 'lead'; id: string; name: string }
  tags: string[]
}

export interface Note {
  id: string
  content: string
  author: string
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface Activity {
  id: string
  type: 'lead_created' | 'task_completed' | 'customer_added' | 'lead_won' | 'note_added' | 'status_changed'
  message: string
  user: string
  timestamp: string
  relatedId?: string
}
