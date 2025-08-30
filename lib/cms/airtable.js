export async function getListings({ limit = 6, suburb } = {}){
  const key = process.env.AIRTABLE_API_KEY
  const base = process.env.AIRTABLE_BASE_ID
  const table = process.env.AIRTABLE_TABLE_NAME || 'Listings'
  if(!key || !base) return []
  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?maxRecords=${limit}&view=Grid%20view`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` }, cache: 'no-store' })
  const json = await res.json()
  let items = (json.records || []).map(r => ({
    id: r.id,
    title: r.fields.title || 'Untitled',
    meta: r.fields.meta || '',
    image: r.fields.image?.[0]?.url || '',
    badges: r.fields.badges || [],
    suburb: r.fields.suburb || ''
  }))
  if(suburb) items = items.filter(i => (i.suburb||'').toLowerCase().includes(suburb.toLowerCase()))
  return items
}
