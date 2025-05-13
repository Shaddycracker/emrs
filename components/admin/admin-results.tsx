// "use client"
//
// import type React from "react"
//
// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { toast } from "@/hooks/use-toast"
// import { getAllResults, addResult, deleteResult } from "@/firebase/Result/Result"
// import {uploadImage}  from "@/firebase/storage"
// import { Trash2, Plus, Upload, FileText, Download } from "lucide-react"
//
// export default function AdminResults() {
//     const [resultsList, setResultsList] = useState<any[]>([])
//     const [loading, setLoading] = useState(true)
//     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//     const [currentResult, setCurrentResult] = useState<any>(null)
//     const [file, setFile] = useState<File | null>(null)
//     const [uploadingFile, setUploadingFile] = useState(false)
//     const [formData, setFormData] = useState({
//         title: "",
//         class: "",
//         examType: "",
//         academicYear: new Date().getFullYear().toString(),
//     })
//
//     useEffect(() => {
//         fetchResults()
//     }, [])
//
//     const fetchResults = async () => {
//         setLoading(true)
//         try {
//             const allResults = await getAllResults()
//             setResultsList(allResults)
//         } catch (error) {
//             console.error("Error fetching results:", error)
//             toast({
//                 title: "Error",
//                 description: "Failed to load results",
//                 variant: "destructive",
//             })
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }
//
//     const handleSelectChange = (name: string, value: string) => {
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }
//
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const selectedFile = e.target.files[0]
//             setFile(selectedFile)
//         }
//     }
//
//     const handleFileUpload = async () => {
//         if (!file) return null
//
//         setUploadingFile(true)
//         try {
//             const fileUrl = await uploadFile(file, `results/${Date.now()}_${file.name}`)
//             return fileUrl
//         } catch (error) {
//             console.error("Error uploading file:", error)
//             toast({
//                 title: "Error",
//                 description: "Failed to upload file",
//                 variant: "destructive",
//             })
//             return null
//         } finally {
//             setUploadingFile(false)
//         }
//     }
//
//     const handleAddResult = async (e: React.FormEvent) => {
//         e.preventDefault()
//
//         if (!file) {
//             toast({
//                 title: "Error",
//                 description: "Please select a file to upload",
//                 variant: "destructive",
//             })
//             return
//         }
//
//         try {
//             const fileUrl = await handleFileUpload()
//
//             if (fileUrl) {
//                 await addResult({
//                     ...formData,
//                     fileUrl,
//                     fileName: file.name,
//                     uploadedAt: new Date().toISOString(),
//                 })
//
//                 toast({
//                     title: "Success",
//                     description: "Result added successfully",
//                 })
//
//                 setIsAddDialogOpen(false)
//                 setFormData({
//                     title: "",
//                     class: "",
//                     examType: "",
//                     academicYear: new Date().getFullYear().toString(),
//                 })
//                 setFile(null)
//                 fetchResults()
//             }
//         } catch (error) {
//             console.error("Error adding result:", error)
//             toast({
//                 title: "Error",
//                 description: "Failed to add result",
//                 variant: "destructive",
//             })
//         }
//     }
//
//     const handleDeleteClick = (result: any) => {
//         setCurrentResult(result)
//         setIsDeleteDialogOpen(true)
//     }
//
//     const handleDeleteResult = async () => {
//         try {
//             await deleteResult(currentResult.id)
//             toast({
//                 title: "Success",
//                 description: "Result deleted successfully",
//             })
//             setIsDeleteDialogOpen(false)
//             fetchResults()
//         } catch (error) {
//             console.error("Error deleting result:", error)
//             toast({
//                 title: "Error",
//                 description: "Failed to delete result",
//                 variant: "destructive",
//             })
//         }
//     }
//
//     if (loading) {
//         return (
//             <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                     <h2 className="text-2xl font-bold">Manage Results</h2>
//                     <Button disabled>
//                         <Plus className="mr-2 h-4 w-4" /> Add Result
//                     </Button>
//                 </div>
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                     {[1, 2, 3, 4, 5, 6].map((i) => (
//                         <Card key={i} className="animate-pulse">
//                             <CardHeader>
//                                 <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
//                                 <div className="h-3 bg-muted rounded w-1/2"></div>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="h-4 bg-muted rounded w-full mb-2"></div>
//                                 <div className="h-4 bg-muted rounded w-full mb-2"></div>
//                                 <div className="h-4 bg-muted rounded w-3/4"></div>
//                             </CardContent>
//                             <CardFooter>
//                                 <div className="h-8 bg-muted rounded w-full"></div>
//                             </CardFooter>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         )
//     }
//
//     return (
//         <div className="space-y-4">
//             <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold">Manage Results</h2>
//                 <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//                     <DialogTrigger asChild>
//                         <Button>
//                             <Plus className="mr-2 h-4 w-4" /> Add Result
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Add New Result</DialogTitle>
//                             <DialogDescription>Upload a new result for students.</DialogDescription>
//                         </DialogHeader>
//                         <form onSubmit={handleAddResult} className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="title">Title</Label>
//                                 <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="class">Class</Label>
//                                 <Select value={formData.class} onValueChange={(value) => handleSelectChange("class", value)} required>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select Class" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {Array.from({ length: 12 }, (_, i) => (
//                                             <SelectItem key={i + 1} value={`Class ${i + 1}`}>
//                                                 Class {i + 1}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="examType">Exam Type</Label>
//                                 <Select
//                                     value={formData.examType}
//                                     onValueChange={(value) => handleSelectChange("examType", value)}
//                                     required
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select Exam Type" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="Mid Term">Mid Term</SelectItem>
//                                         <SelectItem value="Final Term">Final Term</SelectItem>
//                                         <SelectItem value="Unit Test">Unit Test</SelectItem>
//                                         <SelectItem value="Annual Exam">Annual Exam</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="academicYear">Academic Year</Label>
//                                 <Input
//                                     id="academicYear"
//                                     name="academicYear"
//                                     type="number"
//                                     min="2000"
//                                     max="2100"
//                                     value={formData.academicYear}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="result-file">Result File (PDF)</Label>
//                                 <div className="flex items-center gap-2">
//                                     <Input id="result-file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         onClick={() => document.getElementById("result-file")?.click()}
//                                         className="w-full flex items-center justify-center gap-2"
//                                     >
//                                         <Upload className="h-4 w-4" /> Select File
//                                     </Button>
//                                 </div>
//                                 {file && (
//                                     <p className="text-sm text-muted-foreground mt-2">
//                                         Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
//                                     </p>
//                                 )}
//                             </div>
//                             <DialogFooter>
//                                 <Button type="submit" disabled={!file || uploadingFile}>
//                                     {uploadingFile ? "Uploading..." : "Add Result"}
//                                 </Button>
//                             </DialogFooter>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </div>
//
//             {resultsList.length === 0 ? (
//                 <Card>
//                     <CardContent className="flex flex-col items-center justify-center py-10">
//                         <FileText className="h-16 w-16 text-muted-foreground mb-4" />
//                         <p className="text-muted-foreground mb-2">No results found</p>
//                         <p className="text-sm text-muted-foreground">Click the "Add Result" button to upload a new result</p>
//                     </CardContent>
//                 </Card>
//             ) : (
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                     {resultsList.map((result) => (
//                         <Card key={result.id}>
//                             <CardHeader>
//                                 <CardTitle>{result.title}</CardTitle>
//                                 <CardDescription>
//                                     {result.class} • {result.examType} • {result.academicYear}
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <p className="text-sm text-muted-foreground mb-2">
//                                     Uploaded on: {new Date(result.uploadedAt).toLocaleDateString()}
//                                 </p>
//                                 <p className="text-sm truncate">{result.fileName}</p>
//                             </CardContent>
//                             <CardFooter className="flex justify-between">
//                                 <Button variant="outline" size="sm" asChild>
//                                     <a href={result.fileUrl} target="_blank" rel="noopener noreferrer">
//                                         <Download className="mr-2 h-4 w-4" /> Download
//                                     </a>
//                                 </Button>
//                                 <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(result)}>
//                                     <Trash2 className="mr-2 h-4 w-4" /> Delete
//                                 </Button>
//                             </CardFooter>
//                         </Card>
//                     ))}
//                 </div>
//             )}
//
//             {/* Delete Confirmation Dialog */}
//             <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Confirm Deletion</DialogTitle>
//                         <DialogDescription>
//                             Are you sure you want to delete this result? This action cannot be undone.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <DialogFooter>
//                         <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant="destructive" onClick={handleDeleteResult}>
//                             Delete
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }
