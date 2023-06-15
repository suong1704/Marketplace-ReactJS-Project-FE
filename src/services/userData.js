import { TOKEN, USER_ID, getHeader, getLocalStorage, setLocalStorage } from "./helpers";

const baseUrl = process.env.REACT_APP_BASE_URL;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getLocalStorage(TOKEN)}`,
};

export async function registerUser(userData) {
  const data = {
    email: userData.email,
    password: userData.password,
    username: userData.name,
    phoneNumber: userData.phoneNumber,
    repeatPassword: userData.repeatPassword,
    gender: userData.gender,
    lastName: userData.lastName,
  };
  const user = (
    await fetch(`${baseUrl}/auth/registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
  ).json();
  return user;
}

export async function loginUser(user) {
  const data = { identifier: user.email, password: user.password };
  console.log(JSON.stringify(data));
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
      setLocalStorage(TOKEN, res.jwt);
      setLocalStorage(USER_ID, res.user.id);
      console.log(getLocalStorage(TOKEN));
      return {
        user: { _id: res.user.id, ...res.user },
      };
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
    await fetch(baseUrl + "/user/getUser", {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}

export async function getUserActiveSells(id) {
  return (
    await fetch(`${baseUrl}/products/sells/active/${id}`, {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}

export async function getUserArchivedSells() {
  return (
    await fetch(`${baseUrl}/products/sells/archived`, {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}

export async function getUserWishlist() {
  return (
    await fetch(`${baseUrl}/products/wishlist/getWishlist`, {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}

export async function editUserProfile(id, data) {
  return (
    await fetch(`${baseUrl}/user/edit-profile/${id}`, {
      method: "PUT",
      headers: getHeader(),
      credentials: "include",
      body: JSON.stringify(data),
    })
  ).json();
}

export async function getUserById(id) {
  return await (
    await fetch(baseUrl + `/user/getUserById/${id}`, {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}
