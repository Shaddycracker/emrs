"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signOut, getAuth } from "firebase/auth"
import { toast } from "@/hooks/use-toast"
import AdminNotices from "./admin-notices"
import AdminAchievers from "./admin-achievers"
import AdminGallery from "./admin-gallery"
import AdminInquiries from "./admin-inquiries"
import AdminSyllabus from "./admin-syllabus"
import AdminResults from "./admin-results"
import AdminSessions from "./admin-sessions"
import AdminTC from "./admin-tc"
import AdminStaff from "./admin-staff"

export default function AdminDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("notices")
  const auth = getAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Sign Out Failed",
        description: "An error occurred while signing out",
        variant: "destructive",
      })
    }
  }

  return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <p className="text-sm text-muted-foreground">
                Logged in as: <span className="font-medium">{user.email}</span>
              </p>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-6 px-4">
          <Tabs defaultValue="notices" value={activeTab} onValueChange={setActiveTab} className="space-y-4">

            {/* Tabs List */}
            <div className="overflow-x-auto">
              <TabsList className="flex w-max md:grid md:grid-cols-9 gap-2 min-w-full">
                <TabsTrigger value="notices">Notices</TabsTrigger>
                <TabsTrigger value="achievers">Achievers</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="tc">TC</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Contents */}
            <TabsContent value="notices" className="space-y-4">
              <AdminNotices />
            </TabsContent>
            <TabsContent value="achievers" className="space-y-4">
              <AdminAchievers />
            </TabsContent>
            <TabsContent value="gallery" className="space-y-4">
              <AdminGallery />
            </TabsContent>
            <TabsContent value="inquiries" className="space-y-4">
              <AdminInquiries />
            </TabsContent>
            <TabsContent value="syllabus" className="space-y-4">
              <AdminSyllabus />
            </TabsContent>
            <TabsContent value="results" className="space-y-4">
              <AdminResults />
            </TabsContent>
            <TabsContent value="sessions" className="space-y-4">
              <AdminSessions />
            </TabsContent>
            <TabsContent value="tc" className="space-y-4">
              <AdminTC />
            </TabsContent>
            <TabsContent value="staff" className="space-y-4">
              <AdminStaff />
            </TabsContent>
          </Tabs>
        </main>
      </div>
  )
}
