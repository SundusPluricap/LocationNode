import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products'); // Set the destination folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Rename the file to avoid overwriting files with the same name
    }
});

export const upload = multer({ storage: storage });
