import { getSupabaseClient } from '@/lib/supabase'

function mapListing(row = {}){
  return {
    id: row.id,
    title: row.title,
    meta: row.meta,
    image: row.image,
    badges: row.badges || [],
    suburb: row.suburb,
    slug: row.slug,
    virtualTour: row.virtual_tour || row.virtualTour || ''
  }
}

export async function getListings({ limit = 6, suburb } = {}){
  const supabase = getSupabaseClient()
  let query = supabase.from('listings').select('*').order('created_at', { ascending: false })
  if(suburb) query = query.ilike('suburb', `%${suburb}%`)
  if(limit) query = query.limit(limit)
  const { data, error } = await query
  if(error){
    console.error('Supabase listings fetch failed', error)
    return []
  }
  return (data || []).map(mapListing)
}
