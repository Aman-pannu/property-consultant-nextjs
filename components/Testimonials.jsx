export default function Testimonials(){
  const items = [
    { quote: '“Aman secured our dream home off‑market and saved us from a stressful auction. Professional and responsive.”', by: 'Priya & Harpreet, Point Cook' },
    { quote: '“Accurate appraisal and great strategy. We sold above reserve in 18 days.”', by: 'George, Glen Waverley' },
    { quote: '“Clear communication and data‑driven insights. Highly recommend.”', by: 'Mei, Doncaster' },
  ]
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-16">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold">What clients say</h2>
        <p className="mt-3 text-slate-600">Real reviews from happy buyers and sellers.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map(i => (
          <figure key={i.by} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <blockquote className="text-slate-700">{i.quote}</blockquote>
            <figcaption className="mt-3 text-sm text-slate-500">— {i.by}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
