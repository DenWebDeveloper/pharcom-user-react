import React from 'react'
import {Route, Switch} from 'react-router'
import AuthLayout from './AuthLayout'


export default () => {
    return (
        <Switch>
            <Route path='/auth' component={AuthLayout}/>
        </Switch>
    )
}
