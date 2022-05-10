import multer from "multer";
import fs from "fs";
import path from 'path';

// Let us start uploading
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

//Set up
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });
export default upload;