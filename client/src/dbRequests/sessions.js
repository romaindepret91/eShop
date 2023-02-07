import axios from "axios";

/**
 * Log in user
 * @returns {Promise} Promise object represents the user logged in
 */
export async function logging() {
  return await axios.get(`/login`, {});
}
