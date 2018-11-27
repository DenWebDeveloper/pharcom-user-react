import React,{Fragment} from 'react'
import {Route, Switch} from 'react-router'

export  default ({match})=>{
    return (
        <Fragment>
            <Route path={`${match.path}/:topicId`}/>
        </Fragment>
    )
}
