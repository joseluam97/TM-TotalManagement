import {

    OBTENER_USER_DETAILS,
    OBTENER_USER_DETAILS_EXITO,
    OBTENER_USER_DETAILS_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_DETALLES,
    CAMBIAR_MODAL_VISIBILIDAD_DETALLES_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_DETALLES_ERROR,

} from './types';
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//Constantes
const urlUserApi = process.env.REACT_APP_URL_DJANGO + "/api/user/"

//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function setValueUserSeleccionadoAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (setValueUserSeleccionadoAPI())

        try {
            dispatch (setValueUserSeleccionadoAPIExito(valorNuevo))

        } catch (error) {

            dispatch (setValueUserSeleccionadoAPIError(true))
        }
    }
}

const setValueUserSeleccionadoAPI = () => ({
    type: OBTENER_USER_DETAILS,
    payload: true
})

const setValueUserSeleccionadoAPIExito = (valorNuevo) => ({
    type: OBTENER_USER_DETAILS_EXITO,
    payload: valorNuevo
})

const setValueUserSeleccionadoAPIError = estado => ({
  type:  OBTENER_USER_DETAILS_ERROR,
  payload: estado
})
//************************CAMBIAR VISIBILIDAD MODAL NUEVO USUARIO**********************************************

export function cambiarVisibilidadModalDetallesUserAPI(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalNuevoUser())

        try {
            dispatch (cambiarVisibilidadModalNuevoUserExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalNuevoUserError(true))
        }
    }
}

const cambiarVisibilidadModalNuevoUser = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_DETALLES,
    payload: true
})

const cambiarVisibilidadModalNuevoUserExito = (valorNuevo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_DETALLES_EXITO,
    payload: valorNuevo
})

const cambiarVisibilidadModalNuevoUserError = estado => ({
  type:  CAMBIAR_MODAL_VISIBILIDAD_DETALLES_ERROR,
  payload: estado
})