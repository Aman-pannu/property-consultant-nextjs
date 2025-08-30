export default function Metrics(){
  const items = [
    { label: 'Properties sold', value: '180+' },
    { label: 'Avg. days on market', value: '21' },
    { label: 'Client rating', value: '4.9/5' },
  ]
  return (
    <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mx-auto max-w-7xl px-4">
      {items.map(i => (
        <div key={i.label} className="rounded-2xl bg-white shadow p-4 border border-slate-200">
          <dt className="text-sm text-slate-500">{i.label}</dt>
          <dd className="text-2xl font-bold">{i.value}</dd>
        </div>
      ))}
    </dl>
  )
}
