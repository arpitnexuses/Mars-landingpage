import Navbar from "@/components/navbar"
import HeroSection from '@/components/HeroSection'
import ImageCardSection from '@/components/ImageCardSection'
import ImageSection from '@/components/ImageSection'
import ConsultationBanner from '@/components/ConsultationBanner'
import ISOServicesSection from '@/components/ISOServicesSection'
import TalkToExpert from '@/components/TalkToExpert'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ImageSection />
      <ImageCardSection />
      <ConsultationBanner />
      <ISOServicesSection />
      <TalkToExpert />
      <Footer />
      {/* Other page content */}
    </main>
  )
}

