function LogOut({ history }) {
    fetch("/auth/logout")
      .then((res) => res.json(), localStorage.removeItem("userId"))
      .then((res) => {
        history.push("/");
      })
      .catch((err) => console.log(err));
}

export default LogOut;