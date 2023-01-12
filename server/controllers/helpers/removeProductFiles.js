import fs from "fs";
import { promisify } from "util";
import { logger } from "../../logs/logger.js";

/**
 * Remove product files from server
 * @param {array} files array of the product files to be deleted
 */
export const removeProductFiles = async (files) => {
  try {
    const removeFilesAsync = promisify(fs.unlink);
    await Promise.all(
      files.map(async (file) => {
        if (fs.existsSync(file.path || file))
          removeFilesAsync(file.path || file);
      })
    );
  } catch (err) {
    logger.log(err.message);
  }
};
