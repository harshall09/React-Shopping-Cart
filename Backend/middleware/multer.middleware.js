import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../Images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload an image file"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  onError: function (err, next) {
    console.error("Multer error:", err);
    next(err);
  },
});

export default upload;
