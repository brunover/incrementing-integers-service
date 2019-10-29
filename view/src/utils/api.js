const axios = require("axios")

// Token will be provided by OAuth in the future
let token = localStorage.token
if (!token) {
  token = localStorage.token = "1234567"
}

// Axios instance configuration for the main api
const protocol = window.location.protocol
const hostname = window.location.hostname
const api = axios.create({
  baseURL: `${protocol}//${hostname}/api/v1`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`
  }
})

// -------------------------------------
// USERS API
export const getInteger = id => api.get(`/users/${id}/next`).then(res => res)

export const getUser = body => {
  return api.post(`/users/fetch`, body).then(res => res)
}

export const patchInteger = (id, body) => {
  return api.patch(`/users/${id}/current`, body).then(res => res)
}
