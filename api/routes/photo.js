//IMPORTS
const express = require('express')
const multer = require('multer')

//SETUP
const router = express.Router()

// UPLOAD STUFF
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      console.log(file)
      cb(null, file.originalname)
    }
  })


router.post('/upload', (req, res, next) => {
    const upload = multer({ storage }).single('name-of-input-key')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      res.json(req.file)
    })
  })
  

//EXPORTS
module.exports = router;
