create extension if not exists "pgcrypto";
create extension if not exists "unaccent";
create extension if not exists "pg_trgm";

do $$ begin
  create type public.lead_status as enum ('new', 'contacted', 'quoted', 'won', 'lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.service_type as enum (
    'business_website',
    'conversion_landing_page',
    'facebook_ads',
    'google_ads',
    'fanpage_setup',
    'facebook_group_setup',
    'personal_branding',
    'marketing_strategy',
    'marketing_audit',
    'growth_consulting'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.user_role as enum ('admin', 'sale', 'marketing');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.order_status as enum ('draft', 'active', 'paused', 'completed', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.payment_status as enum ('pending', 'paid', 'overdue', 'refunded', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.blog_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.slugify_vi(value text)
returns text
language sql
immutable
as $$
  select trim(both '-' from regexp_replace(lower(unaccent(value)), '[^a-z0-9]+', '-', 'g'));
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 120),
  avatar_url text,
  phone text check (phone is null or phone ~ '^(\\+84|0)[0-9]{9,10}$'),
  position text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role public.user_role not null default 'marketing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  service_type public.service_type not null unique,
  slug text not null unique,
  title text not null check (char_length(title) between 3 and 160),
  short_description text not null check (char_length(short_description) between 20 and 280),
  description text not null,
  icon text not null default 'sparkles',
  starting_price numeric(14,0) not null default 0 check (starting_price >= 0),
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null check (phone ~ '^(\\+84|0)[0-9]{9,10}$'),
  email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'),
  industry text not null check (char_length(industry) between 2 and 120),
  service_interest public.service_type not null,
  budget_range text not null check (char_length(budget_range) between 2 and 80),
  message text not null check (char_length(message) between 10 and 2000),
  status public.lead_status not null default 'new',
  source text not null default 'website',
  utm_source text,
  ip_hash text,
  user_agent_hash text,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  content text not null check (char_length(content) between 2 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.service_orders (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  service_id uuid not null references public.services(id) on delete restrict,
  owner_id uuid references public.profiles(id) on delete set null,
  status public.order_status not null default 'draft',
  total_amount numeric(14,0) not null default 0 check (total_amount >= 0),
  currency text not null default 'VND',
  start_date date,
  due_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.service_orders(id) on delete cascade,
  amount numeric(14,0) not null check (amount >= 0),
  currency text not null default 'VND',
  payment_status public.payment_status not null default 'pending',
  provider text not null default 'manual',
  transaction_reference text unique,
  paid_at timestamptz,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.blog_categories(id) on delete set null,
  title text not null check (char_length(title) between 5 and 180),
  slug text not null unique,
  excerpt text not null check (char_length(excerpt) between 20 and 320),
  content_html text not null check (char_length(content_html) >= 80),
  cover_image_url text,
  seo_title text,
  meta_description text,
  og_image_url text,
  status public.blog_status not null default 'draft',
  published_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_requires_date check (status <> 'published' or published_at is not null)
);

create table if not exists public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client_name text not null,
  client_logo_url text,
  cover_image_url text,
  industry text not null,
  challenge text not null,
  solution text not null,
  result_summary text not null,
  content_html text not null,
  revenue_growth numeric(8,2) not null default 0,
  lead_growth numeric(8,2) not null default 0,
  conversion_rate numeric(8,2) not null default 0,
  status public.blog_status not null default 'published',
  published_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  role text not null,
  company text not null,
  avatar_url text,
  quote text not null check (char_length(quote) between 20 and 800),
  rating integer not null default 5 check (rating between 1 and 5),
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default 'marketing',
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null,
  monthly_price numeric(14,0) not null check (monthly_price >= 0),
  setup_fee numeric(14,0) not null default 0 check (setup_fee >= 0),
  features jsonb not null default '[]'::jsonb,
  is_recommended boolean not null default false,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaign_metrics (
  id uuid primary key default gen_random_uuid(),
  service_order_id uuid references public.service_orders(id) on delete cascade,
  campaign_name text not null,
  channel text not null,
  report_date date not null,
  impressions integer not null default 0 check (impressions >= 0),
  clicks integer not null default 0 check (clicks >= 0),
  leads integer not null default 0 check (leads >= 0),
  spend numeric(14,0) not null default 0 check (spend >= 0),
  revenue numeric(14,0) not null default 0 check (revenue >= 0),
  conversion_rate numeric(8,2) not null default 0 check (conversion_rate >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_name, channel, report_date)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  ip_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  uploader_id uuid references public.profiles(id) on delete set null,
  bucket text not null,
  path text not null,
  public_url text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760),
  alt_text text,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

create index if not exists idx_leads_status_created_at on public.leads(status, created_at desc);
create index if not exists idx_leads_search on public.leads using gin ((full_name || ' ' || email || ' ' || phone || ' ' || industry) gin_trgm_ops);
create index if not exists idx_lead_notes_lead_id on public.lead_notes(lead_id, created_at desc);
create index if not exists idx_service_orders_status on public.service_orders(status, created_at desc);
create index if not exists idx_payments_status on public.payments(payment_status, due_date);
create index if not exists idx_blog_posts_status_published on public.blog_posts(status, published_at desc) where deleted_at is null;
create index if not exists idx_blog_posts_search on public.blog_posts using gin ((title || ' ' || excerpt) gin_trgm_ops);
create index if not exists idx_case_studies_status on public.case_studies(status, published_at desc) where deleted_at is null;
create index if not exists idx_campaign_metrics_report_date on public.campaign_metrics(report_date desc);
create index if not exists idx_audit_logs_entity on public.audit_logs(entity_type, entity_id, created_at desc);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists set_user_roles_updated_at on public.user_roles;
create trigger set_user_roles_updated_at before update on public.user_roles for each row execute function public.set_updated_at();
drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at before update on public.services for each row execute function public.set_updated_at();
drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
drop trigger if exists set_service_orders_updated_at on public.service_orders;
create trigger set_service_orders_updated_at before update on public.service_orders for each row execute function public.set_updated_at();
drop trigger if exists set_payments_updated_at on public.payments;
create trigger set_payments_updated_at before update on public.payments for each row execute function public.set_updated_at();
drop trigger if exists set_blog_categories_updated_at on public.blog_categories;
create trigger set_blog_categories_updated_at before update on public.blog_categories for each row execute function public.set_updated_at();
drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
drop trigger if exists set_case_studies_updated_at on public.case_studies;
create trigger set_case_studies_updated_at before update on public.case_studies for each row execute function public.set_updated_at();
drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
drop trigger if exists set_faq_items_updated_at on public.faq_items;
create trigger set_faq_items_updated_at before update on public.faq_items for each row execute function public.set_updated_at();
drop trigger if exists set_pricing_plans_updated_at on public.pricing_plans;
create trigger set_pricing_plans_updated_at before update on public.pricing_plans for each row execute function public.set_updated_at();
drop trigger if exists set_campaign_metrics_updated_at on public.campaign_metrics;
create trigger set_campaign_metrics_updated_at before update on public.campaign_metrics for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1), 'Thành viên MIDIGI'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'marketing')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.current_app_role()
returns public.user_role
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'app_role', '')::public.user_role,
    (select role from public.user_roles where user_id = auth.uid()),
    'marketing'::public.user_role
  );
$$;

create or replace function public.has_role(required_role public.user_role)
returns boolean
language sql
stable
as $$
  select case
    when auth.uid() is null then false
    when public.current_app_role() = 'admin' then true
    when required_role = public.current_app_role() then true
    else false
  end;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
as $$
  select auth.uid() is not null and public.current_app_role() in ('admin', 'sale', 'marketing');
$$;

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
  user_role public.user_role;
begin
  select role into user_role from public.user_roles where user_id = (event ->> 'user_id')::uuid;
  claims := event -> 'claims';
  claims := jsonb_set(claims, '{app_role}', to_jsonb(coalesce(user_role::text, 'marketing')));
  return jsonb_set(event, '{claims}', claims);
end;
$$;

grant usage on schema public to anon, authenticated, service_role;
grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook(jsonb) from authenticated, anon, public;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.services enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.service_orders enable row level security;
alter table public.payments enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.case_studies enable row level security;
alter table public.testimonials enable row level security;
alter table public.faq_items enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.campaign_metrics enable row level security;
alter table public.audit_logs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.media_assets enable row level security;

drop policy if exists "profiles_read_own_or_staff" on public.profiles;
create policy "profiles_read_own_or_staff" on public.profiles for select using (id = auth.uid() or public.is_staff());
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "roles_admin_read" on public.user_roles;
create policy "roles_admin_read" on public.user_roles for select using (public.has_role('admin') or user_id = auth.uid());
drop policy if exists "roles_admin_write" on public.user_roles;
create policy "roles_admin_write" on public.user_roles for all using (public.has_role('admin')) with check (public.has_role('admin'));

drop policy if exists "services_public_read" on public.services;
create policy "services_public_read" on public.services for select using (is_active = true or public.is_staff());
drop policy if exists "services_staff_write" on public.services;
create policy "services_staff_write" on public.services for all using (public.has_role('admin')) with check (public.has_role('admin'));

drop policy if exists "leads_staff_read" on public.leads;
create policy "leads_staff_read" on public.leads for select using (public.has_role('admin') or public.has_role('sale') or public.has_role('marketing'));
drop policy if exists "leads_staff_update" on public.leads;
create policy "leads_staff_update" on public.leads for update using (public.has_role('admin') or public.has_role('sale')) with check (public.has_role('admin') or public.has_role('sale'));

drop policy if exists "lead_notes_staff_read" on public.lead_notes;
create policy "lead_notes_staff_read" on public.lead_notes for select using (public.is_staff());
drop policy if exists "lead_notes_staff_insert" on public.lead_notes;
create policy "lead_notes_staff_insert" on public.lead_notes for insert with check (public.is_staff());

drop policy if exists "orders_staff_read" on public.service_orders;
create policy "orders_staff_read" on public.service_orders for select using (public.is_staff());
drop policy if exists "orders_admin_sale_write" on public.service_orders;
create policy "orders_admin_sale_write" on public.service_orders for all using (public.has_role('admin') or public.has_role('sale')) with check (public.has_role('admin') or public.has_role('sale'));

drop policy if exists "payments_staff_read" on public.payments;
create policy "payments_staff_read" on public.payments for select using (public.is_staff());
drop policy if exists "payments_admin_sale_write" on public.payments;
create policy "payments_admin_sale_write" on public.payments for all using (public.has_role('admin') or public.has_role('sale')) with check (public.has_role('admin') or public.has_role('sale'));

drop policy if exists "blog_categories_public_read" on public.blog_categories;
create policy "blog_categories_public_read" on public.blog_categories for select using (true);
drop policy if exists "blog_categories_marketing_write" on public.blog_categories;
create policy "blog_categories_marketing_write" on public.blog_categories for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "blog_tags_public_read" on public.blog_tags;
create policy "blog_tags_public_read" on public.blog_tags for select using (true);
drop policy if exists "blog_tags_marketing_write" on public.blog_tags;
create policy "blog_tags_marketing_write" on public.blog_tags for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read" on public.blog_posts for select using ((status = 'published' and deleted_at is null) or public.is_staff());
drop policy if exists "blog_posts_marketing_write" on public.blog_posts;
create policy "blog_posts_marketing_write" on public.blog_posts for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "blog_post_tags_public_read" on public.blog_post_tags;
create policy "blog_post_tags_public_read" on public.blog_post_tags for select using (true);
drop policy if exists "blog_post_tags_marketing_write" on public.blog_post_tags;
create policy "blog_post_tags_marketing_write" on public.blog_post_tags for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "case_studies_public_read" on public.case_studies;
create policy "case_studies_public_read" on public.case_studies for select using ((status = 'published' and deleted_at is null) or public.is_staff());
drop policy if exists "case_studies_marketing_write" on public.case_studies;
create policy "case_studies_marketing_write" on public.case_studies for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read" on public.testimonials for select using (is_published = true or public.is_staff());
drop policy if exists "testimonials_marketing_write" on public.testimonials;
create policy "testimonials_marketing_write" on public.testimonials for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "faq_public_read" on public.faq_items;
create policy "faq_public_read" on public.faq_items for select using (is_published = true or public.is_staff());
drop policy if exists "faq_marketing_write" on public.faq_items;
create policy "faq_marketing_write" on public.faq_items for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "pricing_public_read" on public.pricing_plans;
create policy "pricing_public_read" on public.pricing_plans for select using (is_active = true or public.is_staff());
drop policy if exists "pricing_admin_write" on public.pricing_plans;
create policy "pricing_admin_write" on public.pricing_plans for all using (public.has_role('admin')) with check (public.has_role('admin'));

drop policy if exists "campaign_metrics_staff_read" on public.campaign_metrics;
create policy "campaign_metrics_staff_read" on public.campaign_metrics for select using (public.is_staff());
drop policy if exists "campaign_metrics_marketing_write" on public.campaign_metrics;
create policy "campaign_metrics_marketing_write" on public.campaign_metrics for all using (public.has_role('admin') or public.has_role('marketing')) with check (public.has_role('admin') or public.has_role('marketing'));

drop policy if exists "audit_logs_admin_read" on public.audit_logs;
create policy "audit_logs_admin_read" on public.audit_logs for select using (public.has_role('admin'));

drop policy if exists "contact_messages_staff_read" on public.contact_messages;
create policy "contact_messages_staff_read" on public.contact_messages for select using (public.is_staff());

drop policy if exists "media_assets_staff_read" on public.media_assets;
create policy "media_assets_staff_read" on public.media_assets for select using (public.is_staff());
drop policy if exists "media_assets_staff_insert" on public.media_assets;
create policy "media_assets_staff_insert" on public.media_assets for insert with check (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('blog-covers', 'blog-covers', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif']),
  ('case-study-logos', 'case-study-logos', true, 2097152, array['image/jpeg','image/png','image/webp','image/svg+xml']),
  ('case-study-media', 'case-study-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif','application/pdf']),
  ('testimonial-avatars', 'testimonial-avatars', true, 2097152, array['image/jpeg','image/png','image/webp','image/avif']),
  ('brand-assets', 'brand-assets', true, 5242880, array['image/jpeg','image/png','image/webp','image/svg+xml','image/avif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "storage_public_read_midigi_assets" on storage.objects;
create policy "storage_public_read_midigi_assets"
on storage.objects for select
using (bucket_id in ('blog-covers','case-study-logos','case-study-media','testimonial-avatars','brand-assets'));

drop policy if exists "storage_staff_insert_midigi_assets" on storage.objects;
create policy "storage_staff_insert_midigi_assets"
on storage.objects for insert
with check (bucket_id in ('blog-covers','case-study-logos','case-study-media','testimonial-avatars','brand-assets') and public.is_staff());

drop policy if exists "storage_staff_update_midigi_assets" on storage.objects;
create policy "storage_staff_update_midigi_assets"
on storage.objects for update
using (bucket_id in ('blog-covers','case-study-logos','case-study-media','testimonial-avatars','brand-assets') and public.is_staff())
with check (bucket_id in ('blog-covers','case-study-logos','case-study-media','testimonial-avatars','brand-assets') and public.is_staff());

drop policy if exists "storage_staff_delete_midigi_assets" on storage.objects;
create policy "storage_staff_delete_midigi_assets"
on storage.objects for delete
using (bucket_id in ('blog-covers','case-study-logos','case-study-media','testimonial-avatars','brand-assets') and public.has_role('admin'));
