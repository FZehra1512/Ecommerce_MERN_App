import multer from "multer";

// Set up storage using diskStorage (you can also use memoryStorage if needed)
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix); // cb is called with no error (null) and the generated filename
    }
});

// Set up Multer with the defined storage and specify that it can handle multiple files
export const upload = multer({ storage: storage });
