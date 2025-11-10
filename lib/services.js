import { getSupabaseClient } from '@/lib/supabase'

export async function getServices(){
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from('services').select('*').order('created_at')
  if(error){
    console.error('Failed to load services', error)
    return []
  }
  return (data || []).map(row => ({
    id: row.id,
    title: row.title,
    desc: row.description
  }))
}
