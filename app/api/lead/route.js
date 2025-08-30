import { connectDb } from '@/lib/db'
import Lead from '@/models/Lead'
import { sendLeadEmail } from '@/lib/email'

function isEmail(s=''){ return /.+@.+\..+/.test(s) }
function isPhone(s=''){ return /[0-9+()\-\s]{6,}/.test(s) }
function notEmpty(s=''){ return String(s).trim().length > 0 }

export async function POST(req){
  try{
    const body = await req.json()
    const { name, email, phone, service, message } = body || {}
    if(!notEmpty(name)) return Response.json({ error: 'Name is required' }, { status: 400 })
    if(!isEmail(email)) return Response.json({ error: 'Valid email is required' }, { status: 400 })
    if(phone && !isPhone(phone)) return Response.json({ error: 'Invalid phone' }, { status: 400 })

    await connectDb()
    const lead = await Lead.create({ name, email, phone, service, message, stage: 'New' })

    // Email notify (optional)
    await sendLeadEmail(lead).catch(()=>{})

    return Response.json({ ok: true, id: lead._id })
  }catch(err){
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
