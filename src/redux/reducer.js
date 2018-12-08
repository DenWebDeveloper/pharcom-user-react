import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer, {moduleName as userModule} from '../ducks/user'


const rootReducer = combineReducers({
    routing: routerReducer,
    [userModule]: userReducer,

})

export default rootReducer
