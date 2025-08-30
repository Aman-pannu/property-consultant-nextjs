export async function getListings({ limit = 6, suburb } = {}){
  const pid = process.env.SANITY_PROJECT_ID
  const ds  = process.env.SANITY_DATASET || 'production'
  if(!pid) return []
  const query = encodeURIComponent(`*[_type == "listing"${suburb?` && lower(suburb) match "${suburb.toLowerCase()}"`:''}] | order(_createdAt desc)[0...${limit}] { _id, title, meta, "image": image.asset->url, badges, suburb }`)
  const url = `https://${pid}.api.sanity.io/v2021-10-21/data/query/${ds}?query=${query}`
  const res = await fetch(url, { cache: 'no-store', headers: { Authorization: process.env.SANITY_READ_TOKEN ? `Bearer ${process.env.SANITY_READ_TOKEN}` : undefined }})
  const json = await res.json()
  return (json.result || []).map(x => ({
    id: x._id, title: x.title, meta: x.meta, image: x.image, badges: x.badges, suburb: x.suburb
  }))
}
