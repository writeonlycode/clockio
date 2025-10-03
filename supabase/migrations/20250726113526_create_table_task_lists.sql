-- Create a table for task lists
create table task_lists (
  id uuid not null primary key default uuid_generate_v4(),
  created_at timestamp with time zone default current_timestamp not null,
  updated_at timestamp with time zone default current_timestamp not null,
  title text not null default '',
  description text not null default '',
  task_list_order integer not null default 0,
  profile_id uuid references public.profiles not null default auth.uid()
);

-- Set up Row Level Security (RLS)
alter table task_lists
  enable row level security;

create policy "Users can create new task lists" on task_lists
  for insert with check ((select auth.uid()) = profile_id);

create policy "Users can view their own task lists" on task_lists
  for select using ((select auth.uid()) = profile_id);

create policy "Users can update their own task lists" on task_lists
  for update using ((select auth.uid()) = profile_id);

create policy "Users can delete their own task lists" on task_lists
  for delete using ((select auth.uid()) = profile_id);

-- This trigger automatically updates the column updated_at when an entry is updated.
create or replace function public.task_lists_updated_at_function()
returns trigger as $$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;

create trigger task_lists_updated_at_trigger
before update on public.task_lists
for each row execute function task_lists_updated_at_function();

