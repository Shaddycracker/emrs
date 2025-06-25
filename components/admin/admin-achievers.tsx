"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEdgeStore } from '@/lib/edgestore';
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
import { getAllAchievers, addAchiever, updateAchiever, deleteAchiever } from "@/firebase/Achivers/Achivers"
import { Pencil, Trash2, Plus, Upload } from "lucide-react"
import { uploadImage } from "@/firebase/storage"
import {Achiever} from "@/firebase/types/types";

export default function AdminAchievers() {
  const [achievers , setAchievers] = useState<Achiever[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAchiever, setCurrentAchiever] = useState<Achiever|null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { edgestore }  = useEdgeStore()
  const [formData, setFormData] = useState<Achiever>({
    id:"",
    name: "",
    achievement: "",
    session:"",
    imageUrl: "",
    class:"",
    percentage:0,
  })

  useEffect(() => {
    fetchAchievers()
  }, [])

  const fetchAchievers = async () => {
    setLoading(true)
    try {
      const allAchievers = await getAllAchievers()
      setAchievers(allAchievers)
    } catch (error) {
      console.error("Error fetching achievers:", error)
      toast({
        title: "Error",
        description: "Failed to load achievers",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile || !edgestore) return null

    setUploadingImage(true)
    try {
      return await uploadImage(imageFile,edgestore,"Achievers")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleAddAchiever = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = formData.imageUrl
      if (imageFile) {
        imageUrl = (await handleImageUpload()) || ""
      }

      await addAchiever({
        ...formData,
        imageUrl: imageUrl,
      })

      toast({
        title: "Success",
        description: "Achiever added successfully",
      })

      setIsAddDialogOpen(false)
      setFormData({
        id:"",
        name: "",
        achievement: "",
        session:"",
        imageUrl: "",
        class:"",
        percentage:0,
      })
      setImageFile(null)
      setImagePreview(null)
      await fetchAchievers()
    } catch (error) {
      console.error("Error adding achiever:", error)
      toast({
        title: "Error",
        description: "Failed to add achiever",
        variant: "destructive",
      })
    }
  }

  const handleEditClick = (achiever: any) => {
    setCurrentAchiever(achiever)
    setFormData({
      id:achiever.id,
      name: achiever.name,
      achievement: achiever.achievement,
      session:achiever.session,
      imageUrl: achiever.imageUrl ||"",
      class:achiever.class,
      percentage:achiever.percentage,
    })
    setImagePreview(achiever.image || null)
    setIsEditDialogOpen(true)
  }

  const handleEditAchiever = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if(!currentAchiever)return
    try {
      let imageUrl = formData.imageUrl
      if (imageFile) {
        imageUrl = (await handleImageUpload()) || ""
      }

      await updateAchiever(currentAchiever.id, {
        ...formData,
        imageUrl: imageUrl,
      })

      toast({
        title: "Success",
        description: "Achiever updated successfully",
      })

      setIsEditDialogOpen(false)
      setImageFile(null)
      setImagePreview(null)
      await fetchAchievers()
    } catch (error) {
      console.error("Error updating achiever:", error)
      toast({
        title: "Error",
        description: "Failed to update achiever",
        variant: "destructive",
      })
    }
    finally {
      setUploadingImage(false)
    }
  }

  const handleDeleteClick = (achiever: any) => {
    setCurrentAchiever(achiever)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteAchiever = async () => {
    if(!currentAchiever)return
    setLoading(true)
    try {
      await deleteAchiever(currentAchiever.id)
      toast({
        title: "Success",
        description: "Achiever deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      await fetchAchievers()
    } catch (error) {
      console.error("Error deleting achiever:", error)
      toast({
        title: "Error",
        description: "Failed to delete achiever",
        variant: "destructive",
      })
    }
    finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Manage Achievers</h2>
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" /> Add Achiever
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted"></div>
                  <CardHeader>
                    <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
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
          <h2 className="text-2xl font-bold">Manage Achievers</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Achiever
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Achiever</DialogTitle>
                <DialogDescription>Add a new achiever to showcase on the school website.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAchiever} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievement">Achievement</Label>
                  <Input
                      id="achievement"
                      name="achievement"
                      value={formData.achievement}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session">Session</Label>
                  <Textarea
                      id="session"
                      name="session"
                      rows={3}
                      value={formData.session}
                      onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Input
                      id="class"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage</Label>
                  <Input
                      id="percentage"
                      name="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="flex items-center gap-2">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image")?.click()}
                        className="w-full flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4"/> Upload Image
                    </Button>
                  </div>
                  {imagePreview && (
                      <div className="mt-2">
                        <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-40 rounded-md object-cover"
                        />
                      </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={uploadingImage}>
                    {uploadingImage ? "Uploading..." : "Add Achiever"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {achievers.map((achiever) => (
              <Card
                  key={achiever.id}
                  className="overflow-hidden text-sm p-2 sm:p-3"
              >
                {/* Smaller image */}
                <div className="relative w-full aspect-[4/3]">
                  <img
                      src={achiever.imageUrl || "/placeholder.svg?height=300&width=300"}
                      alt={achiever.name}
                      className="w-full h-full object-cover"
                  />
                </div>

                {/* Condensed header */}
                <CardHeader className="px-2 py-2">
                  <CardTitle className="text-base">{achiever.name}</CardTitle>
                  <CardDescription className="text-xs">{achiever.achievement}</CardDescription>
                </CardHeader>

                {/* Condensed content */}
                <CardContent className="px-2 py-1">
                  <p className="line-clamp-2 text-xs">Class: {achiever.class}</p>
                  <p className="text-xs text-muted-foreground mt-1">Session: {achiever.session}</p>
                  <p className="text-xs text-muted-foreground mt-1">Percentage: {achiever.percentage} %</p>
                </CardContent>

                {/* Condensed footer */}
                <CardFooter className="flex justify-between px-2 py-2">
                  <Button variant="outline" size="sm" className="text-xs px-2 h-7" onClick={() => handleEditClick(achiever)}>
                    <Pencil className="mr-1 h-3 w-3" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="text-xs px-2 h-7" onClick={() => handleDeleteClick(achiever)}>
                    <Trash2 className="mr-1 h-3 w-3" /> Delete
                  </Button>
                </CardFooter>
              </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Achiever</DialogTitle>
              <DialogDescription>Make changes to the selected achiever.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditAchiever} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-achievement">Achievement</Label>
                <Input
                    id="edit-achievement"
                    name="achievement"
                    value={formData.achievement}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Textarea
                    id="session"
                    name="session"
                    rows={3}
                    value={formData.session}
                    onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Input
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Percentage</Label>
                <Input
                    id="percentage"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image</Label>
                <div className="flex items-center gap-2">
                  <Input id="edit-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("edit-image")?.click()}
                      className="w-full flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4"/> Change Image
                  </Button>
                </div>
                {imagePreview && (
                    <div className="mt-2">
                      <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="max-h-40 rounded-md object-cover"
                      />
                    </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={uploadingImage}>
                  {uploadingImage ? "Uploading..." : "Save Changes"}
                </Button>
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
                Are you sure you want to delete this achiever? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAchiever}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
