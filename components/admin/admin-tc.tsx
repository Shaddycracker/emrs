"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
// import { getAllTCs, addTC, deleteTC } from "@/src/firebase/firestore"
// import { uploadFile } from "@/src/firebase/storage"
import { Trash2, Plus, Upload, FileText, Download } from "lucide-react"

export default function AdminTC() {
    const [tcList, setTCList] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentTC, setCurrentTC] = useState<any>(null)
    const [file, setFile] = useState<File | null>(null)
    const [uploadingFile, setUploadingFile] = useState(false)
    const [formData, setFormData] = useState({
        studentName: "",
        tcNumber: "",
        issueDate: "",
        class: "",
    })

    useEffect(() => {
        fetchTCs()
    }, [])

    const fetchTCs = async () => {
        setLoading(true)
        try {
            // const allTCs = await getAllTCs()
            // setTCList(allTCs)
        } catch (error) {
            console.error("Error fetching TCs:", error)
            toast({
                title: "Error",
                description: "Failed to load transfer certificates",
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
            // const fileUrl = await uploadFile(file, `tc/${Date.now()}_${file.name}`)
            // return fileUrl
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

    const handleAddTC = async (e: React.FormEvent) => {
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
                // await addTC({
                //     ...formData,
                //     fileUrl,
                //     fileName: file.name,
                //     uploadedAt: new Date().toISOString(),
                // })

                toast({
                    title: "Success",
                    description: "Transfer Certificate added successfully",
                })

                setIsAddDialogOpen(false)
                setFormData({
                    studentName: "",
                    tcNumber: "",
                    issueDate: "",
                    class: "",
                })
                setFile(null)
                fetchTCs()
            }
        } catch (error) {
            console.error("Error adding TC:", error)
            toast({
                title: "Error",
                description: "Failed to add transfer certificate",
                variant: "destructive",
            })
        }
    }

    const handleDeleteClick = (tc: any) => {
        setCurrentTC(tc)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteTC = async () => {
        try {
            // await deleteTC(currentTC.id)
            // toast({
            //     title: "Success",
            //     description: "Transfer Certificate deleted successfully",
            // })
            setIsDeleteDialogOpen(false)
            fetchTCs()
        } catch (error) {
            console.error("Error deleting TC:", error)
            toast({
                title: "Error",
                description: "Failed to delete transfer certificate",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Transfer Certificates</h2>
                    <Button disabled>
                        <Plus className="mr-2 h-4 w-4" /> Add TC
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
                <h2 className="text-2xl font-bold">Manage Transfer Certificates</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add TC
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Transfer Certificate</DialogTitle>
                            <DialogDescription>Upload a new transfer certificate for a student.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddTC} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="studentName">Student Name</Label>
                                <Input
                                    id="studentName"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tcNumber">TC Number</Label>
                                <Input id="tcNumber" name="tcNumber" value={formData.tcNumber} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="issueDate">Issue Date</Label>
                                <Input
                                    id="issueDate"
                                    name="issueDate"
                                    type="date"
                                    value={formData.issueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="class">Class</Label>
                                <Input id="class" name="class" value={formData.class} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tc-file">TC File (PDF)</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="tc-file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("tc-file")?.click()}
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
                                    {uploadingFile ? "Uploading..." : "Add TC"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {tcList.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-2">No transfer certificates found</p>
                        <p className="text-sm text-muted-foreground">
                            Click the "Add TC" button to upload a new transfer certificate
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tcList.map((tc) => (
                        <Card key={tc.id}>
                            <CardHeader>
                                <CardTitle>{tc.studentName}</CardTitle>
                                <CardDescription>TC Number: {tc.tcNumber}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Issue Date:</span>
                                        <span>{new Date(tc.issueDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Class:</span>
                                        <span>{tc.class}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Uploaded on: {new Date(tc.uploadedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={tc.fileUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </a>
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(tc)}>
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
                            Are you sure you want to delete this transfer certificate? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteTC}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}