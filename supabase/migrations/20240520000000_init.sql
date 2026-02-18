-- Enable pgvector
-- Enable extensions
create extension if not exists vector;
create extension if not exists pg_trgm;

-- Products table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(12,2) not null,
  category text,
  inventory_count int default 0,
  image_url text,
  metadata jsonb default '{}'::jsonb, -- For durability insight, value score, pros/cons
  created_at timestamp with time zone default now()
);

-- Product Embeddings
create table product_embeddings (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  embedding vector(384),
  content text, -- The text that was embedded
  created_at timestamp with time zone default now()
);

-- Profiles (Users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  preferences jsonb default '{}'::jsonb, -- AI styling preferences, sizing
  created_at timestamp with time zone default now()
);

-- Conversations
create table conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text,
  created_at timestamp with time zone default now()
);

-- Messages
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender text check (sender in ('user', 'assistant')),
  content text not null,
  metadata jsonb default '{}'::jsonb, -- To store structured filters extracted, or tool calls
  created_at timestamp with time zone default now()
);

-- Orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  status text default 'pending',
  total_amount decimal(12,2) not null,
  created_at timestamp with time zone default now()
);

-- Order Items
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  price_at_purchase decimal(12,2) not null
);

-- AI Events (Observability)
create table ai_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid, -- link to conversation or anonymous session
  event_type text not null, -- 'search', 'recommendation', 'intent_extraction'
  input text,
  output jsonb,
  latency_ms int,
  token_usage int,
  confidence_score float,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table products enable row level security;
alter table product_embeddings enable row level security;
alter table profiles enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table ai_events enable row level security;

-- RLS Policies
create policy "Public products are viewable by everyone" on products for select using (true);
create policy "Users can view their own profiles" on profiles for select using (auth.uid() = id);
create policy "Users can view their own conversations" on conversations for select using (auth.uid() = user_id);
create policy "Users can view messages in their conversations" on messages for select
  using (exists (select 1 from conversations where id = messages.conversation_id and user_id = auth.uid()));
create policy "Users can view their own orders" on orders for select using (auth.uid() = user_id);

-- Vector search function
create or replace function hybrid_search(
  query_text text,
  query_embedding vector(384),
  match_threshold float,
  match_count int,
  category_filter text default null
)
returns table (
  id uuid,
  name text,
  description text,
  price decimal(12,2),
  image_url text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    p.id,
    p.name,
    p.description,
    p.price,
    p.image_url,
    1 - (pe.embedding <=> query_embedding) as similarity
  from products p
  join product_embeddings pe on p.id = pe.product_id
  where (1 - (pe.embedding <=> query_embedding) > match_threshold)
    and (category_filter is null or p.category = category_filter)
    and (query_text is null or p.name % query_text or p.description % query_text)
  order by similarity desc
  limit match_count;
end;
$$;
