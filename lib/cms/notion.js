export async function getListings({ limit = 6, suburb } = {}){
  const token = process.env.NOTION_TOKEN
  const db = process.env.NOTION_DB_ID
  if(!token || !db) return []
  const body = {
    page_size: limit,
    filter: suburb ? { property: 'suburb', rich_text: { contains: suburb } } : undefined
  }
  const res = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
    method:'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
  const json = await res.json()
  const items = (json.results || []).map(p => ({
    id: p.id,
    title: p.properties?.title?.title?.[0]?.plain_text || 'Untitled',
    meta: p.properties?.meta?.rich_text?.[0]?.plain_text || '',
    image: '', // add a cover mapping if your DB has it
    badges: [],
    suburb: p.properties?.suburb?.rich_text?.[0]?.plain_text || ''
  }))
  return items
}
