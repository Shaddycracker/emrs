"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { getRecentNotices } from "@/firebase/Notices/Notices"
import {Notice} from "@/firebase/types/types"
import {Timestamp} from "firebase/firestore";

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const recentNotices = await getRecentNotices(3) // Limit to 3 recent notices
        setNotices(recentNotices)
      } catch (error) {
        console.error("Error fetching notices:", error)
        // Fallback notices if Firebase fetch fails
        setNotices([
          {
            id: "1",
            title: "Annual Sports Day",
            content: "Annual Sports Day will be held on 15th May 2023. All students are requested to participate.",
            date:Timestamp.now(),
            postedBy: "Principal",
          },
          {
            id: "2",
            title: "Parent-Teacher Meeting",
            content: "Parent-Teacher Meeting will be held on 20th May 2023. All parents are requested to attend.",
            date: Timestamp.now(),
            postedBy: "Admin Office",
          },
          {
            id: "3",
            title: "Summer Vacation",
            content: "Summer vacation will start from 1st June 2023 and school will reopen on 1st July 2023.",
            date: Timestamp.now(),
            postedBy: "Principal",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Latest Notices</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Notices</h2>
        <Button asChild variant="outline">
          <Link href="/notices">View All</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {notices.map((notice) => (
          <Link href={`/notices/${notice.id}`} key={notice.id} className="transition-transform hover:scale-[1.01]">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle>{notice.title}</CardTitle>
                <CardDescription className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {notice.date.toDate().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="line-clamp-3">{notice.content}</p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <p className="text-xs text-muted-foreground">Posted by: {notice.postedBy}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
