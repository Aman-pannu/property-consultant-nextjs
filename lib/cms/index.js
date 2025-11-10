import fs from 'fs/promises'

export async function getListings({ limit = 6, suburb } = {}){
  const provider = process.env.CMS_PROVIDER || 'LOCAL'
  if(provider === 'AIRTABLE') return (await import('./airtable.js')).then(m => m.getListings({ limit, suburb }))
  if(provider === 'NOTION')  return (await import('./notion.js')).then(m => m.getListings({ limit, suburb }))
  if(provider === 'SANITY')  return (await import('./sanity.js')).then(m => m.getListings({ limit, suburb }))
  if(provider === 'SUPABASE') return (await import('./supabase.js')).then(m => m.getListings({ limit, suburb }))
  // LOCAL JSON
  const raw = await fs.readFile(process.cwd() + '/content/listings.json','utf-8')
  let items = JSON.parse(raw)
  if(suburb) items = items.filter(i => (i.suburb || '').toLowerCase().includes(suburb.toLowerCase()))
  if(limit) items = items.slice(0, limit)
  return items
}

export async function getSuburbs(){
  try{
    const raw = await fs.readFile(process.cwd() + '/content/suburbs.json','utf-8')
    return JSON.parse(raw)
  }catch{
    return []
  }
}
