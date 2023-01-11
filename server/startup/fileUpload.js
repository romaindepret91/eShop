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

export const uploadProductImages = multer({ storage: multerStorage });
