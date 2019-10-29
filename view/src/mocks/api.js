const axios = require("axios")

// Token for the mock server is just a random string
let token = localStorage.token
if (!token) token = localStorage.token = "123456"

// Axios instance configuration for the mock api
const protocol = window.location.protocol
const hostname = window.location.hostname
const api = axios.create({
  baseURL: `${protocol}//${hostname}:5001`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
})

// -------------------------------------
// FOLDERS API
export const getAllFolders = () =>
  api.get(`/folders`).then(res => res.data.folders)

export const removeFolder = id =>
  api.delete(`/folders/${id}`).then(res => res.data.folder)

export const createFolder = body =>
  api.post(`/folders`, JSON.stringify(body)).then(res => res.json())

// -------------------------------------
// REPOS API
export const getAllRepos = () => api.get(`/repos`).then(res => res.data.repos)

export const getRepo = id => api.get(`/repos/${id}`).then(res => res.data)

export const removeRepo = repo =>
  api.delete(`/repos/${repo.id}`).then(res => res.data.repo)

export const createRepo = body =>
  api.post(`/repos`, JSON.stringify(body)).then(res => res.json())

// -------------------------------------
// DISCOVERIES API
export const getDiscoveries = id =>
  api.get(`/discoveries/${id}`).then(res => res.data.discoveries)

// -------------------------------------
// SCANS API
export const getScans = id =>
  api.get(`/scans/${id}`).then(res => res.data.scans)

// -------------------------------------
// RULES API
export const getAllRules = () => api.get(`/rules`).then(res => res.data.rules)

export const removeRule = id =>
  api.delete(`/rules/${id}`).then(res => res.data.rule)

export const createRule = body =>
  api.post(`/rules`, JSON.stringify(body)).then(res => res.json())
