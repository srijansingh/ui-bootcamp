export default class Storage {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

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
