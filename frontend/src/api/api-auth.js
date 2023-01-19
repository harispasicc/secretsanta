const signin = (user) => {
  return fetch(`/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const signout = () => {
  return fetch(`/api/users/logout`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const register = (user) => {
  return fetch(`/api/users/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const isAuthenticated = () => {
  return fetch(`/api/users/isAuthenticated`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  })
    .then((response) => {
      const user = response.json();
      return user;
    })
    .catch((err) => console.log(err));
};

const confirmPassword = (confirmPass) => {
  return fetch(`/api/users/password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(confirmPass),
  })
    .then((response) => {
      const data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};

export { signin, signout, register, isAuthenticated, confirmPassword };
