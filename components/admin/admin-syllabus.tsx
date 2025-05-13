"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { getAllSyllabus, addSyllabus, deleteSyllabus } from "@/src/firebase/firestore"
import { uploadFile } from "@/src/firebase/storage"
import { Trash2, Plus, Upload, FileText, Download } from "lucide-react"

export default function AdminSyllabus() {
    const [syllabusList, setSyllabusList] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentSyllabus, setCurrentSyllabus] = useState<any>(null)
    const [file, setFile] = useState<File | null>(null)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        class: "",
        subject: "",
        academicYear: new Date().getFullYear().toString(),
    })

    useEffect(() => {
        fetchSyllabus()
    }, [])

    const fetchSyllabus = async () => {
        setLoading(true)
        try {
            const allSyllabus = await getAllSyllabus()
            setSyllabusList(allSyllabus)
        } catch (error) {
            console.error("Error fetching syllabus:", error)
            toast({
                title: "Error",
                description: "Failed to load syllabus",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
        }
    }

    const handleFileUpload = async () => {
        if (!file) return null

        setUploadingFile(true)
        try {
            const fileUrl = await uploadFile(file, `syllabus/${Date.now()}_${file.name}`)
            return fileUrl
        } catch (error) {
            console.error("Error uploading file:", error)
            toast({
                title: "Error",
                description: "Failed to upload file",
                variant: "destructive",
            })
            return null
        } finally {
            setUploadingFile(false)
        }
    }

    const handleAddSyllabus = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            toast({
                title: "Error",
                description: "Please select a file to upload",
                variant: "destructive",
            })
            return
        }

        try {
            const fileUrl = await handleFileUpload()

            if (fileUrl) {
                await addSyllabus({
                    ...formData,
                    fileUrl,
                    fileName: file.name,
                    uploadedAt: new Date().toISOString(),
                })

                toast({
                    title: "Success",
                    description: "Syllabus added successfully",
                })

                setIsAddDialogOpen(false)
                setFormData({
                    title: "",
                    class: "",
                    subject: "",
                    academicYear: new Date().getFullYear().toString(),
                })
                setFile(null)
                fetchSyllabus()
            }
        } catch (error) {
            console.error("Error adding syllabus:", error)
            toast({
                title: "Error",
                description: "Failed to add syllabus",
                variant: "destructive",
            })
        }
    }

    const handleDeleteClick = (syllabus: any) => {
        setCurrentSyllabus(syllabus)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteSyllabus = async () => {
        try {
            await deleteSyllabus(currentSyllabus.id)
            toast({
                title: "Success",
                description: "Syllabus deleted successfully",
            })
            setIsDeleteDialogOpen(false)
            fetchSyllabus()
        } catch (error) {
            console.error("Error deleting syllabus:", error)
            toast({
                title: "Error",
                description: "Failed to delete syllabus",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Syllabus</h2>
                    <Button disabled>
                        <Plus className="mr-2 h-4 w-4" /> Add Syllabus
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
                <h2 className="text-2xl font-bold">Manage Syllabus</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Syllabus
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Syllabus</DialogTitle>
                            <DialogDescription>Upload a new syllabus for students.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddSyllabus} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="class">Class</Label>
                                <Select value={formData.class} onValueChange={(value) => handleSelectChange("class", value)} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <SelectItem key={i + 1} value={`Class ${i + 1}`}>
                                                Class {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="academicYear">Academic Year</Label>
                                <Input
                                    id="academicYear"
                                    name="academicYear"
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    value={formData.academicYear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="syllabus-file">Syllabus File (PDF)</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="syllabus-file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("syllabus-file")?.click()}
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" /> Select File
                                    </Button>
                                </div>
                                {file && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={!file || uploadingFile}>
                                    {uploadingFile ? "Uploading..." : "Add Syllabus"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {syllabusList.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-2">No syllabus found</p>
                        <p className="text-sm text-muted-foreground">Click the "Add Syllabus" button to upload a new syllabus</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {syllabusList.map((syllabus) => (
                        <Card key={syllabus.id}>
                            <CardHeader>
                                <CardTitle>{syllabus.title}</CardTitle>
                                <CardDescription>
                                    {syllabus.class} • {syllabus.subject} • {syllabus.academicYear}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Uploaded on: {new Date(syllabus.uploadedAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm truncate">{syllabus.fileName}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={syllabus.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </a>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(syllabus)}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this syllabus? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteSyllabus}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
