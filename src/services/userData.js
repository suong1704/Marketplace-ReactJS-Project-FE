import { USER_ID, getLocalStorage, setLocalStorage } from "./helpers";

const baseUrl = "http://localhost:1337/api";
// tao localstorage khi login
// lay localstorage gắn vào header với property authorization với content Bear token
// localStorage.setItem("userId", res.user.id);
// viet ham set localstorage truyen cai name
// lay localstorage by name
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getLocalStorage(USER_ID)}`,
  },
};

export async function registerUser(userData) {
  return (
    await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    })
  ).json();
}

export async function loginUser(userData) {
  const data = { identifier: userData.email, password: userData.password };
  return (
    await fetch(baseUrl + `/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
  )
    .json()
    .then((res) => {
      setLocalStorage(USER_ID, res.jwt);
      return res;
    })
    .catch((err) => {
      return {
        error: {
          message: err,
        },
      };
    });
}

export async function getUser() {
  return await (
    await fetch(baseUrl + "/auth/getUser", { headers, credentials: "include" })
  ).json();
}

export async function getUserActiveSells(id) {
  return (
    await fetch(`${baseUrl}/products/sells/active/${id}`, {
      headers,
      credentials: "include",
    })
  ).json();
}

export async function getUserArchivedSells() {
  return (
    await fetch(`${baseUrl}/products/sells/archived`, {
      headers,
      credentials: "include",
    })
  ).json();
}

export async function getUserWishlist() {
  return (
    await fetch(`${baseUrl}/products/wishlist/getWishlist`, {
      headers,
      credentials: "include",
    })
  ).json();
}

export async function editUserProfile(id, data) {
  return (
    await fetch(`${baseUrl}/user/edit-profile/${id}`, {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(data),
    })
  ).json();
}

export async function getUserById(id) {
  return await (
    await fetch(baseUrl + `/user/getUserById/${id}`, {
      headers,
      credentials: "include",
    })
  ).json();
}
