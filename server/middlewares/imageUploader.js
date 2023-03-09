const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/uploads')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname.split('.')[0] + '_' + Math.ceil(Math.random() * 123232) + '.' + file.mimetype.split('/')[1])
        console.log('jkj', req.body.senderId)
    }
})

const orderImageUpload = multer({ storage: storage }).single('imageFile')

exports.orderImageUpload = orderImageUpload;