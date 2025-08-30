'use client'
import { useState } from 'react'

export default function Navbar(){
  const [open,setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 font-bold text-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-brand-600"><path d="M12 3l9 8h-3v9H6v-9H3l9-8z"/></svg>
            Aman Realty
          </a>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 font-medium">
            <a className="hover:text-brand-700" href="#services">Services</a>
            <a className="hover:text-brand-700" href="#listings">Listings</a>
            <a className="hover:text-brand-700" href="#about">About</a>
            <a className="hover:text-brand-700" href="#testimonials">Testimonials</a>
            <a className="hover:text-brand-700" href="#contact">Contact</a>
            <a className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700" href="#contact">Book a Call</a>
          </nav>
          <button className="md:hidden p-2 rounded-lg border border-slate-300" onClick={()=>setOpen(v=>!v)}>Menu</button>
        </div>
        {open && (
          <ul className="md:hidden pb-4 flex flex-col gap-4">
            <li><a className="block py-2" href="#services">Services</a></li>
            <li><a className="block py-2" href="#listings">Listings</a></li>
            <li><a className="block py-2" href="#about">About</a></li>
            <li><a className="block py-2" href="#testimonials">Testimonials</a></li>
            <li><a className="block py-2" href="#contact">Contact</a></li>
          </ul>
        )}
      </div>
    </header>
  )
}
