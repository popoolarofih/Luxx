'use server'

import { orchestrate } from '@/lib/ai/orchestrator';
import { searchProducts, getProductDetails, completePurchase } from '@/lib/ai/tools';
import { rateLimit } from '@/lib/redis/rate-limit';

export async function processChat(userInput: string, history: any[]) {
  // Rate limiting (max 20 requests per minute)
  const { success } = await rateLimit('global_chat_limit', 20, 60);
  if (!success) {
    return {
      intent: 'chat' as const,
      thought: 'Rate limited',
      response: "Whoa, you're sending requests a bit too fast! Please wait a moment.",
      confidence_score: 0,
      toolResults: []
    };
  }

  try {
    const aiResult = await orchestrate(userInput, history);

    let toolResults = [];
    if (aiResult.tool_calls && aiResult.tool_calls.length > 0) {
      for (const call of aiResult.tool_calls) {
        if (call.name === 'search_products') {
          const results = await searchProducts(call.parameters.query, call.parameters.filters);
          toolResults.push({ tool: 'search_products', results });
        } else if (call.name === 'get_product_details') {
          const details = await getProductDetails(call.parameters.product_id);
          toolResults.push({ tool: 'get_product_details', details });
        } else if (call.name === 'complete_purchase') {
          const result = await completePurchase(call.parameters.items);
          toolResults.push({ tool: 'complete_purchase', result });
        }
      }
    }

    return {
      ...aiResult,
      toolResults
    };
  } catch (error) {
    console.error('AI Orchestration error:', error);
    return {
      intent: 'chat' as const,
      thought: 'Error occurred',
      response: "I'm sorry, I'm having trouble processing that right now. Could you try again?",
      confidence_score: 0,
      toolResults: []
    };
  }
}
