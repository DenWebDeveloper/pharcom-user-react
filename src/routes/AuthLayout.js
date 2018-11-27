import React,{Fragment} from 'react'
import {Route, Switch} from 'react-router'
import {withStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

import Header from '../components/Header'
import Footer from '../components/Footer'
import SignIn from '../views/SingIn'
import SignUp from '../views/SingUp'

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
    },
    fullWidth: {
        width: '100%'
    }
})

function AuthLayout({match,classes}) {
    return (
        <Grid container className={classes.root}
            direction="column"
            justify="space-between"
            alignItems="center">
            <Grid item md={12} className={classes.fullWidth}>
                <Header/>
            </Grid>
            <Route exact path={`${match.path}/singin`} component={SignIn}/>
            <Route exact path={`${match.path}/singup`} component={SignUp}/>
            <Grid item xs={12} className={classes.fullWidth}>
                <Footer/>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(AuthLayout)
