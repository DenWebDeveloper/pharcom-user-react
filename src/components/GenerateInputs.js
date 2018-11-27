import React, {Component} from 'react'
import {TextField} from '@material-ui/core'
import PropTypes from 'prop-types'

const GenerateInputs = ({inputs, handleChange}) => {
    return inputs.map((item, index) => {
        return (
            <TextField
                error={!item.error}
                label={item.label}
                fullWidth
                value={item.value}
                onChange={handleChange(index)}
                margin='normal'
                key={item.name}
            />
        )
    })
}

GenerateInputs.propTypes = {
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            error: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired
    ),
    handleChange: PropTypes.func.isRequired,
}

export default GenerateInputs
