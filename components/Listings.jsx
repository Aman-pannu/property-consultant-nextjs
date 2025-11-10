import Image from 'next/image'
import { getListings } from '@/lib/cms'
import ListingDetailsModal from '@/components/ListingDetailsModal'

export default async function Listings(){
  const listings = await getListings({ limit: 6 })
  return (
    <section id="listings" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <p className="mt-3 text-slate-600">Hand‑picked properties available now. Enquire for private inspections.</p>
          </div>
          <a href="#contact" className="hidden md:inline-flex rounded-xl border border-slate-300 px-4 py-2 hover:bg-white">Request more</a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((i) => (
            <article key={i.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
              <div className="aspect-[4/3] relative bg-slate-200">
                <Image alt={i.title} src={i.image || 'https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1200&auto=format&fit=crop'} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{i.title}</h3>
                <p className="mt-1 text-slate-600">{i.meta}</p>
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                  {(i.badges || []).map((b) => (
                    <span key={b} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs">{b}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <ListingDetailsModal listing={i} />
                  {i.virtualTour && <a href={i.virtualTour} target="_blank" className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-50">Virtual Tour</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
