-- =====================================================
-- Portfolio Builder Database V2
-- =====================================================

create extension if not exists "pgcrypto";

-- =====================================================
-- PROFILES
-- =====================================================

create table if not exists profiles (

    id uuid primary key default gen_random_uuid(),

    user_id uuid unique not null
        references auth.users(id)
        on delete cascade,

    full_name text not null,

    username text unique not null,

    job_title text,

    about text,

    country text,

    city text,

    email text,

    phone text,

    website text,

    avatar_url text,

    resume_url text,

    is_public boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table profiles enable row level security;

create policy "profiles_select"
on profiles
for select
using (auth.uid() = user_id);

create policy "profiles_insert"
on profiles
for insert
with check (auth.uid() = user_id);

create policy "profiles_update"
on profiles
for update
using (auth.uid() = user_id);

create policy "profiles_delete"
on profiles
for delete
using (auth.uid() = user_id);

-- =====================================================
-- TEMPLATES
-- =====================================================

create table if not exists templates (

    id uuid primary key default gen_random_uuid(),

    name text not null,

    slug text unique not null,

    description text,

    preview_image text,

    is_premium boolean default false,

    created_at timestamptz default now()

);

alter table templates enable row level security;

create policy "templates_public"
on templates
for select
using (true);

-- =====================================================
-- USER TEMPLATES
-- =====================================================

create table if not exists user_templates (

    id uuid primary key default gen_random_uuid(),

    user_id uuid
        references auth.users(id)
        on delete cascade,

    template_id uuid
        references templates(id)
        on delete cascade,

    active boolean default false,

    created_at timestamptz default now()

);

alter table user_templates enable row level security;

create policy "user_templates_select"
on user_templates
for select
using (auth.uid() = user_id);

create policy "user_templates_insert"
on user_templates
for insert
with check (auth.uid() = user_id);

create policy "user_templates_update"
on user_templates
for update
using (auth.uid() = user_id);

create policy "user_templates_delete"
on user_templates
for delete
using (auth.uid() = user_id);
-- =====================================================
-- EDUCATION
-- =====================================================

create table if not exists education (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    institution text not null,

    degree text not null,

    field_of_study text,

    start_date date,

    end_date date,

    grade text,

    description text,

    is_current boolean default false,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table education enable row level security;

create policy "education_select"
on education
for select
using (auth.uid() = user_id);

create policy "education_insert"
on education
for insert
with check (auth.uid() = user_id);

create policy "education_update"
on education
for update
using (auth.uid() = user_id);

create policy "education_delete"
on education
for delete
using (auth.uid() = user_id);

-- =====================================================
-- EXPERIENCE
-- =====================================================

create table if not exists experience (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    company text not null,

    position text not null,

    location text,

    employment_type text,

    start_date date,

    end_date date,

    is_current boolean default false,

    description text,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table experience enable row level security;

create policy "experience_select"
on experience
for select
using (auth.uid() = user_id);

create policy "experience_insert"
on experience
for insert
with check (auth.uid() = user_id);

create policy "experience_update"
on experience
for update
using (auth.uid() = user_id);

create policy "experience_delete"
on experience
for delete
using (auth.uid() = user_id);

-- =====================================================
-- SKILLS
-- =====================================================

create table if not exists skills (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    name text not null,

    level integer default 50,

    category text,

    icon text,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table skills enable row level security;

create policy "skills_select"
on skills
for select
using (auth.uid() = user_id);

create policy "skills_insert"
on skills
for insert
with check (auth.uid() = user_id);

create policy "skills_update"
on skills
for update
using (auth.uid() = user_id);

create policy "skills_delete"
on skills
for delete
using (auth.uid() = user_id);
-- =====================================================
-- PROJECTS
-- =====================================================

create table if not exists projects (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    title text not null,

    slug text,

    description text,

    cover_image text,

    github_url text,

    live_url text,

    video_url text,

    featured boolean default false,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table projects enable row level security;

create policy "projects_select"
on projects
for select
using (auth.uid() = user_id);

create policy "projects_insert"
on projects
for insert
with check (auth.uid() = user_id);

create policy "projects_update"
on projects
for update
using (auth.uid() = user_id);

create policy "projects_delete"
on projects
for delete
using (auth.uid() = user_id);

-- =====================================================
-- PROJECT IMAGES
-- =====================================================

create table if not exists project_images (

    id uuid primary key default gen_random_uuid(),

    project_id uuid not null
        references projects(id)
        on delete cascade,

    image_url text not null,

    display_order integer default 0,

    created_at timestamptz default now()

);

alter table project_images enable row level security;

create policy "project_images_select"
on project_images
for select
using (
    exists (
        select 1
        from projects
        where projects.id = project_images.project_id
        and projects.user_id = auth.uid()
    )
);

create policy "project_images_insert"
on project_images
for insert
with check (
    exists (
        select 1
        from projects
        where projects.id = project_images.project_id
        and projects.user_id = auth.uid()
    )
);

create policy "project_images_update"
on project_images
for update
using (
    exists (
        select 1
        from projects
        where projects.id = project_images.project_id
        and projects.user_id = auth.uid()
    )
);

create policy "project_images_delete"
on project_images
for delete
using (
    exists (
        select 1
        from projects
        where projects.id = project_images.project_id
        and projects.user_id = auth.uid()
    )
);
-- =====================================================
-- CERTIFICATES
-- =====================================================

create table if not exists certificates (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    title text not null,

    organization text not null,

    issue_date date,

    credential_url text,

    image_url text,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table certificates enable row level security;

create policy "certificates_select"
on certificates
for select
using (auth.uid() = user_id);

create policy "certificates_insert"
on certificates
for insert
with check (auth.uid() = user_id);

create policy "certificates_update"
on certificates
for update
using (auth.uid() = user_id);

create policy "certificates_delete"
on certificates
for delete
using (auth.uid() = user_id);

-- =====================================================
-- LANGUAGES
-- =====================================================

create table if not exists languages (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    name text not null,

    level text not null,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table languages enable row level security;

create policy "languages_select"
on languages
for select
using (auth.uid() = user_id);

create policy "languages_insert"
on languages
for insert
with check (auth.uid() = user_id);

create policy "languages_update"
on languages
for update
using (auth.uid() = user_id);

create policy "languages_delete"
on languages
for delete
using (auth.uid() = user_id);

-- =====================================================
-- ACHIEVEMENTS
-- =====================================================

create table if not exists achievements (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    title text not null,

    description text,

    achievement_year integer,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table achievements enable row level security;

create policy "achievements_select"
on achievements
for select
using (auth.uid() = user_id);

create policy "achievements_insert"
on achievements
for insert
with check (auth.uid() = user_id);

create policy "achievements_update"
on achievements
for update
using (auth.uid() = user_id);

create policy "achievements_delete"
on achievements
for delete
using (auth.uid() = user_id);
-- =====================================================
-- SOCIAL LINKS
-- =====================================================

create table if not exists social_links (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    platform text not null,

    url text not null,

    display_order integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table social_links enable row level security;

create policy "social_links_select"
on social_links
for select
using (auth.uid() = user_id);

create policy "social_links_insert"
on social_links
for insert
with check (auth.uid() = user_id);

create policy "social_links_update"
on social_links
for update
using (auth.uid() = user_id);

create policy "social_links_delete"
on social_links
for delete
using (auth.uid() = user_id);

-- =====================================================
-- PORTFOLIO SETTINGS
-- =====================================================

create table if not exists portfolio_settings (

    id uuid primary key default gen_random_uuid(),

    user_id uuid unique not null
        references auth.users(id)
        on delete cascade,

    template_id uuid
        references templates(id)
        on delete set null,

    primary_color text default '#8E77A8',

    secondary_color text default '#F5F1E8',

    font text default 'Inter',

    show_about boolean default true,

    show_projects boolean default true,

    show_skills boolean default true,

    show_education boolean default true,

    show_experience boolean default true,

    show_certificates boolean default true,

    show_languages boolean default true,

    show_achievements boolean default true,

    show_email boolean default true,

    show_phone boolean default false,

    show_location boolean default true,

    seo_title text,

    seo_description text,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table portfolio_settings enable row level security;

create policy "portfolio_settings_select"
on portfolio_settings
for select
using (auth.uid() = user_id);

create policy "portfolio_settings_insert"
on portfolio_settings
for insert
with check (auth.uid() = user_id);

create policy "portfolio_settings_update"
on portfolio_settings
for update
using (auth.uid() = user_id);

create policy "portfolio_settings_delete"
on portfolio_settings
for delete
using (auth.uid() = user_id);
-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================

create table if not exists subscriptions (

    id uuid primary key default gen_random_uuid(),

    user_id uuid unique not null
        references auth.users(id)
        on delete cascade,

    plan text not null default 'free',

    status text not null default 'trial',

    trial_start timestamptz default now(),

    trial_end timestamptz default (now() + interval '7 days'),

    subscription_start timestamptz,

    subscription_end timestamptz,

    stripe_customer_id text,

    stripe_subscription_id text,

    created_at timestamptz default now(),

    updated_at timestamptz default now(),

    constraint subscriptions_plan_check
        check (
            plan in (
                'free',
                'pro'
            )
        ),

    constraint subscriptions_status_check
        check (
            status in (
                'trial',
                'active',
                'expired',
                'cancelled'
            )
        )

);

alter table subscriptions enable row level security;

create policy "subscriptions_select"
on subscriptions
for select
using (auth.uid() = user_id);

create policy "subscriptions_insert"
on subscriptions
for insert
with check (auth.uid() = user_id);

create policy "subscriptions_update"
on subscriptions
for update
using (auth.uid() = user_id);

create policy "subscriptions_delete"
on subscriptions
for delete
using (auth.uid() = user_id);
-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as
$$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

create trigger profiles_updated_at
before update on profiles
for each row
execute function update_updated_at_column();

create trigger education_updated_at
before update on education
for each row
execute function update_updated_at_column();

create trigger experience_updated_at
before update on experience
for each row
execute function update_updated_at_column();

create trigger skills_updated_at
before update on skills
for each row
execute function update_updated_at_column();

create trigger projects_updated_at
before update on projects
for each row
execute function update_updated_at_column();

create trigger certificates_updated_at
before update on certificates
for each row
execute function update_updated_at_column();

create trigger languages_updated_at
before update on languages
for each row
execute function update_updated_at_column();

create trigger achievements_updated_at
before update on achievements
for each row
execute function update_updated_at_column();

create trigger social_links_updated_at
before update on social_links
for each row
execute function update_updated_at_column();

create trigger portfolio_settings_updated_at
before update on portfolio_settings
for each row
execute function update_updated_at_column();

create trigger subscriptions_updated_at
before update on subscriptions
for each row
execute function update_updated_at_column();

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists idx_profiles_user_id
on profiles(user_id);

create index if not exists idx_education_user_id
on education(user_id);

create index if not exists idx_experience_user_id
on experience(user_id);

create index if not exists idx_skills_user_id
on skills(user_id);

create index if not exists idx_projects_user_id
on projects(user_id);

create index if not exists idx_project_images_project_id
on project_images(project_id);

create index if not exists idx_certificates_user_id
on certificates(user_id);

create index if not exists idx_languages_user_id
on languages(user_id);

create index if not exists idx_achievements_user_id
on achievements(user_id);

create index if not exists idx_social_links_user_id
on social_links(user_id);

create index if not exists idx_portfolio_settings_user_id
on portfolio_settings(user_id);

create index if not exists idx_user_templates_user_id
on user_templates(user_id);

create index if not exists idx_subscriptions_user_id
on subscriptions(user_id);

-- =====================================================
-- END OF DATABASE V2
-- =====================================================