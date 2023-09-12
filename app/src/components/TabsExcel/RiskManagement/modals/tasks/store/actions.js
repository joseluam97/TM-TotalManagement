import {

    
    MOSTRAR_RM_ACCION,
    MOSTRAR_RM_ACCION_EXITO,
    MOSTRAR_RM_ACCION_ERROR,

    CAMBIAR_ESTADO_RM_ACCION,
    CAMBIAR_ESTADO_RM_ACCION_EXITO,
    CAMBIAR_ESTADO_RM_ACCION_ERROR,

    INSERTAR_RM_ACCION,
    INSERTAR_RM_ACCION_EXITO,
    INSERTAR_RM_ACCION_ERROR,

    UPDATE_RM_ACCION,
    UPDATE_RM_ACCION_EXITO,
    UPDATE_RM_ACCION_ERROR,

    RESET_STATES_RM_ACCION,
    RESET_STATES_RM_ACCION_EXITO,
    RESET_STATES_RM_ACCION_ERROR,

    DELETE_RM_ACCION,
    DELETE_RM_ACCION_EXITO,
    DELETE_RM_ACCION_ERROR


} from './types';

import store from "app/store/index"
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//Constantes
const urlRmAccionApi = process.env.REACT_APP_URL_DJANGO + "/api/rm_action/"

//************************ MOSTRAR RM_ACCION API **********************************************

export function deleteRmAccionAPIAction(idAccion, id_record) {

    return async (dispatch) => {
        dispatch (deleteRmAccionAPI())

              await axios({
                    method: "DELETE",
                    url: urlRmAccionApi + idAccion,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (deleteRmAccionAPIExito(response.data))

                                dispatch(
                                    showMessage({
                                        message: "Action successfully deleted",
                                        variant: "success"
                                    })
                                 ) 

                                dispatch(mostrarRmAccionAPIAction(id_record));
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch(
                                    showMessage({
                                        message: "An error has occurred",
                                        variant: "success"
                                    })
                                 ) 
                                dispatch (deleteRmAccionAPIError(true))
                            })
   
      }
}

const deleteRmAccionAPI = () => ({
    type: DELETE_RM_ACCION,
    payload: true

})

const deleteRmAccionAPIExito = rm_acciones => ({
    type: DELETE_RM_ACCION_EXITO,
    payload:rm_acciones

})

const deleteRmAccionAPIError = estado => ({
  type: DELETE_RM_ACCION_ERROR,
  payload: estado
})

//************************ MOSTRAR RM_ACCION API **********************************************

export function mostrarRmAccionAPIAction(id_record) {

    return async (dispatch) => {
        dispatch (mostrarRmAccionAPI())

              await axios({
                    method: "GET",
                    url: urlRmAccionApi + '?id_record=' + id_record,
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


//************************ CAMBIAR ESTADO RM_ACCION  **********************************************

export function cambiarEstadoRmTasksAction(nombreEstado, valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarEstadoRmTasks())


        try {
            dispatch (cambiarEstadoRmTasksExito(nombreEstado, valorNuevo))

            if (nombreEstado == 'visibilidad' && valorNuevo == false) {

                dispatch (resetEstadosRmTasksAction())
            }

        } catch (error) {

            dispatch (cambiarEstadoRmTasksError(true))
        }
    }
}

const cambiarEstadoRmTasks = () => ({
    type: CAMBIAR_ESTADO_RM_ACCION,
    payload: true

})

const cambiarEstadoRmTasksExito = (nombreEstado, valorNuevo) => ({
    type: CAMBIAR_ESTADO_RM_ACCION_EXITO,
    nombre: nombreEstado,
    payload: valorNuevo
    

})

const cambiarEstadoRmTasksError = estado => ({
  type:  CAMBIAR_ESTADO_RM_ACCION_ERROR,
  payload: estado
})




//************************ INSERTA RM_ACCION **********************************************

export function insertarRmAccionAction(rm_accion) {

    return async (dispatch) => {
        dispatch (insertarRmAccion())

             axios({
                    method: "POST",
                    url: urlRmAccionApi,
                    data: rm_accion,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (insertarRmAccionExito(response.data))

                 
                 dispatch(
                    showMessage({
                        message: "Action successfully created",
                        variant: "success"
                    })
                 ) 
                
                 let idRiskOpportunity


                 if (store.getState().fuse.rmRegistroComponente.ultimoIdCreado['id'] != undefined) {
                    idRiskOpportunity = store.getState().fuse.rmRegistroComponente.ultimoIdCreado['id']
                 } else {
                    idRiskOpportunity = store.getState().fuse.rmRegistroComponente.filaSeleccionadaGrid
                 }

                 dispatch(mostrarRmAccionAPIAction(idRiskOpportunity))

             })
             .catch(error => {
                console.log(error.response)
                dispatch (insertarRmAccionError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Action",
                        variant: "error"
                    })
                )
            })

    }
}

const insertarRmAccion = (rm_accion) => ({
    type: INSERTAR_RM_ACCION,
    payload: rm_accion

})

const insertarRmAccionExito = estado => ({
    type: INSERTAR_RM_ACCION_EXITO,
    payload: estado

})

const insertarRmAccionError = estado => ({
    type:  INSERTAR_RM_ACCION_ERROR,
    payload: estado
})

//************************ UPDATE RM_ACCION **********************************************

export function updateRmAccionAction(id, json) {

    return async (dispatch) => {
        dispatch (updateRmAccion())

             axios({
                    method: "PUT",
                    url: urlRmAccionApi + id,
                    data: json,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (updateRmAccionExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Updated Action",
                        variant: "success"
                    })
                 ) 

                 let idRiskOpportunity

                if (store.getState().fuse.rmRegistroComponente.ultimoIdCreado['id'] != undefined) {
                    idRiskOpportunity = store.getState().fuse.rmRegistroComponente.ultimoIdCreado['id']
                 } else {
                    idRiskOpportunity = store.getState().fuse.rmRegistroComponente.filaSeleccionadaGrid
                 }

                 dispatch(mostrarRmAccionAPIAction(idRiskOpportunity))

             })
             .catch(error => {
                console.log(error.response)
                dispatch (updateRmAccionError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating Action",
                        variant: "error"
                    })
                )
            })

    }
}

const updateRmAccion = (rm_accion) => ({
    type: UPDATE_RM_ACCION,
    payload: rm_accion

})

const updateRmAccionExito = estado => ({
    type: UPDATE_RM_ACCION_EXITO,
    payload: estado

})

const updateRmAccionError = estado => ({
    type:  UPDATE_RM_ACCION_ERROR,
    payload: estado
})

//************************ RESET ESTADOS  **********************************************

export function resetEstadosRmTasksAction() {

    return (dispatch) => {
        dispatch (resetEstadosRmTasks())


        try {
            dispatch (resetEstadosRmTasksExito(true))


        } catch (error) {

            dispatch (resetEstadosRmTasksError(true))
        }
    }
}

const resetEstadosRmTasks = () => ({
    type: RESET_STATES_RM_ACCION,
    payload: true

})

const resetEstadosRmTasksExito = estado => ({
    type: RESET_STATES_RM_ACCION_EXITO,
    payload: estado
    

})

const resetEstadosRmTasksError = estado => ({
  type:  RESET_STATES_RM_ACCION_ERROR,
  payload: estado
})






