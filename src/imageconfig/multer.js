import multer from "multer"
import  fs from "fs";
import path from 'path';

// Multer config
/*module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !==".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
        return;
        }
        cb(null, true);
    }
});*/
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}
  
// Multer setup
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
