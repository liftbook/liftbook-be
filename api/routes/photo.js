//IMPORTS
const express = require("express");
const multer = require("multer");

//SETUP
const router = express.Router();

// MULTER
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

router.post("/upload", (req, res, next) => {
  const upload = multer({ storage }).single("name-of-input-key");
  upload(req, res, function(err) {
    if (err) {
      return res.send(err);
    }
    res.json(req.file);
    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "liftbook",
      api_key: "478555327836351",
      api_secret: "nm-J2_h44bOMwNrGciAEND4r5bo"
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        res.json(image);
      }
    );
  });
});

//EXPORTS
module.exports = router;
