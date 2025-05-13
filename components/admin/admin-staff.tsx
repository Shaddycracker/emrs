"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { getAllStaff, addStaff, updateStaff, deleteStaff } from "@/src/firebase/firestore"
import { uploadImage } from "@/src/firebase/storage"
import { Pencil, Trash2, Plus, Upload, User } from "lucide-react"

export default function AdminStaff() {
    const [staffList, setStaffList] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentStaff, setCurrentStaff] = useState<any>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        department: "",
        qualification: "",
        experience: "",
        email: "",
        phone: "",
        bio: "",
        image: "",
    })

    useEffect(() => {
        fetchStaff()
    }, [])

    const fetchStaff = async () => {
        setLoading(true)
        try {
            const allStaff = await getAllStaff()
            setStaffList(allStaff)
        } catch (error) {
            console.error("Error fetching staff:", error)
            toast({
                title: "Error",
                description: "Failed to load staff",
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

    const handleSelectChange = (name: string, value: string) => {
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
            const imageUrl = await uploadImage(imageFile, `staff/${Date.now()}_${imageFile.name}`)
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

    const handleAddStaff = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            let imageUrl = formData.image
            if (imageFile) {
                imageUrl = (await handleImageUpload()) || ""
            }

            await addStaff({
                ...formData,
                image: imageUrl,
                joinedAt: new Date().toISOString(),
            })

            toast({
                title: "Success",
                description: "Staff member added successfully",
            })

            setIsAddDialogOpen(false)
            setFormData({
                name: "",
                designation: "",
                department: "",
                qualification: "",
                experience: "",
                email: "",
                phone: "",
                bio: "",
                image: "",
            })
            setImageFile(null)
            setImagePreview(null)
            fetchStaff()
        } catch (error) {
            console.error("Error adding staff:", error)
            toast({
                title: "Error",
                description: "Failed to add staff member",
                variant: "destructive",
            })
        }
    }

    const handleEditClick = (staff: any) => {
        setCurrentStaff(staff)
        setFormData({
            name: staff.name,
            designation: staff.designation,
            department: staff.department,
            qualification: staff.qualification,
            experience: staff.experience,
            email: staff.email,
            phone: staff.phone,
            bio: staff.bio || "",
            image: staff.image || "",
        })
        setImagePreview(staff.image || null)
        setIsEditDialogOpen(true)
    }

    const handleEditStaff = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            let imageUrl = formData.image
            if (imageFile) {
                imageUrl = (await handleImageUpload()) || ""
            }

            await updateStaff(currentStaff.id, {
                ...formData,
                image: imageUrl,
                updatedAt: new Date().toISOString(),
            })

            toast({
                title: "Success",
                description: "Staff member updated successfully",
            })

            setIsEditDialogOpen(false)
            setImageFile(null)
            setImagePreview(null)
            fetchStaff()
        } catch (error) {
            console.error("Error updating staff:", error)
            toast({
                title: "Error",
                description: "Failed to update staff member",
                variant: "destructive",
            })
        }
    }

    const handleDeleteClick = (staff: any) => {
        setCurrentStaff(staff)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteStaff = async () => {
        try {
            await deleteStaff(currentStaff.id)
            toast({
                title: "Success",
                description: "Staff member deleted successfully",
            })
            setIsDeleteDialogOpen(false)
            fetchStaff()
        } catch (error) {
            console.error("Error deleting staff:", error)
            toast({
                title: "Error",
                description: "Failed to delete staff member",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Staff</h2>
                    <Button disabled>
                        <Plus className="mr-2 h-4 w-4" /> Add Staff
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
                <h2 className="text-2xl font-bold">Manage Staff</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Staff
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Staff Member</DialogTitle>
                            <DialogDescription>Add a new staff member to the school.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddStaff} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="designation">Designation</Label>
                                <Input
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    value={formData.department}
                                    onValueChange={(value) => handleSelectChange("department", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Administration">Administration</SelectItem>
                                        <SelectItem value="Teaching">Teaching</SelectItem>
                                        <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                                        <SelectItem value="Support Staff">Support Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="qualification">Qualification</Label>
                                <Input
                                    id="qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="experience">Experience</Label>
                                <Input id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" name="bio" rows={3} value={formData.bio} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="staff-image">Profile Image</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="staff-image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("staff-image")?.click()}
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
                                    {uploadingImage ? "Uploading..." : "Add Staff"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {staffList.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <User className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-2">No staff members found</p>
                        <p className="text-sm text-muted-foreground">Click the "Add Staff" button to add a new staff member</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {staffList.map((staff) => (
                        <Card key={staff.id} className="overflow-hidden">
                            <div className="aspect-square relative">
                                <img
                                    src={staff.image || "/placeholder.svg?height=300&width=300"}
                                    alt={staff.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{staff.name}</CardTitle>
                                <CardDescription>{staff.designation}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Department:</span>
                                        <span>{staff.department}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Qualification:</span>
                                        <span>{staff.qualification}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Experience:</span>
                                        <span>{staff.experience}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm" onClick={() => handleEditClick(staff)}>
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(staff)}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Staff Member</DialogTitle>
                        <DialogDescription>Update the details of this staff member.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditStaff} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-designation">Designation</Label>
                            <Input
                                id="edit-designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-department">Department</Label>
                            <Select
                                value={formData.department}
                                onValueChange={(value) => handleSelectChange("department", value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Administration">Administration</SelectItem>
                                    <SelectItem value="Teaching">Teaching</SelectItem>
                                    <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                                    <SelectItem value="Support Staff">Support Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-qualification">Qualification</Label>
                            <Input
                                id="edit-qualification"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-experience">Experience</Label>
                            <Input
                                id="edit-experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-phone">Phone</Label>
                            <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-bio">Bio</Label>
                            <Textarea id="edit-bio" name="bio" rows={3} value={formData.bio} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-staff-image">Profile Image</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="edit-staff-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("edit-staff-image")?.click()}
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
                            Are you sure you want to delete this staff member? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteStaff}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
