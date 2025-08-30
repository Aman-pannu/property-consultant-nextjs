import { connectDb } from '@/lib/db'
import Lead from '@/models/Lead'

function toCsv(rows){
  if(!rows.length) return ''
  const headers = Object.keys(rows[0]).join(',')
  const vals = rows.map(r => Object.values(r).map(v => (typeof v === 'string' && v.includes(',') ? `"${v.replaceAll('"','""')}"` : (v ?? ''))).join(','))
  return [headers, ...vals].join('\n')
}

export async function GET(){
  await connectDb()
  const items = await Lead.find({}).sort({ createdAt: -1 }).lean()
  const rows = items.map(i => ({
    createdAt: i.createdAt?.toISOString() || '',
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
}
