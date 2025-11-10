'use client'
import { useState } from 'react'
import Image from 'next/image'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1200&auto=format&fit=crop'

export default function ListingDetailsModal({ listing }){
  const [open, setOpen] = useState(false)

  if(!listing) return null
  const { title, meta, image } = listing

  return (
    <>
      <button
        onClick={()=>setOpen(true)}
        className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
      >
        Details
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="relative h-56 w-full bg-slate-100">
              <Image
                src={image || FALLBACK_IMAGE}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-slate-600">{meta || 'Details coming soon.'}</p>
              <div className="mt-6 text-right">
                <button
                  onClick={()=>setOpen(false)}
                  className="rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
