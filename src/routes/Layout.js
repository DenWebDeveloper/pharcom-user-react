import React,{Fragment} from 'react'
import {Route, Switch} from 'react-router'

import PrivatRoute from '../components/PrivatRoute'

import Home from '../views/Home'

export  default ({match})=>{
    return (
        <Fragment>
            <Switch>
                <PrivatRoute exact path='/' component={Home}/>
            </Switch>
        </Fragment>
    )
}
