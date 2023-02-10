import axios from "axios";

/**
 * Retrieve all products in the catalogue from the db
 * @returns {Promise} Promise object represents all the products of the catalogue
 */
export async function getAllProducts() {
  return await axios.get(`/api/products`);
}

/**
 * Retrieve product with gievn slug and id from database
 * @param {string} slug product slug
 * @param {string} id product id
 * @returns
 */
export async function getOneProduct(slug, id) {
  return await axios.get(`/api/products/${slug}?id=${id}`);
}

export async function updateProductStock(id, stock) {
  return await axios.put(`/api/products/updateStock/${id}`, stock);
}
