import multer from "multer";
import mkdirp from "mkdirp";

/**
 * Define options for storing images: destination folder and file name
 */
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    mkdirp.sync("public/uploads/"); // Create directory id does not exist
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    mkdirp.sync(`public/uploads/users/user-${req.user._id}/products`); // Create directory id does not exist
    cb(
      null,
      `users/user-${req.user._id}/products/product-${
        file.fieldname
      }-${Date.now()}.${ext}`
    );
  },
});

/**
 * Filter files before uploading: check for valid extension
 *
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 */
const multerFilter = (req, file, cb) => {
  const validExtensions = ["jpeg", "jpg", "png", "webp"];
  console.log(file);
  const ext = file.mimetype.split("/")[1];
  const extIsValid = validExtensions.indexOf(ext) > -1;
  extIsValid
    ? cb(null, true)
    : cb(
        new Error(
          "Unvalid file type. Valid file extensions: jpg, jpeg, png, webp"
        ),
        false
      );
};

export const uploadFiles = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, // File size limited to 1MB
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
  { name: "image6", maxCount: 1 },
  { name: "image7", maxCount: 1 },
  { name: "image8", maxCount: 1 },
]);
