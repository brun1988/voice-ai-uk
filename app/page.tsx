import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen" style={{border: '5px solid red'}}>
      <div style={{background: 'yellow', padding: '10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>DEBUG: Navbar</div>
      <Navbar />
      <div style={{background: 'orange', padding: '10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>DEBUG: Hero</div>
      <Hero />
      <div style={{background: 'green', padding: '10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>DEBUG: Stats</div>
      <Stats />
      <div style={{background: 'blue', padding: '10px', textAlign: 'center', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>DEBUG: HowItWorks</div>
      <HowItWorks />
      <div style={{background: 'purple', padding: '10px', textAlign: 'center', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>DEBUG: Features</div>
      <Features />
      <div style={{background: 'red', padding: '10px', textAlign: 'center', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>DEBUG: Testimonials</div>
      <Testimonials />
      <div style={{background: 'cyan', padding: '10px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>DEBUG: Pricing</div>
      <Pricing />
      <div style={{background: 'magenta', padding: '10px', textAlign: 'center', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>DEBUG: CTA</div>
      <CTA />
      <div style={{background: 'gray', padding: '10px', textAlign: 'center', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>DEBUG: Footer</div>
      <Footer />
    </main>
  )
}
