-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  display_name text,
  description text
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Everyone can view profiles" on profiles
  for select using (true);

create policy "Users can create their own profile" on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update their own profile" on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, description)
  values (new.id, new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'description');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


-- This trigger automatically updates the column updated_at when an entry is updated.
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function update_updated_at_column();
