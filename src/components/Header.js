import React, {Component} from 'react'
import {Typography, Grid} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {withStyles} from '@material-ui/core'


const styles = theme => ({
    root: {
        marginBottom: 20
    },
    typography: {
        lineHeight: 1,
        color: '#fff'
    },
    letterSpacing: {
        letterSpacing: '2.4px'
    },
    logo: {
        display: 'inline-flex',
        flexDirection: 'column'
    }
})

class Header extends Component {
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={classes.logo}>
                            <Typography className={classes.typography} variant="title">Pharmcom</Typography>
                            <Typography className={classes.typography + ' ' + classes.letterSpacing}
                                variant="overline">Фармацевти</Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header)
