import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL) throw new Error('Please set SUPABASE_URL in your environment')
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('Please set SUPABASE_SERVICE_ROLE_KEY in your environment')

let cached = global._supabase_admin
if (!cached) cached = global._supabase_admin = { client: null }

export function getSupabaseClient() {
  if (cached.client) return cached.client
  cached.client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
  return cached.client
}

export function normalizeLeadRow(row) {
  if (!row) return null
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    message: row.message,
    stage: row.stage,
    tags: row.tags || [],
    notes: row.notes,
    followUpAt: row.follow_up_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}
