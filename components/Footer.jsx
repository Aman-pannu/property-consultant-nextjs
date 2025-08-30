'use client'
export default function Footer(){
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-brand-600"><path d="M12 3l9 8h-3v9H6v-9H3l9-8z"/></svg>
            Aman Realty
          </div>
          <p className="mt-3 text-slate-600">ABN 00 000 000 000</p>
          <p className="text-slate-600">123 Collins St, Melbourne VIC 3000</p>
        </div>
        <div>
          <h3 className="font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li><a className="hover:underline" href="#about">About</a></li>
            <li><a className="hover:underline" href="#services">Services</a></li>
            <li><a className="hover:underline" href="#contact">Contact</a></li>
            <li><a className="hover:underline" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Follow</h3>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li><a className="hover:underline" href="#">Instagram</a></li>
            <li><a className="hover:underline" href="#">Facebook</a></li>
            <li><a className="hover:underline" href="#">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Newsletter</h3>
          <form className="mt-3 flex gap-2" onSubmit={(e)=>{e.preventDefault(); alert('Subscribed!')}}>
            <label className="sr-only" htmlFor="newsletterEmail">Email</label>
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3" id="newsletterEmail" name="email" type="email" placeholder="you@example.com" />
            <button className="rounded-xl bg-slate-900 px-4 py-3 text-white" type="submit">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Aman Realty. All rights reserved.</div>
    </footer>
  )
}
