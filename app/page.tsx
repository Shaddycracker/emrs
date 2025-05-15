import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import NoticeSection from "@/components/notice-section"
import ImageCarousel from "@/components/image-carousel"
import InquiryAchievers from "@/components/inquiry-achievers"
import Footer from "@/components/footer"
import Faculties from "@/components/faculty-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ImageCarousel />
          <Hero />
        <NoticeSection />
          <Faculties/>
        <InquiryAchievers />
      </main>
      <Footer />
    </div>
  )
}
