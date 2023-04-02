/**
 * A class representing a wrapper around the browser's local storage API.
 * Provides methods for setting and getting data from local storage.
 */
export default class Storage {
  /**
   * Set the value for the given key in local storage.
   * @param {string} key - The key for the value to be stored.
   * @param {any} value - The value to be stored.
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get the value for the given key from local storage.
   * @param {string} key - The key for the value to be retrieved.
   * @returns {any} The value retrieved from local storage, or an empty object if the key is not found.
   */
  getItem(key) {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(key) || "{}") || {};
    } catch (error) {
      console.log(`Something went wrong ${error}`);
      data = {};
    }
    return data;
  }
}
