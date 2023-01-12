import fs from "fs";
import { promisify } from "util";
import { logger } from "../../logs/logger.js";

/**
 * Remove product files from server
 * @param {array} files array of the product files to be deleted
 */
export const removeProductFiles = async (files, onUpload) => {
  try {
    const removeFilesAsync = promisify(fs.unlink);
    if (onUpload) {
      for (let image in files) {
        const imageObject = files[image][0];
        if (fs.existsSync(imageObject["path"]))
          removeFilesAsync(imageObject["path"]);
      }
    } else {
      files.map((file, index) => {
        const key = `image${index + 1}`;
        if (fs.existsSync(file[key])) removeFilesAsync(file[key]);
      });
    }
  } catch (err) {
    logger.log(err.message);
  }
};
