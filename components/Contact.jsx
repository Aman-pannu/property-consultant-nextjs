'use client'
import { useState } from 'react'

export default function Contact(){
  const [status,setStatus] = useState('')
  const mapSrc = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || 'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Melbourne+Australia'
async function onSubmit(e){
    e.preventDefault()
    setStatus('Sending…')
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const payload = Object.fromEntries(form.entries())
    const res = await fetch('/api/lead', { method:'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if(res.ok){ 
      formEl?.reset();
      setStatus('Thanks! I will be in touch shortly.'); 
    }
    else { setStatus(data.error || 'Something went wrong. Please try again.') }
  }
  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 items-start">
        <div>
          <h2 className="text-3xl font-bold">Book a free consultation</h2>
          <p className="mt-3 text-slate-600">Fill out the form and I’ll get back to you within one business hour.</p>
          <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium" htmlFor="name">Full name</label>
              <input required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" id="name" name="name" type="text" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium" htmlFor="email">Email</label>
                <input required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" id="email" name="email" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="phone">Phone</label>
                <input className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" id="phone" name="phone" type="tel" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="service">Service</label>
              <select className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" id="service" name="service">
                <option>Buyer Advocacy</option>
                <option>Sales Advisory</option>
                <option>Investment Strategy</option>
                <option>Appraisal</option>
                <option>Property Management</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="message">Message</label>
              <textarea className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3" id="message" name="message" rows="4" placeholder="Tell me about your goals…"></textarea>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl bg-brand-600 px-5 py-3 text-white hover:bg-brand-700" type="submit">Send</button>
              <p className="text-sm text-slate-600" role="status" aria-live="polite">{status}</p>
            </div>
            <p className="text-xs text-slate-500">By submitting, you agree to our <a className="underline" href="#">privacy policy</a>.</p>
          </form>
        </div>
        <div>
          <div className="aspect-[4/3] w-full rounded-3xl bg-slate-200"></div>
          <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm">
            <iframe
              title="Office map"
              src={mapSrc}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
