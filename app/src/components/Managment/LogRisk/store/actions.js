import {

    MOSTRAR_LOG_RISK,
    MOSTRAR_LOG_RISK_EXITO,
    MOSTRAR_LOG_RISK_ERROR,

    INSERTAR_NEW_LOG_RISK,
    INSERTAR_NEW_LOG_RISK_EXITO,
    INSERTAR_NEW_LOG_RISK_ERROR,

    VER_MODAL_DETALLES_LOG_RISK,
    VER_MODAL_DETALLES_LOG_RISK_EXITO,
    VER_MODAL_DETALLES_LOG_RISK_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlLogRiskApi = process.env.REACT_APP_URL_DJANGO + "/api/logRisk/"

//************************ MOSTRAR LOG_RISK API GET **********************************************

//LOG GENERAL
export function mostrarLogRiskAPIAction() {

    return async (dispatch) => {
        dispatch(mostrarLogRiskAPI(true))

        await axios({
            method: "GET",
            url: urlLogRiskApi,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(mostrarLogRiskAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarLogRiskAPIError(true))
            })

    }
}

//LOG RISK AMFE
export function mostrarLogRiskAmfeAPIAction(idAmfe) {

    return async (dispatch) => {
        dispatch(mostrarLogRiskAPI(true))

        await axios({
            method: "GET",
            url: urlLogRiskApi + "amfe/" + idAmfe,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(mostrarLogRiskAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarLogRiskAPIError(true))
            })

    }
}

//LOG RISK RO
export function mostrarLogRiskRoAPIAction(idRO) {

    return async (dispatch) => {
        dispatch(mostrarLogRiskAPI(true))

        await axios({
            method: "GET",
            url: urlLogRiskApi + "ro/" + idRO,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(mostrarLogRiskAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarLogRiskAPIError(true))
            })

    }
}

//LOG RISK ACCIONES BY RO
export function mostrarLogRiskAccionesByRoAPIAction(idRO) {

    return async (dispatch) => {
        dispatch(mostrarLogRiskAPI(true))

        await axios({
            method: "GET",
            url: urlLogRiskApi + "accionByRO/" + idRO,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(mostrarLogRiskAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarLogRiskAPIError(true))
            })

    }
}

//LOG RISK ACCIONES
export function mostrarLogRiskAccionAPIAction(idAccion) {

    return async (dispatch) => {
        dispatch(mostrarLogRiskAPI(true))

        await axios({
            method: "GET",
            url: urlLogRiskApi + "accion/" + idAccion,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(mostrarLogRiskAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(mostrarLogRiskAPIError(true))
            })

    }
}

const mostrarLogRiskAPI = (estado) => ({
    type: MOSTRAR_LOG_RISK,
    payload: true

})

const mostrarLogRiskAPIExito = customers => ({
    type: MOSTRAR_LOG_RISK_EXITO,
    payload: customers

})

const mostrarLogRiskAPIError = estado => ({
    type: MOSTRAR_LOG_RISK_ERROR,
    payload: estado
})

//************************ INSERTA LOG_RISK **********************************************

export function insertarLogRiskAPIAction(json) {

    return async (dispatch) => {
        dispatch(createLogRiskAPI(true))

        await axios({
            method: "POST",
            url: urlLogRiskApi,
            data: json,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(createLogRiskAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(createLogRiskAPIError(true))
            })

    }
}

const createLogRiskAPI = (customer) => ({
    type: INSERTAR_NEW_LOG_RISK,
    payload: customer

})

const createLogRiskAPIExito = estado => ({
    type: INSERTAR_NEW_LOG_RISK_EXITO,
    payload: estado

})

const createLogRiskAPIError = estado => ({
    type: INSERTAR_NEW_LOG_RISK_ERROR,
    payload: estado
})

//************************ MODAL VER LOG RISK**********************************************
export function verModalDetallesLogRiskAPIAction(valorNuevo, modoDialogo) {

    return (dispatch) => {
        dispatch (verModalDetallesLogRiskAPI())

        try {
            dispatch (verModalDetallesLogRiskAPIExito(valorNuevo, modoDialogo))
            

        } catch (error) {

            dispatch (verModalDetallesLogRiskAPIAPIError(true))
        }

    }

}

const verModalDetallesLogRiskAPI = () => ({
    type: VER_MODAL_DETALLES_LOG_RISK,
    payload: true

})

const verModalDetallesLogRiskAPIExito = (valorNuevo, modoDialogo) => ({
    type: VER_MODAL_DETALLES_LOG_RISK_EXITO,
    payload: valorNuevo,
    modoDialogo: modoDialogo

})

const verModalDetallesLogRiskAPIAPIError = estado => ({
  type: VER_MODAL_DETALLES_LOG_RISK_ERROR,
  payload: estado
})