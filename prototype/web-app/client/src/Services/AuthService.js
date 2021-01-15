/* eslint-disable import/no-anonymous-default-export */
// Here we store api calls to the login auth
// ContextAPI - Global State
export default {
  login: user => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => data);
  },

  register: user => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => data);
  },

  logout: () => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/register`)
      .then(res => res.json())
      .then(data => data);
  },

  isAuthenticated: () => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/authenticated`)
      .then(res => {
        if (res.status !== 401) {
          return res.json().then(data => data);
        } else {
          return { isAuthenticated: false, user: { username: "", role: "" } };
        }
      })
  }
}