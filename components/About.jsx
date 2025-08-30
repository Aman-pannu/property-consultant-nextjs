export default function About(){
  return (
    <section id="about" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl font-bold">About Aman</h2>
          <p className="mt-3 text-slate-600">With a decade of experience in Melbourne’s property market, I combine negotiation expertise with suburb‑level analytics to help clients buy and sell with confidence. I’m independent—my only incentive is your result.</p>
          <ul className="mt-6 space-y-2 text-slate-700 list-disc list-inside">
            <li>Licensed Estate Agent (VIC)</li>
            <li>Member, Real Estate Institute of Victoria (REIV)</li>
            <li>100+ off‑market opportunities sourced yearly</li>
          </ul>
        </div>
        <div className="aspect-square rounded-3xl bg-slate-200 shadow-inner"></div>
      </div>
    </section>
  )
}
