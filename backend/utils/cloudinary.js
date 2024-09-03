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

export { uploadOnCloudinary };
