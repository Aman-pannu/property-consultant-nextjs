import { getServices } from '@/lib/services'

export default async function Services(){
  const services = await getServices()
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-3 text-slate-600">End‑to‑end support for buyers, sellers, and investors.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(s => (
          <article key={s.id || s.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
