import React, {Component} from 'react'
import validator from 'validator'
import Cookies from 'js-cookie'

import Grid from '@material-ui/core/Grid'
import {TextField, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import Snackbars from '../components/Snackbars'

import http from '../http'

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center'
    },
    col: {
        margin: '0 auto'
    },
    textField: {
        width: '100%',
    },
    button: {
        margin: theme.spacing.unit,
    },
})

class SingIn extends Component {
    state = {
        email: 'user@user.com',
        password: 'zxcasd',
        errors: {
            email: !false,
            password: !false
        },
        snackbars: {
            open: false,
            message: '',
            type: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleSubmit = () => {
        const {state} = this
        const errors = {
            email: validator.isEmail(state.email),
            password: validator.isByteLength(state.password, {min: 6})
        }
        this.setState({
            errors
        })
        if (Object.values(errors).includes(false)) return

        http.post(`/login`,{
            email: state.email,
            password: state.password
        }).then(res => {
            Cookies.set('token', res.data)
            // TODO redirect
        }).catch(err => {
            this.setState({
                snackbars: {
                    open: true,
                    message: err.message,
                    type: 'error'
                }
            })
        })
    }

    handleCloseSnackbars = () => {
        const  snackbars = this.state.snackbars
        this.setState({
            snackbars: {
                ...snackbars,
                open: false,
            }
        })
    }

    render() {
        const {classes} = this.props
        const {state} = this
        const {errors} = state
        return (
            <div>
                <Grid container className={classes.root}>
                    <Grid className={classes.col} item container xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    error={!errors.email}
                                    label='Email'
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    margin='normal'
                                />
                                <TextField
                                    error={!errors.password}
                                    type='password'
                                    label='Пароль'
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    margin='normal'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button className={classes.button}>Немає ще акаунта? Створити</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.handleSubmit} variant='contained' color='primary'
                                        className={classes.button}>
                                   Увійти
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Snackbars message={state.snackbars.message}
                           open={state.snackbars.open}
                           variant={state.snackbars.type}
                           handleClose={this.handleCloseSnackbars}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SingIn)
