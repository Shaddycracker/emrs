"use client"

import type React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { submitInquiry } from "@/firebase/Inquiry/Inquiry"
import { Timestamp } from "firebase/firestore"
import { Inquiry } from "@/firebase/types/types"
import Achievers from "@/components/Achivers-section" // Import the new component

export default function InquiryAchievers() {
  const [formData, setFormData] = useState<Inquiry>({
    id: "",
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    status: "pending",
    submittedAt: Timestamp.now(),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

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
        id: "",
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
        status: "pending",
        submittedAt: Timestamp.now(),
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
                    <Label htmlFor="mobile">Phone Number</Label>
                    <Input
                        id="mobile"
                        name="mobile"
                        placeholder="Enter your mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject </Label>
                    <Input
                        id="subject"
                        name="subject"
                        placeholder="Enter your subject or inquiry"
                        value={formData.subject}
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
        </div>
      </section>
  )
}
