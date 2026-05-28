-- Run this in your Supabase SQL editor to set up the CRM schema

create table customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  name text not null,
  email text,
  phone text,
  company text,
  industry text,
  status text default 'prospect' check (status in ('active','inactive','prospect')),
  value numeric default 0,
  tags text[] default '{}',
  created_at timestamptz default now()
);
alter table customers enable row level security;
create policy "users manage own customers" on customers for all using (auth.uid() = user_id);

create table leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  contact_name text,
  contact_email text,
  company text,
  value numeric default 0,
  status text default 'new' check (status in ('new','contacted','qualified','proposal','won','lost')),
  assigned_to text,
  probability int default 30,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table leads enable row level security;
create policy "users manage own leads" on leads for all using (auth.uid() = user_id);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  description text,
  status text default 'todo' check (status in ('todo','in_progress','done')),
  priority text default 'medium' check (priority in ('low','medium','high')),
  assigned_to text,
  due_date date,
  related_type text,
  related_id uuid,
  related_name text,
  tags text[] default '{}',
  created_at timestamptz default now()
);
alter table tasks enable row level security;
create policy "users manage own tasks" on tasks for all using (auth.uid() = user_id);

create table notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('customer','lead')),
  entity_id uuid not null,
  content text not null,
  author text,
  created_at timestamptz default now()
);
alter table notes enable row level security;
create policy "authenticated users can manage notes" on notes for all using (auth.uid() is not null);
