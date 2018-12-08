import ee from 'event-emitter'
import allOff from 'event-emitter/all-off'

import { toast } from 'react-toastify'

const eeClass = function () { /* .. */ }
ee(eeClass.prototype)

export const emitter = new eeClass()
export const allOffEmitter = allOff


export const toastCustom = (text,type = 'info') =>toast[type](`🦄 ${text}`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})
