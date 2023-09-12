import {

/*************CAMBIAR ESTADOS DE REDUX */
     
    CAMBIAR_ESTADO,
    CAMBIAR_ESTADO_EXITO,
    CAMBIAR_ESTADO_ERROR,


/*************INTERACCIÓN CON API*/

    MOSTRAR_API,
    MOSTRAR_API_EXITO,
    MOSTRAR_API_ERROR,


    INSERTAR_API,
    INSERTAR_API_EXITO,
    INSERTAR_API_ERROR,

    UPDATE_API,
    UPDATE_API_EXITO,
    UPDATE_API_ERROR


} from './types';

import store from "app/store/index"
import axios from 'axios'
import {getCookie} from 'app/js/generalFunctions'
import { showMessage } from 'app/store/fuse/messageSlice'


//URL DE API DJANGO
const urlApi = process.env.REACT_APP_URL_DJANGO + "/api/"



//************************ CAMBIAR ESTADO  **********************************************

export function cambiarEstadoAction(nombreEstado, valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarEstado())

        try {
            dispatch (cambiarEstadoExito(nombreEstado, valorNuevo))

        } catch (error) {

            dispatch (cambiarEstadoError(true))
        }
    }
}

const cambiarEstado = () => ({
    type: CAMBIAR_ESTADO,
    payload: true

})

const cambiarEstadoExito = (nombreEstado, valorNuevo) => ({
    type: CAMBIAR_ESTADO_EXITO,
    nombre: nombreEstado,
    payload: valorNuevo
    

})

const cambiarEstadoError = estado => ({
  type:  CAMBIAR_ESTADO_ERROR,
  payload: estado
})


//************************ MOSTRAR RM_ACCION API **********************************************

export function mostrarAPIAction(parametros) {

    return async (dispatch) => {
        dispatch (mostrarAPIAction())

              await axios({
                    method: "GET",
                    url: urlApi + parametros,
                    headers: {
                            'Authorization': `Token ${getCookie('token')}` 
                              }
                        
                            })
                             .then(response=>{
                                dispatch (mostrarAPIActionExito(response.data))
                            })
                            .catch(error => {
                                console.log(error.response)
                                dispatch (mostrarAPIActionError(true))
                            })
   
      }
}

const mostrarAPIAction = () => ({
    type: MOSTRAR_API,
    payload: true

})

const mostrarAPIActionExito = resultado => ({
    type: MOSTRAR_API_EXITO,
    payload:resultado

})

const mostrarAPIActionError = estado => ({
  type: MOSTRAR_API_ERROR,
  payload: estado
})



//************************ INSERTAR **********************************************

export function insertarApiAction(rm_accion) {

    return async (dispatch) => {
        dispatch (insertarApi())

             axios({
                    method: "POST",
                    url: urlRmAccionApi,
                    data: rm_accion,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (insertarApiExito(response.data))

                 
                 dispatch(
                    showMessage({
                        message: "Successfully created",
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
                dispatch (insertarApiError(true))

                dispatch(
                    showMessage({
                        message: "Error creating",
                        variant: "error"
                    })
                )
            })

    }
}

const insertarApi = (resultado) => ({
    type: INSERTAR_API,
    payload: resultado

})

const insertarApiExito = estado => ({
    type: INSERTAR_API_EXITO,
    payload: estado

})

const insertarApiError = estado => ({
    type:  INSERTAR_API_ERROR,
    payload: estado
})

//************************ UPDATE RM_ACCION **********************************************

export function updateApiAction(id, json) {

    return async (dispatch) => {
        dispatch (updateApi())

             axios({
                    method: "PUT",
                    url: urlRmAccionApi + id,
                    data: json,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (updateApiExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Updated registry",
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
                dispatch (updateApiError(true))

                dispatch(
                    showMessage({
                        message: "Error when updating registry",
                        variant: "error"
                    })
                )
            })

    }
}

const updateApi = (resultado) => ({
    type: UPDATE_API,
    payload: resultado

})

const updateApiExito = estado => ({
    type: UPDATE_API_EXITO,
    payload: estado

})

const updateApiError = estado => ({
    type:  UPDATE_API_ERROR,
    payload: estado
})





