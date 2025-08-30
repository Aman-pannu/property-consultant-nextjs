import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Metrics from '@/components/Metrics'
import Services from '@/components/Services'
import Listings from '@/components/Listings'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import Process from '@/components/Process'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Page(){
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <Listings />
        <Testimonials />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
