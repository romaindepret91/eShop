import fs from "fs";
import { promisify } from "util";

/**
 * Remove product files from server
 * @param {array} files array of the product files to be deleted
 */
export const removeProductFiles = async (files) => {
  const removeFilesAsync = promisify(fs.unlink);
  await Promise.all(
    files.map(async (file) => {
      removeFilesAsync(file.path);
    })
  );
};
