import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {moduleName} from '../ducks/user'


function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                rest.authStatus ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth/singin',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}

export default connect(state => ({
    authStatus: state[moduleName].authStatus,
}))(PrivateRoute)
