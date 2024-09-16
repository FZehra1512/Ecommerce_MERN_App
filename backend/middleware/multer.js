import multer from "multer";

// Set up storage using diskStorage (you can also use memoryStorage if needed)
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix); // cb is called with no error (null) and the generated filename
    }
});

// Set up Multer with the defined storage and specify that it can handle multiple files
export const upload = multer({ storage }).array('productImg', 5); // 'productImg' is the field name; 5 is the max number of images
export const categoryUpload = multer({ storage: storage }).single("categoryImg");



// import multer from "multer";
// import path from "path";

// // Define storage for the images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Set destination to 'uploads' folder
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     // Set file name with original name and timestamp to avoid collisions
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Create multer instance with storage configuration
// const upload = multer({ storage: storage });

// export default upload;
