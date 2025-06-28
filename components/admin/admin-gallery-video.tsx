"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Timestamp } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
// Import video-specific Firebase operations
import { getAllGalleryVideos, addGalleryVideo, deleteGalleryVideo } from "@/firebase/Video-Gallery/Gallery";
import { Trash2, Plus, Upload, PlayCircle } from "lucide-react";
// Import the GalleryVideo type
import { GalleryVideo } from "@/firebase/types/types";
import { useEdgeStore } from '@/lib/edgestore';

// --- VIDEO SIZE LIMIT CONFIGURATION ---
// Choose your desired maximum video size
const MAX_VIDEO_SIZE_MB = 10; // Option 1: 10 MB
// const MAX_VIDEO_SIZE_MB = 4; // Option 2: 4 MB (Uncomment this and comment the above line if you prefer 4MB)

const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024; // Convert MB to Bytes

export default function AdminVideoGallery() {
    const [videos, setVideos] = useState<GalleryVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<GalleryVideo | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null); // For local video preview
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState(""); // This was 'caption' for images, now 'description' for videos
    const { edgestore } = useEdgeStore(); // Your existing edgestore setup

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const allVideos = await getAllGalleryVideos();
            setVideos(allVideos);
        } catch (error) {
            console.error("Error fetching gallery videos:", error);
            toast({
                title: "Error",
                description: "Failed to load gallery videos",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // --- VIDEO SIZE VALIDATION ---
            if (file.size > MAX_VIDEO_SIZE_BYTES) {
                toast({
                    title: "Error",
                    description: `Video file size exceeds the limit of ${MAX_VIDEO_SIZE_MB}MB.`,
                    variant: "destructive",
                });
                setVideoFile(null); // Clear the file
                if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl); // Revoke old preview URL
                setVideoPreviewUrl(null); // Clear the preview
                return;
            }

            setVideoFile(file);
            // Revoke previous URL to prevent memory leaks if user selects multiple files
            if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
            setVideoPreviewUrl(URL.createObjectURL(file)); // Create a local URL for preview
        }
    };

    // This function now uses edgestore directly to upload the video file
    const handleVideoUpload = async (): Promise<string | null> => {
        if (!videoFile) return null;

        setUploadingVideo(true);
        try {
            // Assuming edgestore.publicFiles.upload is configured for video uploads
            // The 'input' object might need to match your edgestore router's specific configuration for videos
            const res = await edgestore.publicFiles.upload({
                file: videoFile,
                // You might need to adjust 'type' and 'folderName' based on your edgestore setup
                // For example, if your router distinguishes between 'image' and 'video'

            });
            return res.url;
        } catch (error) {
            console.error("Error uploading video to Edgestore:", error);
            toast({
                title: "Error",
                description: "Failed to upload video file.",
                variant: "destructive",
            });
            return null;
        } finally {
            setUploadingVideo(false);
        }
    };

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!videoFile) {
            toast({
                title: "Error",
                description: "Please select a video to upload.",
                variant: "destructive",
            });
            return;
        }

        if (!category.trim()) {
            toast({
                title: "Error",
                description: "Please provide a category for the video.",
                variant: "destructive",
            });
            return;
        }

        try {
            const videoUrl = await handleVideoUpload();

            if (videoUrl) {
                await addGalleryVideo({
                    video_url: videoUrl, // Use video_url as per GalleryVideo interface
                    category: category.trim(),
                    description: description.trim(),
                    uploadedAt: Timestamp.now(),
                });

                toast({
                    title: "Success",
                    description: "Video added to gallery successfully",
                });

                setIsAddDialogOpen(false);
                setVideoFile(null);
                if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl); // Revoke URL after successful upload
                setVideoPreviewUrl(null);
                setCategory("");
                setDescription("");
                fetchVideos(); // Refresh the list
            }
        } catch (error) {
            console.error("Error adding gallery video:", error);
            toast({
                title: "Error",
                description: "Failed to add video to gallery",
                variant: "destructive",
            });
        }
    };

    const handleDeleteClick = (video: GalleryVideo) => {
        setCurrentVideo(video);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteVideo = async () => {
        setLoading(true); // Indicate loading while deleting
        if (!currentVideo) return;
        try {
            // You might also need to delete the file from Edgestore here if that's part of your desired flow
            // Example: await edgestore.publicFiles.delete({ url: currentVideo.video_url });
            await deleteGalleryVideo(currentVideo.id);

            toast({
                title: "Success",
                description: "Video deleted successfully",
            });
            setIsDeleteDialogOpen(false);
            fetchVideos(); // Refresh the list
        } catch (error) {
            console.error("Error deleting video:", error);
            toast({
                title: "Error",
                description: "Failed to delete video",
                variant: "destructive",
            });
        } finally {
            setLoading(false); // End loading regardless of success or failure
        }
    };

    // Clean up object URLs when component unmounts or videoPreviewUrl changes
    useEffect(() => {
        return () => {
            if (videoPreviewUrl) {
                URL.revokeObjectURL(videoPreviewUrl);
            }
        };
    }, [videoPreviewUrl]);


    if (loading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Video Gallery</h2>
                    <Button disabled>
                        <Plus className="mr-2 h-4 w-4" /> Add Video
                    </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <div className="aspect-video bg-muted"></div> {/* Changed to aspect-video */}
                            <CardContent className="p-4">
                                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-muted rounded w-1/2"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Video Gallery</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Video</DialogTitle>
                            <DialogDescription>Upload a new video to the school gallery.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddVideo} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="gallery-video-file">Video File</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="gallery-video-file" // Unique ID for video input
                                        type="file"
                                        accept="video/*" // Accept only video files
                                        onChange={handleVideoChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById("gallery-video-file")?.click()}
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" /> Select Video
                                    </Button>
                                </div>
                                {videoPreviewUrl && (
                                    <div className="mt-2">
                                        <video
                                            src={videoPreviewUrl}
                                            controls
                                            className="max-h-60 w-full rounded-md object-cover"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">Max video size: {MAX_VIDEO_SIZE_MB}MB</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="video-category">Category</Label>
                                <Input
                                    id="video-category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="e.g., School Event, Sports Day"
                                    required // Category is required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="video-description">Description (Optional)</Label>
                                <Input
                                    id="video-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter a description for this video"
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={!videoFile || uploadingVideo || !category.trim()}>
                                    {uploadingVideo ? "Uploading..." : "Add to Gallery"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                        <div className="aspect-video relative bg-black flex items-center justify-center text-white">
                            {/* For admin panel, a simple preview or icon might be enough instead of full embed */}
                            <PlayCircle className="h-16 w-16 opacity-75" />
                            {/* If you want to show a playable video directly in the admin grid: */}
                            {/* <video
                src={video.video_url}
                controls
                className="absolute inset-0 w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video> */}
                        </div>
                        <CardContent className="p-4">
                            <p className="text-sm font-semibold truncate">{video.category || "No Category"}</p>
                            <p className="text-xs truncate text-muted-foreground mt-1">{video.description || "No description"}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {video.uploadedAt.toDate().toLocaleDateString()}
                            </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDeleteClick(video)}>
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
                            Are you sure you want to delete this video? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4 flex justify-center">
                        {currentVideo?.video_url && (
                            <video
                                src={currentVideo.video_url}
                                controls
                                className="max-h-40 rounded-md object-cover"
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteVideo}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}