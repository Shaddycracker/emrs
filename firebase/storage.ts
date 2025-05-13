
export const uploadImage = async (
    file: File,
    edgestore: any,
    path: string,
): Promise<string | null> => {
  if (!file) {
    console.error("No file provided for upload.");
    return null;
  }
  try {
    const res = await edgestore.Achievers.upload({
      file,
      onProgressChange: (progress: number) => {
        console.log(`Upload Progress: ${progress}%`);
      },
    });

    return res.url; // Return the uploaded file URL
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
