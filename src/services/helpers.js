export const USER_ID = "userId";
export const TOKEN = "TOKEN";

export const setLocalStorage = (name, data) => {
  localStorage.setItem(name, data);
};
export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
  
};
export const removeLocalStorage = () => {
  localStorage.clear();
};
export const getHeader = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getLocalStorage(TOKEN)}`,
  };
};
