"use client"

import React, { useEffect, useState } from "react"
import { Committee } from "@/firebase/types/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
    getAllCommittees,
    addCommittee,
    updateCommittee,
    deleteCommittee,
} from "@/firebase/commitee/commitee"
import { Pencil, Trash2, Plus } from "lucide-react"

export default function AdminCommittees() {
    const [committees, setCommittees] = useState<Committee[]>([])
    const [loading, setLoading] = useState(true)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentCommittee, setCurrentCommittee] = useState<Committee | null>(null)
    const [formData, setFormData] = useState<Committee>({ id: "", name: "", designation: "" })

    useEffect(() => {
        fetchCommittees()
    }, [])

    const fetchCommittees = async () => {
        setLoading(true)
        try {
            const all = await getAllCommittees()
            setCommittees(all)
        } catch (error) {
            console.error("Error fetching committees:", error)
            toast({ title: "Error", description: "Failed to load committees", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddCommittee = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await addCommittee({ ...formData })
            toast({ title: "Success", description: "Committee added successfully" })
            setIsAddDialogOpen(false)
            setFormData({ id: "", name: "", designation: "" })
            fetchCommittees()
        } catch (error) {
            console.error("Error adding committee:", error)
            toast({ title: "Error", description: "Failed to add committee", variant: "destructive" })
        }
    }

    const handleEditClick = (committee: Committee) => {
        setCurrentCommittee(committee)
        setFormData(committee)
        setIsEditDialogOpen(true)
    }

    const handleEditCommittee = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentCommittee) return
        try {
            await updateCommittee(currentCommittee.id, formData)
            toast({ title: "Success", description: "Committee updated successfully" })
            setIsEditDialogOpen(false)
            fetchCommittees()
        } catch (error) {
            console.error("Error updating committee:", error)
            toast({ title: "Error", description: "Failed to update committee", variant: "destructive" })
        }
    }

    const handleDeleteClick = (committee: Committee) => {
        setCurrentCommittee(committee)
        setIsDeleteDialogOpen(true)
    }

    const handleDeleteCommittee = async () => {
        if (!currentCommittee) return
        try {
            await deleteCommittee(currentCommittee.id)
            toast({ title: "Success", description: "Committee deleted successfully" })
            setIsDeleteDialogOpen(false)
            fetchCommittees()
        } catch (error) {
            console.error("Error deleting committee:", error)
            toast({ title: "Error", description: "Failed to delete committee", variant: "destructive" })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Committees</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Committee</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Committee</DialogTitle>
                            <DialogDescription>Enter name and designation of the committee member.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddCommittee} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="designation">Designation</Label>
                                <Input id="designation" name="designation" value={formData.designation} onChange={handleChange} required />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {committees.map((committee) => (
                    <Card key={committee.id}>
                        <CardHeader>
                            <CardTitle>{committee.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{committee.designation}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleEditClick(committee)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(committee)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Committee</DialogTitle>
                        <DialogDescription>Modify the name or designation.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditCommittee} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-designation">Designation</Label>
                            <Input id="edit-designation" name="designation" value={formData.designation} onChange={handleChange} required />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this committee member?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteCommittee}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
