create extension if not exists "pgcrypto";

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  title text not null,
  meta text,
  image text,
  suburb text,
  badges text[] not null default array[]::text[],
  slug text not null unique,
  virtual_tour text,
  source_id text
);

create or replace function public.set_listings_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists listings_set_updated_at on public.listings;
create trigger listings_set_updated_at
before update on public.listings
for each row execute procedure public.set_listings_updated_at();

create index if not exists listings_suburb_idx on public.listings((lower(suburb)));
create index if not exists listings_created_idx on public.listings(created_at desc);
