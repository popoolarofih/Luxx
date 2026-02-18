import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { BentoGrid } from '@/components/BentoGrid'
import { CuratedCollection } from '@/components/CuratedCollection'

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <CuratedCollection />
      </main>
      <Footer />
    </div>
  )
}
