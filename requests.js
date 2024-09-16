/**
 * Mimic a realisting api call
 * @returns {Promise<*[]>}
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
