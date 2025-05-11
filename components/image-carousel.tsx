"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { getGalleryImages } from "@/src/firebase/firestore"

export default function ImageCarousel() {
  const [images, setImages] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // const galleryImages = await getGalleryImages(5) // Limit to 5 images for carousel
        // setImages(galleryImages)
        setImages([
          { id: 1, url: "https://www.emrssukma.in/wp-content/uploads/2021/11/building-front1.jpeg", caption: "School Building" },
          { id: 2, url: "https://www.emrssukma.in/wp-content/uploads/2025/04/a3-scaled.jpg", caption: "Sports Day" },
          { id: 3, url: "https://www.emrssukma.in/wp-content/uploads/2025/04/a6.jpg", caption: "Science Exhibition" },
        ])
      } catch (error) {
        console.error("Error fetching images:", error)
        // Fallback images if Firebase fetch fails
        setImages([
          { id: 1, url: "https://images.unsplash.com/photo-1641326201918-3cafc641038e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80", caption: "School Building" },
          { id: 2, url: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", caption: "Sports Day" },
          { id: 3, url: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg", caption: "Science Exhibition" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [images])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card className="w-full h-[400px] flex items-center justify-center">
          <div className="animate-pulse bg-muted w-full h-full"></div>
        </Card>
      </div>
    )
  }

  if (images.length === 0) {
    return null
  }

  return (
    <section className="w-full pb-8">
      {/*<h2 className="text-2xl font-bold mb-4">School Highlights</h2>*/}
      <div className="relative">
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative aspect-[16/9] md:aspect-[21/9]">
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={image.id} className="min-w-full">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption || `Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                      {/*<p>{image.caption}</p>*/}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
