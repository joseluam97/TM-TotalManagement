import {

    GET_CONTRATO_SERVICIO,
    GET_CONTRATO_SERVICIO_EXITO,
    GET_CONTRATO_SERVICIO_ERROR,

    POST_CONTRATO_SERVICIO,
    POST_CONTRATO_SERVICIO_EXITO,
    POST_CONTRATO_SERVICIO_ERROR,

    PUT_CONTRATO_SERVICIO,
    PUT_CONTRATO_SERVICIO_EXITO,
    PUT_CONTRATO_SERVICIO_ERROR,

    CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO,
    CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_ERROR,

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_ERROR,

    GET_LOCATIONS_MISION_CONTRACT,
    GET_LOCATIONS_MISION_CONTRACT_EXITO,
    GET_LOCATIONS_MISION_CONTRACT_ERROR



} from './types';
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//Constantes
const urlContratoServicioApi = process.env.REACT_APP_URL_DJANGO + "/api/service/"

//************************ GET LOCATIONS DE MISIONES ASOCIADAS A CONTRATO**********************************************

export function obtenerLocationsByMisionAPIAction(idContrato) {

    return async (dispatch) => {
        dispatch (obtenerLocationsByMisionAPI(true))

        
            await axios({
                method: "GET",
                url: urlContratoServicioApi + "mision/" + idContrato,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (obtenerLocationsByMisionAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (obtenerLocationsByMisionAPIError(true))
                    })

          }
}

const obtenerLocationsByMisionAPI = () => ({
    type: GET_LOCATIONS_MISION_CONTRACT,
    payload: false

})

const obtenerLocationsByMisionAPIExito = programas => ({
    type: GET_LOCATIONS_MISION_CONTRACT_EXITO,
    payload: programas

})

const obtenerLocationsByMisionAPIError = estado => ({
  type: GET_LOCATIONS_MISION_CONTRACT_ERROR,
  payload: estado
})

//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarValorSeleccion())

        try {
            dispatch (cambiarValorSeleccionExito(valorNuevo))
            

        } catch (error) {

            dispatch (cambiarValorSeleccionError(true))
        }

    }

}

const cambiarValorSeleccion = () => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_CONTRATO_SERVICIO_ERROR,
  payload: estado
})

//************************ MOSTRAR PROGRAMAS API **********************************************

export function mostrarContratoServicioAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarContratoServicioAPI(true))

        
            await axios({
                method: "GET",
                url: urlContratoServicioApi,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarContratoServicioAPIExito(response.data)) 
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarContratoServicioAPIError(true))
                    })

          }
}

const mostrarContratoServicioAPI = () => ({
    type: GET_CONTRATO_SERVICIO,
    payload: true

})

const mostrarContratoServicioAPIExito = programas => ({
    type: GET_CONTRATO_SERVICIO_EXITO,
    payload: programas

})

const mostrarContratoServicioAPIError = estado => ({
  type: GET_CONTRATO_SERVICIO_ERROR,
  payload: estado
})


//************************POST ContratoServicio**********************************************

export function crearContratoServicioActionAPIAction(contratoServicio) {

    return  (dispatch) => {
        dispatch (crearContratoServicio())

            
             axios({
                    method: "POST",
                    url: urlContratoServicioApi,
                    data: contratoServicio,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (crearContratoServicioExito(response.data))
                 dispatch(
                    showMessage({
                        message: "Created Contract",
                        variant: "success"
                    })
                 )
                 dispatch (mostrarContratoServicioAPIAction())
             })
             .catch(error => {
                console.log(error.response)
                dispatch (crearContratoServicioError(true))

                dispatch(
                    showMessage({
                        message: "Error when created Contract",
                        variant: "error"
                    })
                )
            })

    }
}

const crearContratoServicio = (programa) => ({
    type: POST_CONTRATO_SERVICIO,
    payload: programa

})

const crearContratoServicioExito = estado => ({
    type: POST_CONTRATO_SERVICIO_EXITO,
    payload: estado

})

const crearContratoServicioError = estado => ({
    type:  POST_CONTRATO_SERVICIO_ERROR,
    payload: estado
})

//************************PUT ContratoServicio**********************************************


export function updateContratoServicioActionAPIAction(id, json) {

    return async (dispatch) => {
        dispatch (updateContratoServicio())

             axios({
                    method: "PUT",
                    url: urlContratoServicioApi + id,
                    data: json,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (updateContratoServicioExito(response.data))

                 if (response.data['active'] == false) {
                    dispatch(
                        showMessage({
                            message: "Delete Contract",
                            variant: "success"
                        })
                    )
                }
                else {

                    dispatch(
                        showMessage({
                            message: "Updated Contract",
                            variant: "success"
                        })
                    )
                }
                

                 dispatch(mostrarContratoServicioAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (updateContratoServicioError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating Contract",
                        variant: "error"
                    })
                )
            })

    }
}

const updateContratoServicio = (rm_accion) => ({
    type: PUT_CONTRATO_SERVICIO,
    payload: rm_accion

})

const updateContratoServicioExito = estado => ({
    type: PUT_CONTRATO_SERVICIO_EXITO,
    payload: estado

})

const updateContratoServicioError = estado => ({
    type:  PUT_CONTRATO_SERVICIO_ERROR,
    payload: estado
})


//************************ MOSTRAR DIALOGO CONTRATO API **********************************************

export function cambiarVisibilidadModalInsertarAPIAction(valorNuevo, modo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalInsertarAPI())

        try {
            dispatch (cambiarVisibilidadModalInsertarAPIExito(valorNuevo, modo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalInsertarAPIError(true))
        }

    }
}

const cambiarVisibilidadModalInsertarAPI = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO,
    payload: true

})

const cambiarVisibilidadModalInsertarAPIExito = (valorNuevo, modo) => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_EXITO,
    payload: valorNuevo,
    modo: modo

})

const cambiarVisibilidadModalInsertarAPIError = estado => ({
  type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_CONTRATO_SERVICIO_ERROR,
  payload: estado
})
