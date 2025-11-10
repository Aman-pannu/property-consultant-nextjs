import { getSupabaseClient, normalizeLeadRow } from '@/lib/supabase'
import { sendMail } from '@/lib/email'

export async function GET(){
  try{
    const supabase = getSupabaseClient()
    const since = new Date(Date.now() - 7*24*60*60*1000)
    const { data, error } = await supabase.from('leads').select('*').gte('created_at', since.toISOString()).order('created_at', { ascending: false })
    if(error){
      console.error(error)
      return Response.json({ error: 'Server error' }, { status: 500 })
    }
    const items = (data || []).map(normalizeLeadRow)
    const lines = items.map(i => `- ${new Date(i.createdAt).toISOString()} :: ${i.name} <${i.email}> :: ${i.service || '-'} :: ${i.stage || 'New'}`)
    const body = `Weekly Lead Digest\n\n${lines.join('\n') || 'No new leads this week.'}`
    const emailSent = await sendMail({ subject:'Weekly Lead Digest', text: body })
    return Response.json({ ok: true, sent: items.length, emailSent })
  }catch(e){
    console.error(e)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
