import React, {Component,useContext} from 'react'
import validator from 'validator'
import LocationSelects from '../components/SingUp/LocationSelects'
import http from '../http'
import {Link, Redirect} from 'react-router-dom'
import {FormControlLabel, Checkbox, Grid, Button, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {emitter} from '../untils'
import history from '../history'
import { withRouter } from "react-router-dom";


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
    checkbox: {
        marginTop: 20
    },
    error: {
        color: '#f44336 !important',
        '& span': {
            color: 'inherit'
        }
    }

})

class SingIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: {
                state: false,
                path: ''
            },
            form: [
                {
                    error: !false,
                    label: 'Email',
                    value: '',
                    name: 'email',
                },
                {
                    error: !false,
                    label: 'Пароль(Мінімально 6 символів)',
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
            ],
            location: {
                region: null,
                city: null,
                network: null,
                pharmacy: null,
            },
            confirmRight: false,
            confirmRightError: false,
            snackbars: {
                open: false,
                message: '',
                type: 'success'
            }
        }
    }

    handleChange = index => event => {
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

    handleChangeCheckbox = name => event => {
        this.setState({
            [name]: event.target.checked,
            [name + 'Error']: false
        })
    }

    handleSubmit = () => {
        let form = this.state.form.slice()
        const errors = [
            validator.isEmail(form[0].value), //email
            (validator.isByteLength(form[1].value, {min: 6}) && validator.isAlpha(form[1].value)), //password
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

        if (!this.state.confirmRight) {
            return this.setState({
                confirmRightError: true
            })
        }
        const locationErrors = Object.values(this.state.location).map(item => !!item)
        if (errors.includes(false) || locationErrors.includes(false)) return

        const location = this.state.location
        http.post('/auth/singup', {
            email: form[0].value,
            password: form[1].value,
            confirmPassword: form[2].value,
            confirmRight: this.state.confirmRight,

            name: form[3].value,
            surname: form[5].value,
            second_name: form[4].value,

            region_id: location.region.value,
            city_id: location.city.value,
            network_id: location.network.value,
            pharmacy_id: location.pharmacy.value
        }).then(() => {
            history.push('/auth/singin')
        })
    }

    handleLocation = name => value => {
        let location = this.state.location

        switch (name) {
            case 'region': {
                location = {
                    region: location.region,
                    city: null,
                    network: null,
                    pharmacy: null
                }
                break
            }
            case 'city': {
                location = {
                    region: location.region,
                    city: location.city,
                    network: null,
                    pharmacy: null
                }
                break
            }
            case 'network': {
                location = {
                    region: location.region,
                    city: location.city,
                    network: location.network,
                    pharmacy: null
                }
                break
            }
        }

        this.setState(() => ({
                location: {
                    ...location,
                    [name]: value
                }
            }), () => {
                switch (name) {
                    case 'region': {
                        emitter.emit('city')
                        break
                    }
                    case 'city': {
                        emitter.emit('network')
                        break
                    }
                    case 'network': {
                        emitter.emit('pharmacy')
                        break
                    }
                }
            }
        )
    }

    redirect = (path) => {
        this.setState({
            redirect: {
                state: true,
                path
            }
        })
    }

    renderLocationCities() {
        const {region, city} = this.state.location
        if (!region) return
        return <LocationSelects
            requestFunc={() => http('/location/cities', {
                params: {
                    region_id: region.value
                }
            })}
            selected={city} nameEmitter='city'
            handleFunc={this.handleLocation('city')} placeholder='Виберіть місто'/>
    }

    renderLocationNetworks() {
        const {region, city, network} = this.state.location
        if (!region || !city) return
        return <LocationSelects
            requestFunc={() => http('/location/networks', {
                params: {
                    region_id: region.value,
                    city_id: city.value
                }
            })}
            selected={network} nameEmitter='network'
            handleFunc={this.handleLocation('network')} placeholder='Виберіть аптечну мережу'/>
    }

    renderLocationPharmacies() {
        const {region, city, network, pharmacy} = this.state.location
        if (!region || !city || !network) return
        return <LocationSelects
            requestFunc={() => http('/location/pharmacies', {
                params: {
                    region_id: region.value,
                    city_id: city.value,
                    network_id: network.value
                }
            })}
            selected={pharmacy} nameEmitter='pharmacy'
            handleFunc={this.handleLocation('pharmacy')} placeholder='Виберіть аптеку'/>
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                {this.state.redirect.state && <Redirect to={this.state.redirect.path}/>}
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
                                <LocationSelects
                                    immediately
                                    requestFunc={() => http('/location/regions')}
                                    selected={this.state.location.region}
                                    handleFunc={this.handleLocation('region')} placeholder='Виберіть регіон'/>
                                {this.renderLocationCities()}
                                {this.renderLocationNetworks()}
                                {this.renderLocationPharmacies()}
                                <FormControlLabel
                                    className={classes.checkbox + ' ' + (this.state.confirmRightError && classes.error)}
                                    control={
                                        <Checkbox
                                            checked={this.state.confirmRight}
                                            onChange={this.handleChangeCheckbox('confirmRight')}
                                            value="this.state.confirmRight"
                                            color="primary"
                                        />
                                    }
                                    label="Я прочитав угоду і даю право на обпрацювання моїх персональних данних"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={()=> this.redirect('/auth/singin')} className={classes.button} style={{marginLeft: 'auto', display: 'block'}}>
                                    Вже є акаунт? Увійти
                                </Button>
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
