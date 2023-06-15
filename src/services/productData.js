import { TOKEN, getHeader, getLocalStorage, setLocalStorage } from "./helpers";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getAll(page, category, query) {
  if (query !== "" && query !== undefined) {
    return (
      await fetch(`${baseUrl}/products?page=${page}&search=${query}`, {
        credentials: "include",
      })
    ).json();
  } else if (category && category !== "all") {
    return (
      await fetch(`${baseUrl}/products/${category}?page=${page}`, {
        credentials: "include",
      })
    ).json();
  } else {
    return (
      await fetch(`${baseUrl}/products?page=${page}`, {
        credentials: "include",
      })
    ).json();
  }
}

export async function getSpecific(id) {
  return (
    await fetch(`${baseUrl}/products/specific/${id}`, {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}

export async function createProduct(product) {
  return (
    await fetch(`${baseUrl}/products/create`, {
      method: "POST",
      headers: getHeader(),
      credentials: "include",
      body: JSON.stringify(product),
    })
  ).json();
}

export async function editProduct(id, product) {
  return (
    await fetch(`${baseUrl}/products/edit/${id}`, {
      method: "PATCH",
      headers: getHeader(),
      credentials: "include",
      body: JSON.stringify(product),
    })
  ).json();
}

export async function activateSell(id) {
  return (await fetch(`${baseUrl}/products/enable/${id}`)).json();
}

export async function archiveSell(id) {
  return (await fetch(`${baseUrl}/products/archive/${id}`)).json();
}

export async function wishProduct(id) {
  return (
    await fetch(`${baseUrl}/products/wish/${id}`, {
      headers: getHeader(),
      credentials: "include",
    })
  ).json();
}
