export default function Services(){
  const services = [
    { title: 'Buyer Advocacy', desc: 'Property search, inspections, due diligence, and auction bidding on your behalf.' },
    { title: 'Sales Advisory', desc: 'Pricing strategy, staging tips, agent selection, and negotiation coaching.' },
    { title: 'Investment Strategy', desc: 'Suburb analysis, rental yields, and long‑term growth projections tailored to you.' },
    { title: 'Appraisals', desc: 'Independent market appraisals with comparable sales and micro‑market insights.' },
    { title: 'Off‑Market Access', desc: 'Tap into a network of agents and private sellers to view properties before they list.' },
    { title: 'Property Management', desc: 'Tenant selection, inspections, and maintenance coordination.' }
  ]
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-3 text-slate-600">End‑to‑end support for buyers, sellers, and investors.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(s => (
          <article key={s.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
