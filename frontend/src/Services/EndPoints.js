import axios from 'axios'
export const BaseUrl = 'http://localhost:8000'

const instance = axios.create({
    baseURL: BaseUrl,
    withCredentials: true   // to accpet & send cookies from backend
})

export const get = (url, params)=> instance.get(url, {params})
export const post = (url, data)=> instance.post(url, data)
export const patch = (url, data)=> instance.patch.apply(url, data)
export const dele = (url)=> instance.delete(url)