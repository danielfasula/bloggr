import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? 'https://localhost:5001/' : ''
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const sandboxApi = Axios.create({
  // baseURL: 'https://bcw-sandbox.herokuapp.com/',
  baseURL,
  timeout: 10000
})

export const setBearer = function (bearer) {
  api.defaults.headers.authorization = bearer
  sandboxApi.defaults.headers.authorization = bearer
}

export const resetBearer = function () {
  api.defaults.headers.authorization = ''
  sandboxApi.defaults.headers.authorization = ''
}
