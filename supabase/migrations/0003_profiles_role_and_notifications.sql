-- Structural placeholders (day-one plan): the columns/tables exist now so
-- later slices (Admin portal, Trade/Messaging notifications) don't require
-- a schema migration when they're built out. No UI or business logic uses
-- these yet.

alter table profiles add column role text not null default 'member'
  check (role in ('member', 'admin'));

alter table profiles add column preferred_language text references languages (code);

alter table profiles add column city_id uuid references cities (id);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  related_trade_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on notifications (user_id);

alter table notifications enable row level security;

create policy notifications_select_own on notifications
  for select using (user_id = auth.uid());

create policy notifications_update_own on notifications
  for update using (user_id = auth.uid());
