import { getSupabaseClient, normalizeLeadRow } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req){
  try{
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q')?.trim() || ''
    const stage = searchParams.get('stage')?.trim() || ''

    let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
    if(stage) query = query.eq('stage', stage)
    if(q){
      const safe = q.replace(/[,]/g, ' ')
      const term = `*${safe}*`
      query = query.or(`name.ilike.${term},email.ilike.${term},phone.ilike.${term}`)
    }

    const { data, error } = await query
    if(error){
      console.error(error)
      return Response.json({ error: 'Server error' }, { status: 500 })
    }

    const items = (data || []).map(normalizeLeadRow)
    return Response.json({ items })
  }catch(err){
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
