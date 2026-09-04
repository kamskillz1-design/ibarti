-- listings table with full-text search, RLS, and per-user rate-limit support
-- all built in at creation time — not migrated in later.

create table listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  listing_type text not null check (listing_type in ('have', 'want')),
  title text not null,
  description text,
  exchange_type text not null check (exchange_type in ('goods', 'services', 'digital')),
  desired_title text,
  desired_description text,
  category text not null,
  subcategory text,
  delivery_scope text not null check (delivery_scope in ('local', 'national', 'international', 'online')),
  city_id uuid references cities (id),
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'traded', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Full-text search column, generated at creation time (day-one plan item).
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(desired_title, '')), 'B')
  ) stored
);

create index listings_search_vector_idx on listings using gin (search_vector);
create index listings_city_id_idx on listings (city_id);
create index listings_user_id_idx on listings (user_id);

alter table listings enable row level security;

-- Anyone can read active listings.
create policy listings_select_active on listings
  for select using (status = 'active' or user_id = auth.uid());

-- A user can only create listings as themselves.
create policy listings_insert_own on listings
  for insert with check (user_id = auth.uid());

-- A user can only update/delete their own listings.
create policy listings_update_own on listings
  for update using (user_id = auth.uid());

create policy listings_delete_own on listings
  for delete using (user_id = auth.uid());

-- Simple per-user rate limit: no more than 10 listings created in a rolling
-- hour. Enforced as a check inside the insert policy via a helper function,
-- so it can't be bypassed by calling the table directly.
create function listings_under_rate_limit(p_user_id uuid)
returns boolean
language sql
stable
as $$
  select count(*) < 10
  from listings
  where user_id = p_user_id
    and created_at > now() - interval '1 hour';
$$;

drop policy listings_insert_own on listings;
create policy listings_insert_own on listings
  for insert with check (
    user_id = auth.uid() and listings_under_rate_limit(auth.uid())
  );
