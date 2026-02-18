import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type Intent = 'search' | 'compare' | 'buy' | 'info' | 'chat';

export interface AIResponse {
  intent: Intent;
  thought: string;
  tool_calls?: {
    name: string;
    parameters: any;
  }[];
  response: string;
  confidence_score: number;
}

import { createClient } from '@/lib/supabase/server';

export async function orchestrate(userInput: string, history: any[] = []): Promise<AIResponse> {
  const start = Date.now();
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are the AI Orchestrator for LUXE, an AI-native e-commerce platform.
        You act as a decision engine that happens to sell products.

        Your goals:
        1. Understand user intent with high precision.
        2. Extract structured filters (price, durability, style).
        3. Decide if you need to call tools to fetch data.

        Available tools:
        - search_products(query: string, filters: object): Use this for any product discovery requests.
        - get_product_details(product_id: string): Use this for deep dives, pros/cons, and specific technical questions.
        - get_recommendations(context: string): Use this for personalized suggestions.
        - complete_purchase(items: array): Use this when a user confirms they want to buy specific items in the chat.

        Principles:
        - Prioritize low latency.
        - Enforce structured outputs.
        - Avoid hallucinations; if data isn't fetched, don't invent it.
        - When recommending products, always select ONE primary option and provide exactly TWO alternatives.
        - Explain tradeoffs for each recommendation.

        Output format:
        {
          "intent": "search" | "compare" | "buy" | "info" | "chat",
          "thought": "Your internal reasoning process",
          "tool_calls": [{"name": "tool_name", "parameters": {}}],
          "response": "Your grounding-ready response or clarifying question",
          "confidence_score": 0.0 to 1.0
        }`
      },
      ...history,
      { role: 'user', content: userInput }
    ],
    response_format: { type: 'json_object' }
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error('AI failed to produce content');
  }

  const result = JSON.parse(content) as AIResponse;
  const latency = Date.now() - start;

  // Observability: Log to Supabase async
  const supabase = await createClient();
  supabase.from('ai_events').insert({
    event_type: 'orchestration',
    input: userInput,
    output: result,
    latency_ms: latency,
    token_usage: completion.usage?.total_tokens,
    confidence_score: result.confidence_score
  }).then(({ error }) => {
    if (error) console.error('Failed to log AI event:', error);
  });

  return result;
}
