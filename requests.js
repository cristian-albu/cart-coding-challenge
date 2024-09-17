/**
 * @typedef T_Product
 * @type {object}
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {"cat 1" | "cat 2" | "cat 3"} category
 */

/**
 * Mimic a realisting api call
 * @returns {Promise<T_Product[]>}
 */
export default async function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch("products.json");
        const data = await res.json();
        resolve(data);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    }, 500);
  });
}
