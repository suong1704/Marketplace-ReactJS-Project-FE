import {
  TOKEN,
  getLocalStorage,
  removeLocalStorage,
} from "../services/helpers";

const baseUrl = process.env.REACT_APP_BASE_URL;

function LogOut({ history }) {
  fetch(`${baseUrl}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorage(TOKEN)}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      history.push("/");
      removeLocalStorage();
      
    })
    .catch((err) => console.log(err));
}

export default LogOut;
