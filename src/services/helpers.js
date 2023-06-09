export const USER_ID = "userId";

export const setLocalStorage = (name, data) => {
  localStorage.setItem(name, data);
};
export const getLocalStorage = (name) => {
  localStorage.getItem(name);
};
export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};
