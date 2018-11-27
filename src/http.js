import Cookies from 'js-cookie'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:1111/',
    timeout: 5000,
})

instance.interceptors.request.use(config => {
    const token = Cookies.get('token')
    if (token) config.headers.Authorization = token
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
    return Promise.reject(err)
})

export default instance
