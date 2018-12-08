import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import reducer from './reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import history from '../history'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancer(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
            logger
        ),
    ),
)

export default store
