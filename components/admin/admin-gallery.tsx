"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Timestamp} from "firebase/firestore";
import { toast } from "@/hooks/use-toast"
import { getAllGalleryImages, addGalleryImage, deleteGalleryImage } from "@/firebase/Gallery/Gallery"
import { uploadImage } from "@/firebase/storage"
import { Trash2, Plus, Upload } from "lucide-react"
import {GalleryImage} from "@/firebase/types/types";
import {useEdgeStore} from '@/lib/edgestore'

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<GalleryImage|null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [caption, setCaption] = useState("")
  const {edgestore}=useEdgeStore();

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    setLoading(true)
    try {
      const allImages = await getAllGalleryImages()
      setImages(allImages)
    } catch (error) {
      console.error("Error fetching gallery images:", error)
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
      const imageUrl = await uploadImage(imageFile,edgestore,"Gallery")
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

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      })
      return
    }

    try {
      const imageUrl = await handleImageUpload()

      if (imageUrl) {
        await addGalleryImage({
          id:"",
          url: imageUrl,
          category:"school",
          description:"",
          uploadedAt: Timestamp.now(),
        })

        toast({
          title: "Success",
          description: "Image added to gallery successfully",
        })

        setIsAddDialogOpen(false)
        setImageFile(null)
        setImagePreview(null)
        setCaption("")
        fetchImages()
      }
    } catch (error) {
      console.error("Error adding gallery image:", error)
      toast({
        title: "Error",
        description: "Failed to add image to gallery",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = (image: any) => {
    setCurrentImage(image)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteImage = async () => {
     setLoading(true)
      if(!currentImage)return
    try {
      await deleteGalleryImage(currentImage.id)
      toast({
        title: "Success",
        description: "Image deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      fetchImages()
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Manage Gallery</h2>
            <Button disabled>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
    )
  }

  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Gallery</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Image</DialogTitle>
                <DialogDescription>Upload a new image to the school gallery.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddImage} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gallery-image">Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                        id="gallery-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("gallery-image")?.click()}
                        className="w-full flex items-center justify-center gap-2"
                    >
                      <Upload className="h-4 w-4" /> Select Image
                    </Button>
                  </div>
                  {imagePreview && (
                      <div className="mt-2">
                        <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-60 w-full rounded-md object-cover"
                        />
                      </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caption">Caption (Optional)</Label>
                  <Input
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Enter a caption for this image"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={!imageFile || uploadingImage}>
                    {uploadingImage ? "Uploading..." : "Add to gallery"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.description || "gallery image"}
                      className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm truncate">{image.description || "No caption"}</p>
                  <p className="text-xs text-muted-foreground mt-1">{image.uploadedAt.toDate().toLocaleDateString()}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDeleteClick(image)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
          ))}
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this image? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 flex justify-center">
              <img
                  src={currentImage?.url || "/placeholder.svg"}
                  alt="To be deleted"
                  className="max-h-40 rounded-md object-cover"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteImage}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
