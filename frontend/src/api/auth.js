import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export function register(data) {
    return API.post('/auth/register', data)
}

export function login(data) {
    return API.post('/auth/login', data)
}