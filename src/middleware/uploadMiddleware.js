const multer = require("multer");

console.log("🔥 uploadMiddleware.js loaded");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {

        console.log("📂 File Received:");
        console.log(file.originalname);
        console.log(file.mimetype);
        console.log(file.size);

        cb(null, true);
    }
});

module.exports = upload;