create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  title text not null,
  description text not null
);

create or replace function public.set_services_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
before update on public.services
for each row execute procedure public.set_services_updated_at();

insert into public.services (title, description) values
  ('Buyer Advocacy', 'Property search, inspections, due diligence, and auction bidding on your behalf.'),
  ('Sales Advisory', 'Pricing strategy, staging tips, agent selection, and negotiation coaching.'),
  ('Investment Strategy', 'Suburb analysis, rental yields, and long-term growth projections tailored to you.'),
  ('Appraisals', 'Independent market appraisals with comparable sales and micro-market insights.'),
  ('Off-Market Access', 'Tap into a network of agents and private sellers to view properties before they list.'),
  ('Property Management', 'Tenant selection, inspections, and maintenance coordination.')
on conflict do nothing;
