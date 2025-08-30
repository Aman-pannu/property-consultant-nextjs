import Image from 'next/image'

export default function Hero(){
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-white pointer-events-none"></div>
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">Find your next home with a trusted <span className="text-brand-700">Property Consultant</span>.</h1>
            <p className="mt-6 text-lg text-slate-600 max-w-prose">Personalised advice on buying, selling, and investing in Melbourne. Independent appraisals, off‑market access, and negotiation support that saves you time and money.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center rounded-xl bg-brand-600 px-5 py-3 text-white hover:bg-brand-700">Get a Free Appraisal</a>
              <a href="#listings" className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50">View Listings</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-slate-200 shadow-inner flex items-center justify-center">
              <Image alt="Property" src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop" width={1200} height={900} className="rounded-3xl object-cover h-full w-full" priority/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
