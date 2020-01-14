export const storage = {
  get: (key) => {
    let value;
    try {
      value = JSON.parse(localStorage.getItem(key));
    } catch (e) {}
    return value;
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
};
