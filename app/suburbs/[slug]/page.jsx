import { getListings, getSuburbs } from '@/lib/cms'
import Image from 'next/image'

export async function generateStaticParams(){
  const suburbs = await getSuburbs()
  return suburbs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }){
  const title = `Properties in ${params.slug} | @Reality`
  const description = `Explore current listings and market insights for ${params.slug}.`
  return { title, description }
}

export default async function SuburbPage({ params }){
  const listings = await getListings({ suburb: params.slug })
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Listings in {params.slug}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map(i => (
          <article key={i.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
            <div className="aspect-[4/3] relative bg-slate-200">
              <Image alt={i.title} src={i.image || 'https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1200&auto=format&fit=crop'} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{i.title}</h3>
              <p className="mt-1 text-slate-600">{i.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
