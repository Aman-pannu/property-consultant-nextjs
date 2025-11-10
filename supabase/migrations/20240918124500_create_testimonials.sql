create extension if not exists "pgcrypto";

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  quote text not null,
  author text not null
);

create or replace function public.set_testimonials_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute procedure public.set_testimonials_updated_at();

insert into public.testimonials (quote, author) values
  ('“Aman secured our dream home off‑market and saved us from a stressful auction. Professional and responsive.”', 'Priya & Harpreet, Point Cook'),
  ('“Accurate appraisal and great strategy. We sold above reserve in 18 days.”', 'George, Glen Waverley'),
  ('“Clear communication and data‑driven insights. Highly recommend.”', 'Mei, Doncaster')
on conflict (id) do nothing;
