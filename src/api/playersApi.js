import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const getPlayerDetail = async (id) => {
    const res = await api.get(`/player/${id}`)
    return res.data
}

export const getAllPlayersList = async () => {
    const res = await api.get(`/player`)
    return res.data
}

export const getOrgPlayersList = async (org) => {
    const res = await api.get(`/${org}`)
    return res.data
}

