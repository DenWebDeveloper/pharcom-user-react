import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
    //count: counterReducer,
    router: connectRouter(history)
})

export default rootReducer
