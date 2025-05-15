"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from "@/firebase/Inquiry/Inquiry"
import { Eye, Trash2, Check, X } from "lucide-react"

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentInquiry, setCurrentInquiry] = useState<any>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const allInquiries = await getAllInquiries()
      setInquiries(allInquiries)
    } catch (error) {
      console.error("Error fetching inquiries:", error)
      toast({
        title: "Error",
        description: "Failed to load inquiries",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewClick = (inquiry: any) => {
    setCurrentInquiry(inquiry)
    setIsViewDialogOpen(true)
  }

  const handleDeleteClick = (inquiry: any) => {
    setCurrentInquiry(inquiry)
    setIsDeleteDialogOpen(true)
  }

  const handleStatusChange = async (id: string, status: "pending" | "resolved" | "rejected") => {
    try {
      await updateInquiryStatus(id, status)
      toast({
        title: "Success",
        description: `Inquiry marked as ${status}`,
      })
      setIsViewDialogOpen(false)
      fetchInquiries()
    } catch (error) {
      console.error("Error updating inquiry status:", error)
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      })
    }
  }

  const handleDeleteInquiry = async () => {
    try {
      await deleteInquiry(currentInquiry.id)
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      })
      setIsDeleteDialogOpen(false)
      fetchInquiries()
    } catch (error) {
      console.error("Error deleting inquiry:", error)
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
            <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-500"
            >
              Pending
            </Badge>
        )
      case "resolved":
        return (
            <Badge
                variant="outline"
                className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-500"
            >
              Resolved
            </Badge>
        )
      case "rejected":
        return (
            <Badge
                variant="outline"
                className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-500"
            >
              Rejected
            </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Manage Inquiries</h2>
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
          <h2 className="text-2xl font-bold">Manage Inquiries</h2>
          <div className="flex gap-2">
            <Badge className="bg-muted text-foreground">{inquiries.length} Total</Badge>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
              {inquiries.filter((i) => i.status === "pending").length} Pending
            </Badge>
          </div>
        </div>

        {inquiries.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground mb-2">No inquiries found</p>
                <p className="text-sm text-muted-foreground">When visitors submit inquiries, they will appear here</p>
              </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inquiries.map((inquiry) => (
                  <Card
                      key={inquiry.id}
                      className={inquiry.status === "pending" ? "border-yellow-300 dark:border-yellow-800" : ""}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <CardDescription className="flex flex-col">
                        <span>{inquiry.email}</span>
                        <span>{inquiry.phone}</span>
                        <span className="text-xs mt-1">{new Date(inquiry.submittedAt).toLocaleString()}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="line-clamp-3 text-sm">{inquiry.message}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewClick(inquiry)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(inquiry)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
              ))}
            </div>
        )}

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
              <DialogDescription>View and manage the inquiry from {currentInquiry?.name}.</DialogDescription>
            </DialogHeader>
            {currentInquiry && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium">Status</h4>
                      <div className="mt-1">{getStatusBadge(currentInquiry.status)}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Submitted</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(currentInquiry.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm">{currentInquiry.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm">{currentInquiry.phone}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm">{currentInquiry.email}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Message</h4>
                    <p className="text-sm mt-1 p-3 bg-muted rounded-md">{currentInquiry.message}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Actions</h4>
                    <div className="flex gap-2">
                      <Button
                          variant="outline"
                          className="flex-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-500 dark:hover:bg-green-900/50"
                          onClick={() => handleStatusChange(currentInquiry.id, "resolved")}
                      >
                        <Check className="mr-2 h-4 w-4" /> Mark Resolved
                      </Button>
                      <Button
                          variant="outline"
                          className="flex-1 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-500 dark:hover:bg-red-900/50"
                          onClick={() => handleStatusChange(currentInquiry.id, "rejected")}
                      >
                        <X className="mr-2 h-4 w-4" /> Reject
                      </Button>
                    </div>
                    {currentInquiry.status !== "pending" && (
                        <Button
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-500 dark:hover:bg-yellow-900/50"
                            onClick={() => handleStatusChange(currentInquiry.id, "pending")}
                        >
                          Reset to Pending
                        </Button>
                    )}
                  </div>
                </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this inquiry? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteInquiry}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
