import React, {Component} from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import LocationSelects from '../components/SingUp/LocationSelects';

import {TextField, Grid,Button, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import GenerateInputs from '../components/GenerateInputs'

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
        form: [
            {
                error: !false,
                label: 'Email',
                value: '',
                name: 'email',
            },
            {
                error: !false,
                label: 'Пароль',
                value: '',
                name: 'password',
            },
            {
                error: !false,
                label: 'Підтвердження паролю',
                value: '',
                name: 'confirmPassword',
            },
            {
                error: !false,
                label: 'Ім\'я',
                value: '',
                name: 'name',
            },
            {
                error: !false,
                label: 'По-батькові',
                value: '',
                name: 'secondName',
            },
            {
                error: !false,
                label: 'Фамілія',
                value: '',
                name: 'surname',
            }
        ]
    }

    handleChange = (index) => event => {
        const form = this.state.form.slice()
        const input = form[index]
        form[index] = {
            ...input,
            value: event.target.value
        }
        this.setState({
            form
        })
    }

    handleSubmit = () => {
        let form = this.state.form.slice()
        const errors = [
            validator.isEmail(form[0].value), //email
            validator.isByteLength(form[1].value, {min: 6}), //password
            validator.equals(form[1].value, form[2].value), //confirm password
            validator.isAlpha(form[3].value, 'uk-UA'), //name
            validator.isAlpha(form[4].value, 'uk-UA'), //second name
            validator.isAlpha(form[5].value, 'uk-UA'), //surname
        ]

        form = form.map((item, index) => {
            return {
                ...item,
                error: errors[index]

            }
        })

        this.setState({
            form
        })
        if (errors.includes(false)) return

        alert('send')
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Grid container className={classes.root}>
                    <Grid className={classes.col} item container xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom>
                                    Реєстрація
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <GenerateInputs handleChange={this.handleChange} inputs={this.state.form}/>
                                <LocationSelects/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className={classes.button} style={{marginLeft: 'auto', display: 'block'}}>Вже є
                                    акаунт? Увійти</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.handleSubmit} variant='contained' color='primary'
                                        className={classes.button}>
                                    Зареєструватися
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(SingIn)
