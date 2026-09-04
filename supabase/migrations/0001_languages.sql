-- Languages available anywhere in the app, and which languages each region
-- offers with which default. Adding a new language or region default later
-- is an INSERT into these tables, not a schema change.

create table languages (
  code text primary key,
  name text not null,
  native_name text not null
);

create table region_languages (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references states_provinces (id) on delete cascade,
  language_code text not null references languages (code),
  is_default boolean not null default false,
  display_order integer not null default 0,
  unique (region_id, language_code)
);

-- Exactly one default language per region.
create unique index one_default_language_per_region
  on region_languages (region_id)
  where is_default;
