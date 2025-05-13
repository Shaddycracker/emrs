"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { getAllSessions, addSession, updateSession, deleteSession } from "@/src/firebase/firestore"
import { Pencil, Trash2, Plus, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminSessions() {
    const [sessions, setSessions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentSession, setCurrentSession] = useState<any>(null)
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        isActive: false,
    })

    useEffect(() => {
        fetchSessions()
    }, [])

    const fetchSessions = async () => {
        setLoading(true)
        try {
            const allSessions = await getAllSessions()
            setSessions(allSessions)
        } catch (error) {
            console.error("Error fetching sessions:", error)
            toast({
                title: "Error",
                description: "Failed to load sessions",
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

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, isActive: checked }))
    }

    const handleAddSession = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await addSession({
                ...formData,
                createdAt: new Date().toISOString(),
            })

            toast({
                title: "Success",
                description: "Session added successfully",
            })

            setIsAddDialogOpen(false)
            setFormData({
                name: "",
                startDate: "",
                endDate: "",
                isActive: false,
            })
            fetchSessions()
        } catch (error) {
            console.error("Error adding session:", error)
            toast({
                title: "Error",
                description: "Failed to add session",
                variant: "destructive",
            })
        }
    }

    const handleEditClick = (session: any) => {
        setCurrentSession(session)
        setFormData({
            name: session.name,
            startDate: session.startDate,
            endDate: session.endDate,
            isActive: session.isActive,
        })
        setIsEditDialogOpen(true)
    }

    const handleEditSession = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await updateSession(currentSession.id, {
                ...formData,
                updatedAt: new Date().toISOString(),
            })

            toast({
                title: "Success",
                description: "Session updated successfully",
            })

            setIsEditDialogOpen(false)
            fetchSessions()
        } catch (error) {
            console.error("Error updating session:", error)
            toast({
                title: "Error",
                description: "Failed to update session",
                variant: "destructive",
            })
        }
    }

    const handleDeleteClick = (session: any) => {
        setCurrentSession(session)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteSession = async () => {
        try {
            await deleteSession(currentSession.id)
            toast({
                title: "Success",
                description: "Session deleted successfully",
            })
            setIsDeleteDialogOpen(false)
            fetchSessions()
        } catch (error) {
            console.error("Error deleting session:", error)
            toast({
                title: "Error",
                description: "Failed to delete session",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Academic Sessions</h2>
                    <Button disabled>
                        <Plus className="mr-2 h-4 w-4" /> Add Session
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
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
                <h2 className="text-2xl font-bold">Manage Academic Sessions</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Session
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Academic Session</DialogTitle>
                            <DialogDescription>Create a new academic session for the school.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddSession} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Session Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., 2023-2024"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                                <Label htmlFor="isActive">Active Session</Label>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add Session</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {sessions.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-2">No academic sessions found</p>
                        <p className="text-sm text-muted-foreground">Click the "Add Session" button to create a new session</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((session) => (
                        <Card key={session.id} className={session.isActive ? "border-primary" : ""}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle>{session.name}</CardTitle>
                                    {session.isActive && <Badge className="bg-primary">Active</Badge>}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Start Date:</span>
                                        <span>{new Date(session.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">End Date:</span>
                                        <span>{new Date(session.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-2">
                                <Button variant="outline" size="sm" onClick={() => handleEditClick(session)}>
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(session)}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Academic Session</DialogTitle>
                        <DialogDescription>Update the details of this academic session.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSession} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Session Name</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                placeholder="e.g., 2023-2024"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-startDate">Start Date</Label>
                            <Input
                                id="edit-startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-endDate">End Date</Label>
                            <Input
                                id="edit-endDate"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="edit-isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
                            <Label htmlFor="edit-isActive">Active Session</Label>
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
                            Are you sure you want to delete this academic session? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteSession}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
