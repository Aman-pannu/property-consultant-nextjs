import { connectDb } from '@/lib/db'
import Lead from '@/models/Lead'

export async function PATCH(req, { params }){
  try{
    await connectDb()
    const body = await req.json()
    const update = {}
    if(body.stage) update.stage = body.stage
    if(body.tags) update.tags = body.tags
    if(body.notes) update.notes = body.notes
    if(body.followUpAt) update.followUpAt = new Date(body.followUpAt)
    const doc = await Lead.findByIdAndUpdate(params.id, update, { new: true })
    if(!doc) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json({ ok: true })
  }catch(e){
    console.error(e)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
