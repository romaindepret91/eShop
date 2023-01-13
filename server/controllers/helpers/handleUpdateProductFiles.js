import fs from "fs";
import _ from "lodash";
import { removeProductFiles } from "./removeProductFiles.js";

/**
 * Handle the import of images files: redefine path if necessary (on first upload) and store images paths in returned array or replace images on update
 * @param {object} files Files sent in req.files object
 * @param {object} product Product object
 * @param {bollean} onUpload Determine the behaviour of function
 * @returns images: array containing the images paths
 */
export const handleUpdateProductFiles = (files, product, onUpload) => {
  let images = [];
  let i = 1;
  if (onUpload) {
    // Remodel images property of product
    for (let image in files) {
      const imageObject = files[image][0];
      // Extract and redefine file path and field name
      let imageKey = imageObject["fieldname"];
      let imagePath = imageObject["path"];
      // Replace the image field number received by ordered numbers (i)
      imageKey = imageKey.replace(/.$/, i);
      // Redefine the image path
      imagePath = imagePath.replace(
        imagePath.substring(
          imagePath.indexOf("."),
          imagePath.indexOf(".") - 14
        ),
        ""
      ); // Delete timestamp
      imagePath = imagePath.replace(
        imagePath.substring(imagePath.indexOf("."), imagePath.indexOf(".") - 6),
        `image${i}`
      ); // Replace image numbers with ordered numbers (i)
      imagePath = imagePath.split("-");
      imagePath.splice(2, 0, product._id.toString()); // Add product id to file path
      imagePath = imagePath.join("-"); // New file path
      const newImageObject = { [imageKey]: imagePath };
      images.push(newImageObject);
      fs.renameSync(imageObject["path"], imagePath); // Rename file in public directory
      i++;
    }
  } else {
    const nbOfImagesinDB = product.images.length; // number of images in database
    const nbOfImagesReceived = _.size(files); // number of images received
    // Case where number of images received is superior to number of images in DB, meaning all files are to be updated and potentially some to be added
    if (nbOfImagesReceived >= nbOfImagesinDB)
      return handleUpdateProductFiles(files, product, true);
    // Reprocess files as if it was a insertion (true as last argument)
    // Case where the number of images received is inferior to the number of images in DB: some treatment is required
    else {
      for (let image in files) {
        const imageObject = files[image][0];
        // Extract and redefine file path and field name
        const imageKey = imageObject["fieldname"];
        let imagePath;
        // Check if image reveived is actually in database: search for its key
        let isImageinDB = false;
        product.images.forEach((image) => {
          if (imageKey in image) {
            imagePath = image[imageKey];
            return (isImageinDB = true);
          }
        });
        if (!isImageinDB) {
          removeProductFiles(files, true);
          throw new Error(
            `Image "${imageKey}" not found. Update of all images aborted.`
          );
        }
        fs.renameSync(imageObject["path"], imagePath); // Rename file in public directory
      }
      images = product.images;
    }
  }
  return images;
};
