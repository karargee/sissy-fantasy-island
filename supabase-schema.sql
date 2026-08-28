-- ============================================================
-- SISSY FANTASY ISLAND — Supabase Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- USERS
create table if not exists users (
  id text primary key,
  email text unique not null,
  password_hash text not null,
  sissy_name text not null,
  tier text not null default 'Free',
  member_since timestamptz not null default now(),
  bio text default '',
  last_seen timestamptz
);

-- CONTACT MESSAGES (includes dungeon bookings)
create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  name text,
  email text,
  subject text,
  message text,
  phone text,
  location text,
  pkg text,
  date text,
  notes text,
  read boolean default false,
  created_at timestamptz default now()
);

-- BTC PAYMENTS
create table if not exists btc_payments (
  id bigint generated always as identity primary key,
  email text,
  tier text not null,
  txid text,
  delivery text default 'email',
  status text default 'pending',
  created_at timestamptz default now()
);

-- GIFT CARD SUBMISSIONS
create table if not exists gift_submissions (
  id bigint generated always as identity primary key,
  tier text not null,
  price text,
  code text,
  has_image boolean default false,
  image_name text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- EMAIL SUBSCRIBERS
create table if not exists subscribers (
  id bigint generated always as identity primary key,
  email text unique not null,
  created_at timestamptz default now()
);

-- CHAT SESSIONS
create table if not exists chat_sessions (
  session_id text primary key,
  unread_admin int default 0,
  started_at timestamptz default now()
);

-- CHAT MESSAGES
create table if not exists chat_messages (
  id bigint generated always as identity primary key,
  session_id text references chat_sessions(session_id) on delete cascade,
  from_role text not null,
  text text not null,
  created_at timestamptz default now()
);

-- COMMUNITY POSTS
create table if not exists posts (
  id bigint generated always as identity primary key,
  user_id text references users(id) on delete cascade,
  content text not null,
  likes int default 0,
  created_at timestamptz default now()
);

-- POST LIKES
create table if not exists post_likes (
  user_id text references users(id) on delete cascade,
  post_id bigint references posts(id) on delete cascade,
  primary key (user_id, post_id)
);

-- COMMENTS
create table if not exists comments (
  id bigint generated always as identity primary key,
  post_id bigint references posts(id) on delete cascade,
  user_id text references users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- FOLLOWS
create table if not exists follows (
  follower_id text references users(id) on delete cascade,
  following_id text references users(id) on delete cascade,
  primary key (follower_id, following_id)
);

-- DIRECT MESSAGES
create table if not exists direct_messages (
  id bigint generated always as identity primary key,
  from_id text references users(id) on delete cascade,
  to_id text references users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- NOTIFICATIONS
create table if not exists notifications (
  id bigint generated always as identity primary key,
  user_id text references users(id) on delete cascade,
  type text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- SITE SETTINGS (admin-controlled content)
create table if not exists site_settings (
  key text primary key,
  value jsonb not null
);

-- CHATROOM MESSAGES (public community chat)
create table if not exists chatroom_messages (
  id bigint generated always as identity primary key,
  nickname text not null,
  text text not null,
  color text default '#f5a9b8',
  created_at timestamptz default now()
);

-- VOTES
create table if not exists votes (
  id bigint generated always as identity primary key,
  voter_ip text,
  contestant_id text not null,
  created_at timestamptz default now()
);

-- Helper function for incrementing chat unread count
create or replace function increment_unread(sid text)
returns void language sql as $$
  update chat_sessions set unread_admin = unread_admin + 1 where session_id = sid;
$$;

-- ============================================================
-- Row Level Security — disable for service role (server-side)
-- All access goes through your API routes using service role key
-- ============================================================
alter table users enable row level security;
alter table contact_messages enable row level security;
alter table btc_payments enable row level security;
alter table gift_submissions enable row level security;
alter table subscribers enable row level security;
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
alter table posts enable row level security;
alter table post_likes enable row level security;
alter table comments enable row level security;
alter table follows enable row level security;
alter table direct_messages enable row level security;
alter table notifications enable row level security;
alter table site_settings enable row level security;
alter table chatroom_messages enable row level security;
alter table votes enable row level security;

-- Service role bypasses RLS automatically — no policies needed for server-side
