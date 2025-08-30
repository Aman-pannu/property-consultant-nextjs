import { connectDb } from '@/lib/db'
import Lead from '@/models/Lead'

export async function GET(req){
  await connectDb()
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const stage = searchParams.get('stage') || ''
  const filter = {}
  if(stage) filter.stage = stage
  if(q){
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } },
    ]
  }
  const items = await Lead.find(filter).sort({ createdAt: -1 }).lean()
  return Response.json({ items })
}
