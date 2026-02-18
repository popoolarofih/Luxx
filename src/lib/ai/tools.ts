import { createClient } from '@/lib/supabase/server';
import { getEmbedding } from './embeddings';
import redis from '@/lib/redis';

export async function searchProducts(query: string, filters: any = {}) {
  const cacheKey = `search:${query}:${JSON.stringify(filters)}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Redis error:', e);
  }

  const supabase = await createClient();
  const embedding = await getEmbedding(query);

  const { data, error } = await supabase.rpc('hybrid_search', {
    query_text: query,
    query_embedding: embedding,
    match_threshold: 0.5,
    match_count: 10,
    category_filter: filters.category || null
  });

  if (error) {
    console.error('Search error:', error);
    // Fallback to simple text search if RPC fails (e.g. extension not enabled)
    const { data: fallbackData } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10);
    return fallbackData;
  }

  if (data) {
    try {
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour
    } catch (e) {
      console.warn('Redis set error:', e);
    }
  }

  return data;
}

export async function getProductDetails(productId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) throw error;
  return data;
}

export async function getRecommendations(context: string) {
  // Use semantic search as a base for recommendations
  return searchProducts(context);
}

export async function completePurchase(items: any[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Authentication required');

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      status: 'completed'
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.price
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) throw itemsError;

  return { success: true, order_id: order.id };
}
