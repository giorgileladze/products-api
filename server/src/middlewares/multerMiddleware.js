import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
    destination: './uploads/'
  })
  
const upload = multer({ storage: storage})

export default upload;