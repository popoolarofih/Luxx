# LUXE: AI-Native Decision Engine

LUXE is a production-grade e-commerce platform designed as an AI decision engine that happens to sell products. It prioritizes low-latency intelligent UX over traditional shopping patterns.

## Tech Stack
- **Frontend**: Next.js 15+, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Postgres, Auth, Storage, Realtime)
- **AI**: Groq (Llama 3.3), Transformers.js (Embeddings)
- **Vector DB**: pgvector
- **Cache**: Redis (ioredis)

## Key Features
- **Conversational Search**: Intent-based product retrieval.
- **AI Decision Engine**: Explains tradeoffs and recommends specific options.
- **Grounded Responses**: Prevents hallucinations by enforcing structured data retrieval.
- **Low Latency**: <300ms search and <2s AI response targets.

## Getting Started
1. Clone the repo.
2. `npm install`
3. Configure `.env.local` with Supabase and Groq keys.
4. `npm run dev`

## Documentation
See [ARCHITECTURE.md](./ARCHITECTURE.md) for deep dives into the AI pipeline, scaling, and failure modes.
