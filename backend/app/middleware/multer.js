const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("callininggg")
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    console.log("file.originalname",file)
      cb(null, file.originalname)
  }
})

let uploadFile = multer({
  storage: storage,
});

module.exports = {
  uploadFile
}