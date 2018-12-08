import React, {useState, useEffect, Fragment} from 'react'
import {Route, Switch} from 'react-router'

import {connect} from 'react-redux'
import {checkStatus} from '../ducks/user'

import AuthLayout from './AuthLayout'
import Layout from './Layout'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {ConnectedRouter} from 'connected-react-router'


function Routes(props) {
    useEffect(() => {
        props.checkStatus()
    }, [])

    return (
        <Fragment>
            <Switch>
                <Route path='/auth' component={AuthLayout}/>
                <Route path='/' component={Layout}/>
            </Switch>
            <ToastContainer/>
        </Fragment>
    )
}

export default connect(null, {checkStatus})(Routes)
