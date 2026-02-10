import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function getUserGoldItems(userId: string) {
  const { data, error } = await supabase
    .from('gold_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createGoldItem(item: any) {
  const { data, error } = await supabase
    .from('gold_items')
    .insert([item])
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteGoldItem(itemId: string) {
  const { error } = await supabase
    .from('gold_items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
}
