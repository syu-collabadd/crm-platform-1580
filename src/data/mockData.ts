import type { Customer, Lead, Task, TeamMember, Activity } from '../types'

export const teamMembers: TeamMember[] = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@company.com', role: 'Sales Manager' },
  { id: 'u2', name: 'Jordan Lee', email: 'jordan@company.com', role: 'Account Executive' },
  { id: 'u3', name: 'Sam Rivera', email: 'sam@company.com', role: 'Sales Rep' },
  { id: 'u4', name: 'Taylor Kim', email: 'taylor@company.com', role: 'BDR' },
]

export const customers: Customer[] = [
  {
    id: 'c1', name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1 555-0101',
    company: 'Acme Corp', industry: 'Technology', status: 'active', value: 48000,
    createdAt: '2024-01-15', tags: ['enterprise', 'saas'],
    notes: [
      { id: 'n1', content: 'Renewed for another year, happy with support.', author: 'Alex Morgan', createdAt: '2024-03-10' },
    ],
  },
  {
    id: 'c2', name: 'Globex Industries', email: 'info@globex.com', phone: '+1 555-0202',
    company: 'Globex', industry: 'Manufacturing', status: 'active', value: 92000,
    createdAt: '2023-11-08', tags: ['enterprise', 'key-account'],
    notes: [
      { id: 'n2', content: 'Interested in expanding to 3 more departments.', author: 'Jordan Lee', createdAt: '2024-04-02' },
    ],
  },
  {
    id: 'c3', name: 'Initech Solutions', email: 'hello@initech.io', phone: '+1 555-0303',
    company: 'Initech', industry: 'Consulting', status: 'active', value: 24000,
    createdAt: '2024-02-20', tags: ['mid-market'],
    notes: [],
  },
  {
    id: 'c4', name: 'Umbrella Tech', email: 'sales@umbrella.tech', phone: '+1 555-0404',
    company: 'Umbrella Tech', industry: 'Cybersecurity', status: 'inactive', value: 15000,
    createdAt: '2023-09-01', tags: ['churned'],
    notes: [
      { id: 'n3', content: 'Budget cut, may return Q3 2025.', author: 'Sam Rivera', createdAt: '2024-01-20' },
    ],
  },
  {
    id: 'c5', name: 'Weyland Corp', email: 'bizdev@weyland.co', phone: '+1 555-0505',
    company: 'Weyland', industry: 'Aerospace', status: 'prospect', value: 0,
    createdAt: '2024-05-01', tags: ['new', 'high-potential'],
    notes: [],
  },
  {
    id: 'c6', name: 'Soylent Media', email: 'media@soylent.io', phone: '+1 555-0606',
    company: 'Soylent Media', industry: 'Media', status: 'active', value: 36000,
    createdAt: '2024-01-30', tags: ['agency'],
    notes: [],
  },
]

export const leads: Lead[] = [
  {
    id: 'l1', title: 'Enterprise Suite Upgrade', contactName: 'Marcus Webb', contactEmail: 'mwebb@dynacorp.com',
    company: 'Dynacorp', value: 75000, status: 'qualified', assignedTo: 'u1',
    createdAt: '2024-05-01', updatedAt: '2024-05-18', probability: 65,
    tags: ['enterprise', 'upsell'], notes: [
      { id: 'ln1', content: 'Had a great demo call — needs security review before sign-off.', author: 'Alex Morgan', createdAt: '2024-05-10' }
    ],
  },
  {
    id: 'l2', title: 'Platform Migration Project', contactName: 'Priya Sharma', contactEmail: 'priya@nexus.io',
    company: 'Nexus Labs', value: 42000, status: 'proposal', assignedTo: 'u2',
    createdAt: '2024-04-20', updatedAt: '2024-05-20', probability: 80,
    tags: ['migration'], notes: [],
  },
  {
    id: 'l3', title: 'Starter Plan Signup', contactName: 'Leo Tanaka', contactEmail: 'leo@mintleaf.co',
    company: 'MintLeaf', value: 6000, status: 'new', assignedTo: 'u4',
    createdAt: '2024-05-22', updatedAt: '2024-05-22', probability: 30,
    tags: ['smb'], notes: [],
  },
  {
    id: 'l4', title: 'Annual Contract Renewal', contactName: 'Sarah Blake', contactEmail: 'sblake@vertex.com',
    company: 'Vertex Systems', value: 120000, status: 'won', assignedTo: 'u2',
    createdAt: '2024-03-15', updatedAt: '2024-05-15', probability: 100,
    tags: ['renewal', 'key-account'], notes: [],
  },
  {
    id: 'l5', title: 'SMB Outbound Prospect', contactName: 'Dana Cruz', contactEmail: 'dana@brightbit.dev',
    company: 'BrightBit', value: 9600, status: 'contacted', assignedTo: 'u3',
    createdAt: '2024-05-10', updatedAt: '2024-05-19', probability: 40,
    tags: ['outbound', 'smb'], notes: [],
  },
  {
    id: 'l6', title: 'Pilot Program', contactName: 'Kevin Osei', contactEmail: 'kevin@stellarworks.com',
    company: 'StellarWorks', value: 18000, status: 'qualified', assignedTo: 'u1',
    createdAt: '2024-05-05', updatedAt: '2024-05-21', probability: 55,
    tags: ['pilot'], notes: [],
  },
  {
    id: 'l7', title: 'Competitive Displacement', contactName: 'Emily Zhao', contactEmail: 'ezhao@corelink.io',
    company: 'CoreLink', value: 55000, status: 'contacted', assignedTo: 'u3',
    createdAt: '2024-05-12', updatedAt: '2024-05-20', probability: 35,
    tags: ['competitive'], notes: [],
  },
  {
    id: 'l8', title: 'Budget Cut — Lost', contactName: 'Tom Nguyen', contactEmail: 'tom@fluxco.com',
    company: 'FluxCo', value: 28000, status: 'lost', assignedTo: 'u4',
    createdAt: '2024-04-01', updatedAt: '2024-05-01', probability: 0,
    tags: ['budget'], notes: [],
  },
]

export const tasks: Task[] = [
  {
    id: 't1', title: 'Follow up with Dynacorp security team', description: 'Send security questionnaire and schedule review meeting.',
    status: 'todo', priority: 'high', assignedTo: 'u1', dueDate: '2024-05-29',
    createdAt: '2024-05-20', relatedTo: { type: 'lead', id: 'l1', name: 'Enterprise Suite Upgrade' },
    tags: ['follow-up'],
  },
  {
    id: 't2', title: 'Prepare Nexus Labs proposal doc', description: 'Draft SOW and pricing for migration project.',
    status: 'in_progress', priority: 'high', assignedTo: 'u2', dueDate: '2024-05-27',
    createdAt: '2024-05-21', relatedTo: { type: 'lead', id: 'l2', name: 'Platform Migration Project' },
    tags: ['proposal'],
  },
  {
    id: 't3', title: 'Onboarding call — Vertex Systems', description: 'Kick off annual contract, introduce CSM.',
    status: 'todo', priority: 'medium', assignedTo: 'u2', dueDate: '2024-05-30',
    createdAt: '2024-05-15', relatedTo: { type: 'customer', id: 'c2', name: 'Globex Industries' },
    tags: ['onboarding'],
  },
  {
    id: 't4', title: 'Send MintLeaf intro deck', description: 'Personalized deck highlighting SMB use cases.',
    status: 'todo', priority: 'low', assignedTo: 'u4', dueDate: '2024-05-28',
    createdAt: '2024-05-22', relatedTo: { type: 'lead', id: 'l3', name: 'Starter Plan Signup' },
    tags: ['outreach'],
  },
  {
    id: 't5', title: 'QBR prep for Globex', description: 'Gather usage metrics and ROI data for QBR slide deck.',
    status: 'done', priority: 'high', assignedTo: 'u1', dueDate: '2024-05-20',
    createdAt: '2024-05-10', relatedTo: { type: 'customer', id: 'c2', name: 'Globex Industries' },
    tags: ['qbr'],
  },
  {
    id: 't6', title: 'Update CRM pipeline from last week calls', description: '',
    status: 'done', priority: 'low', assignedTo: 'u3', dueDate: '2024-05-24',
    createdAt: '2024-05-20', tags: [],
  },
  {
    id: 't7', title: 'LinkedIn outreach to BrightBit', description: 'Send connection requests and intro message.',
    status: 'in_progress', priority: 'medium', assignedTo: 'u3', dueDate: '2024-05-26',
    createdAt: '2024-05-18', relatedTo: { type: 'lead', id: 'l5', name: 'SMB Outbound Prospect' },
    tags: ['outbound'],
  },
  {
    id: 't8', title: 'Schedule pilot kickoff — StellarWorks', description: '',
    status: 'todo', priority: 'medium', assignedTo: 'u1', dueDate: '2024-06-03',
    createdAt: '2024-05-21', relatedTo: { type: 'lead', id: 'l6', name: 'Pilot Program' },
    tags: ['pilot'],
  },
]

export const activities: Activity[] = [
  { id: 'a1', type: 'lead_won', message: 'Vertex Systems annual contract marked as Won', user: 'Jordan Lee', timestamp: '2024-05-15T14:32:00Z' },
  { id: 'a2', type: 'customer_added', message: 'Weyland Corp added as new prospect', user: 'Sam Rivera', timestamp: '2024-05-22T09:15:00Z' },
  { id: 'a3', type: 'task_completed', message: 'QBR prep for Globex completed', user: 'Alex Morgan', timestamp: '2024-05-20T17:00:00Z' },
  { id: 'a4', type: 'note_added', message: 'Note added on Nexus Labs lead', user: 'Jordan Lee', timestamp: '2024-05-18T11:45:00Z' },
  { id: 'a5', type: 'lead_created', message: 'New lead: MintLeaf Starter Plan Signup', user: 'Taylor Kim', timestamp: '2024-05-22T10:00:00Z' },
  { id: 'a6', type: 'status_changed', message: 'CoreLink lead moved to Contacted', user: 'Sam Rivera', timestamp: '2024-05-20T13:20:00Z' },
]
