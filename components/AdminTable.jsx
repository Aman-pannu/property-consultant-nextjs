'use client'
import { useEffect, useMemo, useState } from 'react'

export default function AdminTable(){
  const [data,setData] = useState([])
  const [q,setQ] = useState('')
  const [stage,setStage] = useState('')
  const [loading,setLoading] = useState(false)

  async function load(){
    setLoading(true)
    const params = new URLSearchParams()
    if(q) params.set('q', q)
    if(stage) params.set('stage', stage)
    const res = await fetch('/api/leads?'+params.toString())
    const json = await res.json()
    setData(json.items || [])
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  async function updateStage(id, newStage){
    await fetch('/api/leads/'+id, { method:'PATCH', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ stage: newStage }) })
    load()
  }

  function exportCSV(){
    window.location.href = '/api/leads/export'
  }

  const stages = ['New','Qualified','In Progress','Won','Lost']

  const filtered = useMemo(()=>data, [data])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Leads</h1>
      <div className="flex gap-3 items-end mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium">Search</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="name, email, phone" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Stage</label>
          <select value={stage} onChange={e=>setStage(e.target.value)} className="mt-1 rounded-xl border border-slate-300 px-3 py-2">
            <option value="">All</option>
            {stages.map(s=>(<option key={s}>{s}</option>))}
          </select>
        </div>
        <button onClick={load} className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Apply</button>
        <button onClick={exportCSV} className="rounded-xl border border-slate-300 px-4 py-2">Export CSV</button>
      </div>

      {loading ? <p>Loading…</p> : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3">Created</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Service</th>
                <th className="text-left p-3">Stage</th>
                <th className="text-left p-3">Tags</th>
                <th className="text-left p-3">Message</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l._id} className="border-t border-slate-100">
                  <td className="p-3 whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="p-3">{l.name}</td>
                  <td className="p-3">{l.email}</td>
                  <td className="p-3">{l.phone}</td>
                  <td className="p-3">{l.service}</td>
                  <td className="p-3">
                    <select value={l.stage || 'New'} onChange={(e)=>updateStage(l._id, e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1">
                      {stages.map(s=>(<option key={s}>{s}</option>))}
                    </select>
                  </td>
                  <td className="p-3">{(l.tags||[]).join(', ')}</td>
                  <td className="p-3 max-w-[280px] truncate">{l.message}</td>
                  <td className="p-3">
                    <button onClick={()=>updateStage(l._id, 'Won')} className="text-green-700 hover:underline mr-2">Mark Won</button>
                    <button onClick={()=>updateStage(l._id, 'Lost')} className="text-red-700 hover:underline">Mark Lost</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
