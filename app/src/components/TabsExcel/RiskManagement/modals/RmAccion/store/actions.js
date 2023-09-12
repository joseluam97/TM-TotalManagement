import {

    // COMPONENTE PRINCIPAL ------------------


    CAMBIAR_VALOR_SELECCION_GRID,
    CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_ERROR,

    ELIMINAR_RM_ACCION,
    ELIMINAR_RM_ACCION_EXITO,
    ELIMINAR_RM_ACCION_ERROR,

    MOSTRAR_RM_ACCION,
    MOSTRAR_RM_ACCION_EXITO,
    MOSTRAR_RM_ACCION_ERROR,

    // MODAL INSERTAR  -----------------------

    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,

    INSERTAR_RM_ACCION_MODAL_INSERTAR,
    INSERTAR_RM_ACCION_MODAL_INSERTAR_EXITO,
    INSERTAR_RM_ACCION_MODAL_INSERTAR_ERROR,

    CONSULTA_RM_REGISTRO_MODAL_INSERTAR,
    CONSULTA_RM_REGISTRO_MODAL_INSERTAR_EXITO,
    CONSULTA_RM_REGISTRO_MODAL_INSERTAR_ERROR,

    MOSTRAR_MY_ACTIONS_RM_ACCION,
    MOSTRAR_MY_ACTIONS_RM_ACCION_EXITO,
    MOSTRAR_MY_ACTIONS_RM_ACCION_ERROR


} from './types';
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//Constantes
const urlRmAccionApi = process.env.REACT_APP_URL_DJANGO + "/api/rm_action/"
const urlRmRegistrosApi = process.env.REACT_APP_URL_DJANGO + "/api/rm_risk_opportunity/"


//************************ MOSTRAR MY ACTIONS RM_ACCION API **********************************************

export function mostrarMyActionsRmAccionAPIAction(idPerson) {

    return async (dispatch) => {
        dispatch (mostrarMyActionsRmAccionAPI())

              await axios({
                    method: "GET",
                    url: urlRmAccionApi + 'myActions/' + idPerson,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (mostrarMyActionsRmAccionAPIExito(response.data))
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch (mostrarMyActionsRmAccionAPIError(true))
                            })
   
      }
}

const mostrarMyActionsRmAccionAPI = () => ({
    type: MOSTRAR_MY_ACTIONS_RM_ACCION,
    payload: true

})

const mostrarMyActionsRmAccionAPIExito = rm_acciones => ({
    type: MOSTRAR_MY_ACTIONS_RM_ACCION_EXITO,
    payload:rm_acciones

})

const mostrarMyActionsRmAccionAPIError = estado => ({
  type: MOSTRAR_MY_ACTIONS_RM_ACCION_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_ERROR,
  payload: estado
})


//************************ ELIMINAR RM ACCION **********************************************

export function eliminarRmAccionAction(id) {

    return async (dispatch) => {
        dispatch ( eliminarRmAccion())

                await axios({
                    method: "DELETE",
                    url: urlRmAccionApi + id,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                         .then(response=>{
                            dispatch (eliminarRmAccionExito(false))
    
                            dispatch(
                                showMessage({
                                    message: "Correctly removed",
                                    variant: "success"
                                })
                            )
    
                            dispatch(mostrarRmAccionAPIAction())
                            
                        })
                        
                     .catch(error => {
                        console.log(error.response)
                        dispatch (eliminarRmRegistroError(false))
                        dispatch(
                            showMessage({
                                message: "Error when deleting",
                                variant: "error"
                            })
                        )
                    })

       
      }
}

const eliminarRmAccion = (id) => ({
    type: ELIMINAR_RM_ACCION,
    payload: id

})

const eliminarRmAccionExito = estado => ({
    type: ELIMINAR_RM_ACCION_EXITO,
    payload: estado

})

const eliminarRmAccionError = estado => ({
    type:  ELIMINAR_RM_ACCION_ERROR,
    payload: estado
})



//************************ MOSTRAR RM_ACCION API **********************************************

export function mostrarRmAccionByPersonAPIAction(idLogin) {

    return async (dispatch) => {
        dispatch (mostrarRmAccionAPI())

              await axios({
                    method: "GET",
                    url: urlRmAccionApi + "persona/"+ idLogin,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (mostrarRmAccionAPIExito(response.data))
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch (mostrarRmAccionAPIError(true))
                            })
   
      }
}

export function mostrarRmAccionAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarRmAccionAPI())

              await axios({
                    method: "GET",
                    url: urlRmAccionApi,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (mostrarRmAccionAPIExito(response.data))
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch (mostrarRmAccionAPIError(true))
                            })
   
      }
}

const mostrarRmAccionAPI = () => ({
    type: MOSTRAR_RM_ACCION,
    payload: true

})

const mostrarRmAccionAPIExito = rm_acciones => ({
    type: MOSTRAR_RM_ACCION_EXITO,
    payload:rm_acciones

})

const mostrarRmAccionAPIError = estado => ({
  type: MOSTRAR_RM_ACCION_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL INSERTAR**********************************************

export function cambiarVisibilidadModalInsertarAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalInsertar())

        try {
            dispatch (cambiarVisibilidadModalInsertarExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalInsertarError(true))
        }
    }
}

const cambiarVisibilidadModalInsertar = () => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR,
    payload: true

})

const cambiarVisibilidadModalInsertarExito = valorNuevo => ({
    type: CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_EXITO,
    payload: valorNuevo

})

const cambiarVisibilidadModalInsertarError = estado => ({
  type:  CAMBIAR_MODAL_VISIBILIDAD_INSERTAR_ERROR,
  payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarRmAccionModalInsertarAction(rm_accion) {

    return async (dispatch) => {
        dispatch (insertarRmAccionModalInsertar())

             axios({
                    method: "POST",
                    url: urlRmAccionApi,
                    data: rm_accion,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (insertarRmAccionModalInsertarExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Action successfully created",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarRmAccionAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (insertarRmAccionModalInsertarError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Action",
                        variant: "error"
                    })
                )
            })

    }
}

const insertarRmAccionModalInsertar = (rm_accion) => ({
    type: INSERTAR_RM_ACCION_MODAL_INSERTAR,
    payload: rm_accion

})

const insertarRmAccionModalInsertarExito = estado => ({
    type: INSERTAR_RM_ACCION_MODAL_INSERTAR_EXITO,
    payload: estado

})

const insertarRmAccionModalInsertarError = estado => ({
    type:  INSERTAR_RM_ACCION_MODAL_INSERTAR_ERROR,
    payload: estado
})

//************************ CONSULTA RM REGISTRO MODAL **********************************************

export function consultaRmRegistrosByPersonaAction(idPersona) {

    return async (dispatch) => {
        dispatch (consultaRmRegistros())


            await axios({
                method: "GET",
                url: urlRmRegistrosApi + "persona/" + idPersona,
                headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                            .then(response=>{
                            dispatch (consultaRmRegistrosExito(response.data))
                        })
                        .catch(error => {
                            console.log(error.response)
                            dispatch (consultaRmRegistrosError(true))
                        })
   
    }
}

export function consultaRmRegistrosHomeAction() {

    return async (dispatch) => {
        dispatch (consultaRmRegistros())


            await axios({
                method: "GET",
                url: urlRmRegistrosApi + "home/",
                headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                            .then(response=>{
                            dispatch (consultaRmRegistrosExito(response.data))
                        })
                        .catch(error => {
                            console.log(error.response)
                            dispatch (consultaRmRegistrosError(true))
                        })
   
    }
}

export function consultaRmRegistrosAction() {

    return async (dispatch) => {
        dispatch (consultaRmRegistros())


            await axios({
                method: "GET",
                url: urlRmRegistrosApi,
                headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                    
                        })
                            .then(response=>{
                            dispatch (consultaRmRegistrosExito(response.data))
                        })
                        .catch(error => {
                            console.log(error.response)
                            dispatch (consultaRmRegistrosError(true))
                        })
   
    }
}

const consultaRmRegistros = () => ({
    type: CONSULTA_RM_REGISTRO_MODAL_INSERTAR,
    payload: true

})

const consultaRmRegistrosExito = programas => ({
    type: CONSULTA_RM_REGISTRO_MODAL_INSERTAR_EXITO,
    payload: programas

})

const consultaRmRegistrosError = estado => ({
  type: CONSULTA_RM_REGISTRO_MODAL_INSERTAR_ERROR,
  payload: estado
})


