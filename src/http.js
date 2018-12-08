import Cookies from 'js-cookie'
import axios from 'axios'

import {toastCustom} from './untils'

const instance = axios.create({
    baseURL: 'http://localhost:1111/',
    timeout: 4000,
    withCredentials: true
})

instance.interceptors.request.use(config => {
    return config
}, err => {
    // Do something with request error
    return Promise.reject(err)
})


instance.interceptors.response.use(response => {
    return response
}, err => {
    if (err.response && err.response.status === 401) {
        Cookies.remove('token')
        //history.push('/login')
    }
    toastCustom(err.message,'error')
    return Promise.reject(err)
})

export default instance
