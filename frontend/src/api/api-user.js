const create = (user) => {
  return fetch(`/api/users/`, {
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

const list = () => {
  return fetch(`/api/users`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const read = (params, token) => {
  return fetch(`/api/users/${params.userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const update = (params, token, user) => {
  return fetch(`/api/users/${params.userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const remove = (params, token) => {
  return fetch(`/api/users/${params.userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const requestForgotPassword = (email) => {
  return fetch(`/api/users/forgot-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const resetPassword = ({ uuid, password }) => {
  return fetch(`/api/users/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid: uuid, password: password }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
export {
  create,
  list,
  read,
  update,
  remove,
  requestForgotPassword,
  resetPassword,
};
