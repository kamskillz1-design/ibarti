-- Seeded from the open-source Country-State-City dataset (see supabase/seed/locations.sql).
-- village/area and neighborhood/zone are intentionally NOT modeled here — that
-- granularity isn't reliably available in open datasets, so it stays as free
-- text on profiles/listings instead.

create table countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  iso_code text not null unique
);

create table states_provinces (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references countries (id) on delete cascade,
  name text not null
);

create table cities (
  id uuid primary key default gen_random_uuid(),
  state_province_id uuid not null references states_provinces (id) on delete cascade,
  name text not null,
  lat double precision,
  lng double precision
);

create index cities_state_province_id_idx on cities (state_province_id);
create index states_provinces_country_id_idx on states_provinces (country_id);
