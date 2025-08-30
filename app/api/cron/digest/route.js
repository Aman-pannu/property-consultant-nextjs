import { connectDb } from '@/lib/db'
import Lead from '@/models/Lead'
import { sendMail } from '@/lib/email'

export async function GET(){
  try{
    await connectDb()
    const since = new Date(Date.now() - 7*24*60*60*1000)
    const items = await Lead.find({ createdAt: { $gte: since }}).sort({ createdAt: -1 }).lean()
    const lines = items.map(i => `- ${i.createdAt.toISOString()} :: ${i.name} <${i.email}> :: ${i.service || '-'} :: ${i.stage || 'New'}`)
    const body = `Weekly Lead Digest\n\n${lines.join('\n') || 'No new leads this week.'}`
    await sendMail({ subject:'Weekly Lead Digest', text: body })
    return Response.json({ ok: true, sent: items.length })
  }catch(e){
    console.error(e)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
