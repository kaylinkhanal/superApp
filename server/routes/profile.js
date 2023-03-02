const express = require('express')
const router=express.Router()
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assests/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post("/profile", upload.single("avatar"),(req, res)=>{
    try{
        res.status(200).json({
            message: 'uploaded image'
          })
    }catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
      }
})

module.exports=router;