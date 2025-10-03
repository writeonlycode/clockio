-- Create a table for tasks
create table tasks (
  id uuid not null primary key default uuid_generate_v4(),
  created_at timestamp with time zone default current_timestamp not null,
  updated_at timestamp with time zone default current_timestamp not null,
  title text not null default '',
  description text not null default '',
  status text not null default 'todo',
  profile_id uuid references public.profiles not null default auth.uid(),
  task_list_id uuid references public.task_lists on delete cascade,
  task_list_order integer not null default 0
);

-- Set up Row Level Security (RLS)
alter table tasks
  enable row level security;

create policy "Users can create new tasks" on tasks
  for insert with check ((select auth.uid()) = profile_id);

create policy "Users can view their own tasks" on tasks
  for select using ((select auth.uid()) = profile_id);

create policy "Users can update their own tasks" on tasks
  for update using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "Users can delete their own tasks" on tasks
  for delete using ((select auth.uid()) = profile_id);

-- This trigger automatically updates the column updated_at when an entry is updated.
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;

create trigger update_tasks_updated_at
before update on public.tasks
for each row execute function update_updated_at_column();
