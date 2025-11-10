import fs from 'fs/promises'

export async function getListings({ limit = 6, suburb } = {}){
  const provider = process.env.CMS_PROVIDER || 'LOCAL'
  if(provider === 'AIRTABLE'){
    const { getListings } = await import('./airtable.js')
    return getListings({ limit, suburb })
  }
  if(provider === 'NOTION'){
    const { getListings } = await import('./notion.js')
    return getListings({ limit, suburb })
  }
  if(provider === 'SANITY'){
    const { getListings } = await import('./sanity.js')
    return getListings({ limit, suburb })
  }
  if(provider === 'SUPABASE'){
    const { getListings } = await import('./supabase.js')
    return getListings({ limit, suburb })
  }
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
