import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export function getPins() {
    return API.get('/pins')
}

export function getPin(id) {
    return API.get(`/pins/${id}`)
}

export function createPin(data, token) {
    return API.post('/pins', data, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

export function deletePin(id, token) {
    return API.delete(`/pins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}