"use client"
export const dynamic = "force-dynamic"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getAllAchievers } from "@/firebase/Achivers/Achivers"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default async function AchieversPage() {
  const achievers = await getAllAchievers()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">Our Achievers</h1>
        <Separator className="mb-8" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievers.map((achiever) => (
            <Card key={achiever.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={achiever.imageUrl || "/placeholder.svg?height=300&width=300"}
                  alt={achiever.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-3">
                <CardTitle>{achiever.name}</CardTitle>
                <CardDescription>{achiever.achievement}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>{achiever.percentage}%</p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <p className="text-xs text-muted-foreground">Year: {achiever.session}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
