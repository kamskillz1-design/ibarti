insert into languages (code, name, native_name) values
  ('es', 'Spanish', 'Español'),
  ('eu', 'Basque', 'Euskara'),
  ('en', 'English', 'English')
on conflict (code) do nothing;

-- Replace :basque_country_region_id with the actual id of the Basque Country
-- row in states_provinces once supabase/seed/locations.sql has been run.
insert into region_languages (region_id, language_code, is_default, display_order) values
  (:'basque_country_region_id', 'es', true, 1),
  (:'basque_country_region_id', 'eu', false, 2),
  (:'basque_country_region_id', 'en', false, 3)
on conflict (region_id, language_code) do nothing;
