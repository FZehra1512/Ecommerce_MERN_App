import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localPath) => {
    try {
        if (!localPath) {
            console.log("Invalid file path provided to Cloudinary: ", localPath);
            return null;
        }
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto",
        });
        console.log("File successfully uploaded to Cloudinary: ", response.url);
        return response.url;
    } catch (error) {
        console.log("Error uploading file to Cloudinary:", error);
        throw error;
    }
};

// TODO: Confirm the following function is correct or public id is correct
// TODO: confirm no  need for multer for deletion
// Function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("File successfully deleted from Cloudinary", result);
    return result; // result.result will be 'ok' if successfully deleted
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Failed to delete image.");
  }
}

export { uploadOnCloudinary, deleteFromCloudinary };
