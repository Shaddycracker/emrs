"use client"

import type React from "react"

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
import { getAllAchievers, addAchiever, updateAchiever, deleteAchiever } from "@/src/firebase/firestore"
import { Pencil, Trash2, Plus, Upload } from "lucide-react"
import { uploadImage } from "@/src/firebase/storage"

export default function AdminAchievers() {
  const [achievers, setAchievers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAchiever, setCurrentAchiever] = useState<any>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    achievement: "",
    description: "",
    year: new Date().getFullYear().toString(),
    image: "",
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
    if (!imageFile) return null

    setUploadingImage(true)
    try {
      const imageUrl = await uploadImage(imageFile, `achievers/${Date.now()}_${imageFile.name}`)
      return imageUrl
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
      let imageUrl = formData.image
      if (imageFile) {
        imageUrl = (await handleImageUpload()) || ""
      }

      await addAchiever({
        ...formData,
        image: imageUrl,
      })

      toast({
        title: "Success",
        description: "Achiever added successfully",
      })

      setIsAddDialogOpen(false)
      setFormData({
        name: "",
        achievement: "",
        description: "",
        year: new Date().getFullYear().toString(),
        image: "",
      })
      setImageFile(null)
      setImagePreview(null)
      fetchAchievers()
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
      name: achiever.name,
      achievement: achiever.achievement,
      description: achiever.description || "",
      year: achiever.year,
      image: achiever.image || "",
    })
    setImagePreview(achiever.image || null)
    setIsEditDialogOpen(true)
  }

  const handleEditAchiever = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let imageUrl = formData.image
      if (imageFile) {
        imageUrl = (await handleImageUpload()) || ""
      }

      await updateAchiever(currentAchiever.id, {
        ...formData,
        image: imageUrl,
      })

      toast({
        title: "Success",
        description: "Achiever updated successfully",
      })

      setIsEditDialogOpen(false)
      setImageFile(null)
      setImagePreview(null)
      fetchAchievers()
    } catch (error) {
      console.error("Error updating achiever:", error)
      toast({
        title: "Error",
        description: "Failed to update achiever",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = (achiever: any) => {
    setCurrentAchiever(achiever)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteAchiever = async () => {
    try {
      await deleteAchiever(currentAchiever.id)
      toast({
        title: "Success",
        description: "Achiever deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      fetchAchievers()
    } catch (error) {
      console.error("Error deleting achiever:", error)
      toast({
        title: "Error",
        description: "Failed to delete achiever",
        variant: "destructive",
      })
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
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center gap-2">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" /> Upload Image
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievers.map((achiever) => (
          <Card key={achiever.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={achiever.image || "/placeholder.svg?height=300&width=300"}
                alt={achiever.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{achiever.name}</CardTitle>
              <CardDescription>{achiever.achievement}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm">{achiever.description}</p>
              <p className="text-sm text-muted-foreground mt-2">Year: {achiever.year}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEditClick(achiever)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(achiever)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
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
              <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
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
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-year">Year</Label>
              <Input
                id="edit-year"
                name="year"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image</Label>
              <div className="flex items-center gap-2">
                <Input id="edit-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("edit-image")?.click()}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4" /> Change Image
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
