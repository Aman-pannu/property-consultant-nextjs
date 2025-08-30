import { getSuburbs } from '@/lib/cms'

export default async function sitemap(){
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const staticRoutes = ['', '/#services', '/#listings', '/#about', '/#contact'].map(p => ({
    url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8
  }))
  const suburbs = await getSuburbs()
  const suburbRoutes = suburbs.map(s => ({ url: `${base}/suburbs/${s.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 }))
  return [...staticRoutes, ...suburbRoutes]
}
