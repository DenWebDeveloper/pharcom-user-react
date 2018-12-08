import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router} from 'react-router'
import  store from './redux'
import history from './history'
import Routes from './routes'

import 'typeface-roboto'
import './App.css'

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Routes/>
                </Router>
            </Provider>
        )
    }
}

export default App
