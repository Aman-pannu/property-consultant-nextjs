import { getSupabaseClient, normalizeLeadRow } from '@/lib/supabase'

function toCsv(rows){
  if(!rows.length) return ''
  const headers = Object.keys(rows[0]).join(',')
  const vals = rows.map(r => Object.values(r).map(v => (typeof v === 'string' && v.includes(',') ? `"${v.replaceAll('"','""')}"` : (v ?? ''))).join(','))
  return [headers, ...vals].join('\n')
}

export async function GET(){
  try{
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    if(error){
      console.error(error)
      return Response.json({ error: 'Server error' }, { status: 500 })
    }
    const rows = (data || []).map(normalizeLeadRow).map(i => ({
      createdAt: i.createdAt || '',
      name: i.name || '',
      email: i.email || '',
      phone: i.phone || '',
      service: i.service || '',
      stage: i.stage || '',
      tags: (i.tags||[]).join('|'),
      message: i.message || ''
    }))
    const csv = toCsv(rows)
    return new Response(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="leads.csv"' } })
  }catch(err){
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
