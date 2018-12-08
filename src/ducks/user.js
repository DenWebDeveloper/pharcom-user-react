import http from '../http'
import Cookies from 'js-cookie'
import {history} from '../redux'

import {toastInfo} from '../untils'

export const moduleName = 'user'
export const appName = 'medic'

const _info = `${appName}/${moduleName}`

export const REQUEST_LOGIN_SEND = `${appName}/${moduleName}/REQUEST_LOGIN_SEND`
export const REQUEST_LOGIN_SUCCESS = `${appName}/${moduleName}/REQUEST_LOGIN_SUCCESS`
export const REQUEST_LOGIN_ERROR = `${appName}/${moduleName}/REQUEST_LOGIN_ERROR`

export const CHECK_STATUS_SEND = `${_info}/CHECK_STATUS_SEND`
export const CHECK_STATUS_SUCCESS = `${_info}/CHECK_STATUS_SUCCESS`

const initialState = {
    authStatus: null,
    userAccess: {},
    user: {},
    loading: false
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case REQUEST_LOGIN_SEND:
            return state.set('loading', true).set('error', false)
        case REQUEST_LOGIN_SUCCESS:
            return state.set('loading', false).set('error', false).set('user', payload.user).set('token', payload.token)
        case REQUEST_LOGIN_ERROR:
            return state.set('loading', false).set('error', true)
        default:
            return state
    }
}

// export function login({email, password}) {
//     return dispatch => {
//         dispatch({
//             type: REQUEST_LOGIN_SEND,
//         })
//         http.post('/login', {email, password})
//             .then(res => {
//                 Cookies.set('token', token)
//                 http.defaults.headers.common['Authorization'] = token
//                 dispatch({
//                     type: REQUEST_LOGIN_SUCCESS,
//                     payload: {token: token, user: user}
//                 })
//                 return history.push('/')
//             }).catch(err => {
//                 console.log(err)
//                 const {token, user} = res.data
//                 return dispatch({
//                     type: REQUEST_LOGIN_ERROR,
//                 })
//             })
//     }
// }

export function checkStatus() {
    return dispatch => {
        dispatch({
            type: CHECK_STATUS_SEND,
        })
        http.get('/auth/status')
            .then(res => {
                dispatch({
                    type: CHECK_STATUS_SUCCESS,
                    payload: res.data
                })
            })
    }
}
