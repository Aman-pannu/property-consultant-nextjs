-- Enable UUID generation helper
create extension if not exists "pgcrypto";

-- Leads table stores all CRM submissions
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  stage text not null default 'New',
  tags text[] not null default array[]::text[],
  notes text,
  follow_up_at timestamptz
);

-- Keep stage values predictable
alter table public.leads
  add constraint leads_stage_check
  check (stage in ('New','Qualified','In Progress','Won','Lost'));

-- Ensure updated_at mirrors last change
create or replace function public.set_leads_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute procedure public.set_leads_updated_at();

-- Helpful indexes for dashboard filtering/search
create index if not exists leads_stage_idx on public.leads(stage);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_email_idx on public.leads(lower(email));
