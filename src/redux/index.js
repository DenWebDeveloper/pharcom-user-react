import {applyMiddleware, compose, createStore} from 'redux'
import {createHashHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import rootReducer from './reducers'

export const history = createHashHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer(history),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
        ),
    ),
)

export default store
