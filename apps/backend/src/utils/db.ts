import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export interface GoldItem {
  id: string;
  user_id: string;
  item_name: string;
  weight_grams: number;
  purity: string;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  image_url?: string;
}

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  full_name?: string;
  kyc_verified: boolean;
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (error) return null;
  return data;
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getGoldItems(userId: string): Promise<GoldItem[]> {
  const { data, error } = await supabase
    .from('gold_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createGoldItem(item: Omit<GoldItem, 'id'>): Promise<GoldItem> {
  const { data, error } = await supabase
    .from('gold_items')
    .insert([item])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGoldItem(
  id: string,
  updates: Partial<GoldItem>
): Promise<GoldItem> {
  const { data, error } = await supabase
    .from('gold_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGoldItem(id: string): Promise<void> {
  const { error } = await supabase
    .from('gold_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function addAuditLog(
  userId: string,
  action: string,
  resource: string,
  resourceId?: string,
  changes?: any
): Promise<void> {
  const { error } = await supabase
    .from('audit_logs')
    .insert([
      {
        user_id: userId,
        action,
        resource,
        resource_id: resourceId,
        changes,
      },
    ]);

  if (error) console.error('Audit log error:', error);
}
