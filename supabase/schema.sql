-- ============================================================
-- CarePen Database Schema
-- Run this in your Supabase SQL editor (supabase.com → SQL Editor)
-- ============================================================

-- Profiles (auto-created on signup via trigger)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  specialty text,
  created_at timestamptz default now()
);

-- Patients
create table if not exists public.patients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  date_of_birth date,
  gender text,
  phone text,
  email text,
  mrn text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Encounters
create table if not exists public.encounters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  patient_id uuid references public.patients(id) on delete cascade not null,
  encounter_date date not null default current_date,
  encounter_type text not null default 'Office Visit',
  chief_complaint text,
  status text not null default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Notes
create table if not exists public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  encounter_id uuid references public.encounters(id) on delete cascade not null,
  patient_id uuid references public.patients(id) on delete cascade not null,
  note_type text not null default 'progress',
  content text,
  status text not null default 'draft',
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Row Level Security ──────────────────────────────────────

alter table public.profiles  enable row level security;
alter table public.patients  enable row level security;
alter table public.encounters enable row level security;
alter table public.notes     enable row level security;

-- Profiles: users see only their own
create policy "profiles_own" on public.profiles
  for all using (auth.uid() = id);

-- Patients: users see only their own
create policy "patients_own" on public.patients
  for all using (auth.uid() = user_id);

-- Encounters: users see only their own
create policy "encounters_own" on public.encounters
  for all using (auth.uid() = user_id);

-- Notes: users see only their own
create policy "notes_own" on public.notes
  for all using (auth.uid() = user_id);

-- ── Auto-create profile on signup ──────────────────────────

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, last_name, specialty)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'specialty'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
