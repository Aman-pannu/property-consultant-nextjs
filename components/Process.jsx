export default function Process(){
  const steps = [
    { t: '1) Discovery', d: '15‑minute clarity call to map your goals and timeline.' },
    { t: '2) Strategy', d: 'Suburb shortlist, budget, and negotiation plan tailored to you.' },
    { t: '3) Execution', d: 'Inspections, offers/auction, contracts, and settlement support.' },
  ]
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-3xl font-bold">How it works</h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map(s => (
          <li key={s.t} className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <h3 className="font-semibold">{s.t}</h3>
            <p className="mt-2 text-slate-600">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
