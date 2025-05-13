"use client"

import type React from "react"
import {Timestamp} from 'firebase/firestore'
import {Notice} from '@/src/firebase/types/types'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { getAllNotices, addNotice, updateNotice, deleteNotice } from "@/src/firebase/Notices/Notices"
import { Pencil, Trash2, Plus } from "lucide-react"

export default function AdminNotices() {
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentNotice, setCurrentNotice] = useState<Notice|null>(null)
  const [formData, setFormData] = useState<Notice>({
    id:"",
    title: "",
    content: "",
    postedBy: "",
    date:Timestamp.now()

  })

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    setLoading(true)
    try {
      const allNotices = await getAllNotices()
      setNotices(allNotices)
    } catch (error) {
      console.error("Error fetching notices:", error)
      toast({
        title: "Error",
        description: "Failed to load notices",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddNotice = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      await addNotice({
        ...formData,
        id:"1313131",
        date: Timestamp.now()
      })
      toast({
        title: "Success",
        description: "Notice added successfully",
      })
      setIsAddDialogOpen(false)
      setFormData({
        id:"",
        title: "",
        content: "",
        postedBy: "",
        date:Timestamp.now(),
        })
      await fetchNotices()
    } catch (error) {
      console.error("Error adding notice:", error)
      toast({
        title: "Error",
        description: "Failed to add notice",
        variant: "destructive",
      })
    }
    finally {
      setLoading(false)
    }
  }

  const handleEditClick = (notice: Notice) => {
    setCurrentNotice(notice)
    setFormData({
      id:notice.id,
      title: notice.title,
      content: notice.content,
      postedBy: notice.postedBy,
      date:notice.date,
    })
    setIsEditDialogOpen(true)
  }

  const handleEditNotice = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!currentNotice) return;
    try {
      await updateNotice(currentNotice.id, {
        ...formData,
        date: Timestamp.now(),
      })
      toast({
        title: "Success",
        description: "Notice updated successfully",
      })
      setIsEditDialogOpen(false)
      fetchNotices()
    } catch (error) {
      console.error("Error updating notice:", error)
      toast({
        title: "Error",
        description: "Failed to update notice",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = (notice: any) => {
    setCurrentNotice(notice)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteNotice = async () => {
    if(!currentNotice) return
    try {
      await deleteNotice(currentNotice.id)
      toast({
        title: "Success",
        description: "Notice deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      await fetchNotices()
    } catch (error) {
      console.error("Error deleting notice:", error)
      toast({
        title: "Error",
        description: "Failed to delete notice",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Manage Notices</h2>
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" /> Add Notice
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-8 bg-muted rounded w-full"></div>
                  </CardFooter>
                </Card>
            ))}
          </div>
        </div>
    )
  }

  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Notices</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Notice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Notice</DialogTitle>
                <DialogDescription>Create a new notice to be displayed on the school website.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddNotice} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                      id="content"
                      name="content"
                      rows={5}
                      value={formData.content}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postedBy">Posted By</Label>
                  <Input id="postedBy" name="postedBy" value={formData.postedBy} onChange={handleChange} required />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Notice</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notices.map((notice) => (
              <Card key={notice.id}>
                <CardHeader>
                  <CardTitle>{notice.title}</CardTitle>
                  <CardDescription>{notice.date.toDate().toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{notice.content}</p>
                  <p className="text-sm text-muted-foreground mt-2">Posted by: {notice.postedBy}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(notice)}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(notice)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Notice</DialogTitle>
              <DialogDescription>Make changes to the selected notice.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditNotice} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input id="edit-title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                    id="edit-content"
                    name="content"
                    rows={5}
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-postedBy">Posted By</Label>
                <Input id="edit-postedBy" name="postedBy" value={formData.postedBy} onChange={handleChange} required />
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this notice? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={()=>handleDeleteNotice()}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
