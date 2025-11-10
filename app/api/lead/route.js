import { getSupabaseClient, normalizeLeadRow } from '@/lib/supabase'
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

    const supabase = getSupabaseClient()
    const { data: existingRows, error: fetchError } = await supabase.from('leads').select('*').eq('email', email).limit(1)
    if(fetchError){
      console.error(fetchError)
      return Response.json({ error: 'Failed to check existing leads' }, { status: 500 })
    }
    const existing = existingRows?.[0]

    let lead
    let operation = 'created'
    if(existing){
      const update = { name, phone, service, message }
      const { data, error } = await supabase.from('leads').update(update).eq('id', existing.id).select().single()
      if(error){
        console.error(error)
        return Response.json({ error: 'Failed to update lead' }, { status: 500 })
      }
      lead = normalizeLeadRow(data)
      operation = 'updated'
    }else{
      const payload = { name, email, phone, service, message, stage: 'New' }
      const { data, error } = await supabase.from('leads').insert([payload]).select().single()
      if(error){
        console.error(error)
        return Response.json({ error: 'Failed to save lead' }, { status: 500 })
      }
      lead = normalizeLeadRow(data)
    }

    // Email notify (optional)
    await sendLeadEmail(lead).catch(()=>{})

    return Response.json({ ok: true, id: lead._id, operation })
  }catch(err){
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
