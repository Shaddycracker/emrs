//
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import NoticeSection from "@/components/notice-section"
import ImageCarousel from "@/components/image-carousel"
import InquiryAchievers from "@/components/inquiry-achievers"
import NoticeAchiver from "@/components/notice-achivers"
import Footer from "@/components/footer"
import Faculties from "@/components/faculty-section";
import {ThoughtMarquee} from "@/components/ThoughtMarquee";
import DataItems from "@/components/Data-Item";

export default function Home() {
   return (
    <div className="min-h-screen bg-background">
      <Navbar />
        <main>
            <ImageCarousel/>
  
                <ThoughtMarquee
                    text="The only way to do great work is to love what you do. - Steve Jobs"
                    direction="left"
                    className="bg-primary/10"
                />
                <Hero/>
                <NoticeAchiver/>
                <DataItems/>
                <Faculties/>
  
                <InquiryAchievers/>
  
        </main>
        <Footer/>
    </div>
  )
}
