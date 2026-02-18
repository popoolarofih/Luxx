import { describe, it, expect, vi } from 'vitest';
import { orchestrate } from './orchestrator';

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockResolvedValue({ error: null })
  })
}));

// Mock Groq
vi.mock('groq-sdk', () => {
  return {
    default: class {
      chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{
              message: {
                content: JSON.stringify({
                  intent: 'search',
                  thought: 'User is looking for laptops',
                  tool_calls: [{ name: 'search_products', parameters: { query: 'durable laptop under $1500' } }],
                  response: 'I can help you find a durable laptop.',
                  confidence_score: 0.95
                })
              }
            }]
          })
        }
      }
    }
  };
});

describe('orchestrate', () => {
  it('should extract search intent correctly', async () => {
    const result = await orchestrate('I want a durable laptop under $1500');
    expect(result.intent).toBe('search');
    expect(result.tool_calls?.[0].name).toBe('search_products');
    expect(result.tool_calls?.[0].parameters.query).toContain('laptop');
  });
});
