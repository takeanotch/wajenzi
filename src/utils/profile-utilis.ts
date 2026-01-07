// lib/profile-utils.ts
import { createClient } from '@/lib/supabase/server'

export async function isProfileComplete(userId: string) {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', userId)
    .single()
  
  return !!profile?.full_name && !!profile?.phone
}

export async function getIncompleteFields(userId: string) {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone, avatar_url')
    .eq('id', userId)
    .single()
  
  const incompleteFields = []
  
  if (!profile?.full_name) incompleteFields.push('nom complet')
  if (!profile?.phone) incompleteFields.push('téléphone')
  if (!profile?.avatar_url || profile.avatar_url === '/avatars/default.png') {
    incompleteFields.push('photo de profil')
  }
  
  return incompleteFields
}