"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { submitInquiry } from "@/firebase/firestore"
import { useEffect } from "react"
import { getTopAchievers } from "@/firebase/Achivers/Achivers"
import {Achiever} from "@/firebase/types/types";

export default function InquiryAchievers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const topAchievers = await getTopAchievers(3)
        setAchievers(topAchievers)
      } catch (error) {
        console.error("Error fetching achievers:", error)
        // Fallback achievers if Firebase fetch fails
        setAchievers([
          {
            id: "1",
            name: "Rahul Sharma",
            achievement: "CBSE Topper 2023",
            imageUrl: "/placeholder.svg?height=300&width=300",
            session: "2023",
            class:"",
            percentage:0
          },
          {
            id: "2",
            name: "Priya Singh",
            achievement: "International Science Olympiad Gold Medalist",
            imageUrl: "/placeholder.svg?height=300&width=300",
            session: "2023",
            class:"",
            percentage:50
          },
          {
            id: "3",
            name: "Amit Kumar",
            achievement: "National Sports Champion",
            imageUrl: "/placeholder.svg?height=300&width=300",
            session: "2022",
            class:"",
            percentage:30
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAchievers()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitInquiry(formData)
      toast({
        title: "Inquiry Submitted",
        description: "We'll get back to you soon!",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Inquiry Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Submit an Inquiry</h2>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message or inquiry"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Achievers Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Top Achievers</h2>
            <Button asChild variant="outline">
              <Link href="/achievers">View All</Link>
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="flex">
                    <div className="w-24 h-24 bg-muted rounded-l"></div>
                    <div className="p-4 flex-1">
                      <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              {achievers.map((achiever) => (
                <Link
                  href={`/achievers/${achiever.id}`}
                  key={Math.random()}
                  className="block transition-transform hover:scale-[1.01]"
                >
                  <Card className="overflow-hidden">
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <img
                          src={achiever.imageUrl || "/placeholder.svg?height=100&width=100"}
                          alt={achiever.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold">{achiever.name}</h3>
                        <p className="text-xs mt-2">Percentage: {achiever.percentage}</p>
                        <Badge onClick={()=>{}}> Visit </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
