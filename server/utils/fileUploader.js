const fs = require("fs");
const multer = require("multer");

const fileUploader = (field, folder) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const dirs = `${process.cwd()}/server/public/${folder}`;
      if (!fs.existsSync(dirs)) {
        fs.mkdirSync(dirs);
      }
      cb(null, `./server/public/${folder}`);
    },
    filename(req, file, cb) {
      console.log("---- mime test -----");
      console.log(file);
      console.log("---- mime test -----");
      cb(null, `${Date.now()}+${file.originalname.replace(" ", "_")}`);
    },
  });

  // const fileFilter = (req, file, cb) => {
  //   if (
  //     file.mimetype === "image/jpeg" ||
  //     file.mimetype === "image/png" ||
  //     file.mimetype === "image/jpg" ||
  //     file.mimetype === "application/pdf"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     req.validationError = "file not supported";
  //     cb(null, false);
  //   }
  // };

  const upload = multer({
    storage,
    // fileFilter,
  });

  return upload.single(field);
};



const fileRemove = (file, folder) => {
  const dir = `${process.cwd()}/server/public/${folder}`;
  return new Promise((res, rej) => {
    if (!fs.existsSync(dir)) {
     rej({status: 'err'})
    }
    fs.unlink(`${dir}/${file}`, (err) => {
      if (err) {
        console.error(err)
        rej({status: 'err'})
      }
      res({status: 'ok'})
    })

  })
}

module.exports = { fileUploader, fileRemove };
