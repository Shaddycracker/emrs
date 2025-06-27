"use client";

import React, { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import type { Staff } from "@/firebase/types/types";
import {
    getAllStaff,
    addStaff,
    updateStaff,
    deleteStaff,
} from "@/firebase/staff/staff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

export default function AdminStaff() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setAddOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
    const [formData, setFormData] = useState<Omit<Staff, "id">>({
        name: "",
        imageUrl: "",
        Designation: "",
        dateOfJoin: Timestamp.now(),
        employeeCode: "",
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    async function fetchStaff() {
        setLoading(true);
        try {
            const data = await getAllStaff();
            setStaffList(data);
        } catch {
            toast({ title: "Error", description: "Failed to load staff", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await addStaff({ ...formData, dateOfJoin: Timestamp.now() });
            toast({ title: "Success", description: "Staff added" });
            setAddOpen(false);
            fetchStaff();
        } catch {
            toast({ title: "Error", description: "Add failed", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }

    function onEditClick(staff: Staff) {
        setCurrentStaff(staff);
        setFormData({
            name: staff.name,
            imageUrl: staff.imageUrl,
            Designation: staff.Designation,
            dateOfJoin: staff.dateOfJoin,
            employeeCode: staff.employeeCode,
        });
        setEditOpen(true);
    }

    async function handleEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!currentStaff) return;
        setLoading(true);
        try {
            await updateStaff(currentStaff.id, { ...formData, dateOfJoin: Timestamp.now() });
            toast({ title: "Success", description: "Staff updated" });
            setEditOpen(false);
            fetchStaff();
        } catch {
            toast({ title: "Error", description: "Update failed", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!currentStaff) return;
        setLoading(true);
        try {
            await deleteStaff(currentStaff.id);
            toast({ title: "Deleted", description: "Staff removed" });
            setDeleteOpen(false);
            fetchStaff();
        } catch {
            toast({ title: "Error", description: "Delete failed", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Staff</h2>
                    <Button disabled><Plus size={16} /> Add Staff</Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader><CardTitle className="bg-muted h-6 w-3/4 rounded" /></CardHeader>
                            <CardContent><div className="h-4 bg-muted rounded mb-2" /><div className="h-4 bg-muted rounded w-1/2" /></CardContent>
                            <CardFooter><div className="h-8 bg-muted rounded w-full" /></CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Staff</h2>

                <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild><Button><Plus size={16} /> Add Staff</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Add Staff</DialogTitle></DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4">
                            {["name", "imageUrl", "Designation", "employeeCode"].map((field) => (
                                <div key={field} className="space-y-2">
                                    <Label htmlFor={field}>{field.replace(/([A-Z])/g, " $1").trim()}</Label>
                                    <Input id={field} name={field} value={(formData as any)[field]} onChange={handleChange} required />
                                </div>
                            ))}
                            <DialogFooter><Button type="submit">Add</Button></DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {staffList.map((staff) => (
                    <Card key={staff.id}>
                        <CardHeader>
                            <CardTitle>{staff.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {format(staff.dateOfJoin.toDate(), "dd MMM yyyy")}
                            </p>
                        </CardHeader>

                        <CardContent>
                            <img src={staff.imageUrl} alt={staff.name} className="h-24 w-24 rounded-full mx-auto mb-4 object-cover" />
                            <p>{staff.Designation}</p>
                            <p className="text-sm text-gray-600">Code: {staff.employeeCode}</p>
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => onEditClick(staff)}>
                                <Pencil size={16} /> Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => { setCurrentStaff(staff); setDeleteOpen(true); }}>
                                <Trash2 size={16} /> Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Edit Staff</DialogTitle></DialogHeader>
                    <form onSubmit={handleEdit} className="space-y-4">
                        {["name", "imageUrl", "Designation", "employeeCode", "position"].map((field) => (
                            <div key={field} className="space-y-2">
                                <Label htmlFor={`edit-${field}`}>{field.replace(/([A-Z])/g, " $1").trim()}</Label>
                                <Input id={`edit-${field}`} name={field} value={(formData as any)[field]} onChange={handleChange} required />
                            </div>
                        ))}
                        <DialogFooter><Button type="submit">Save</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Delete?</DialogTitle></DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
