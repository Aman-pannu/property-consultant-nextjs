import { getSupabaseClient } from '@/lib/supabase'

export async function PATCH(req, { params }){
  try{
    const supabase = getSupabaseClient()
    const body = await req.json()
    const update = {}
    if(body.stage) update.stage = body.stage
    if(body.tags) update.tags = body.tags
    if(body.notes) update.notes = body.notes
    if(body.followUpAt) update.follow_up_at = new Date(body.followUpAt).toISOString()

    if(!Object.keys(update).length){
      return Response.json({ error: 'No fields to update' }, { status: 400 })
    }

    const { error, data } = await supabase.from('leads').update(update).eq('id', params.id).select('id').single()
    if(error){
      if(error.code === 'PGRST116'){
        return Response.json({ error: 'Not found' }, { status: 404 })
      }
      console.error(error)
      return Response.json({ error: 'Server error' }, { status: 500 })
    }
    if(!data) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json({ ok: true })
  }catch(e){
    console.error(e)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
