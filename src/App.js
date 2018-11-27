import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import  store,{history} from './redux'
import Routes from './routes'

import 'typeface-roboto'
import './App.css'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes/>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App
