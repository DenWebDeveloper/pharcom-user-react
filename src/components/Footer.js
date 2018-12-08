import React, {Component} from 'react'
import {Typography, Grid} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {withStyles} from '@material-ui/core'


const styles = theme => ({
    root: {
        backgroundColor: '#2c387e',
        padding: 10,
        marginTop: 20
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

class Footer extends Component {
    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root}>
                <Grid item xs={4}>
                    <Typography className={classes.typography} variant="body1">Підтримка</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.typography} variant="body1">Підтримка</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography className={classes.typography} variant="body1">Підтримка</Typography>
                </Grid>
            </Grid>

        )
    }
}

export default withStyles(styles)(Footer)
