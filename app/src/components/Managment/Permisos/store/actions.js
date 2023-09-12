import {

    MOSTRAR_GROUP,
    MOSTRAR_GROUP_EXITO,
    MOSTRAR_GROUP_ERROR,

    MOSTRAR_PERMISOS,
    MOSTRAR_PERMISOS_EXITO,
    MOSTRAR_PERMISOS_ERROR,

    MOSTRAR_ALL_PERMISOS,
    MOSTRAR_ALL_PERMISOS_EXITO,
    MOSTRAR_ALL_PERMISOS_ERROR,

    PUT_GROUP,
    PUT_GROUP_EXITO,
    PUT_GROUP_ERROR,

    INSERTAR_NEW_GROUP,
    INSERTAR_NEW_GROUP_EXITO,
    INSERTAR_NEW_GROUP_ERROR,

    CAMBIAR_MODAL_INSERTAR_GROUP,
    CAMBIAR_MODAL_INSERTAR_GROUP_EXITO,
    CAMBIAR_MODAL_INSERTAR_GROUP_ERROR,
    
    CAMBIAR_VALOR_SELECCION_GRID_GROUP,
    CAMBIAR_VALOR_SELECCION_GRID_GROUP_EXITO,
    CAMBIAR_VALOR_SELECCION_GRID_GROUP_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlGruposAPI = process.env.REACT_APP_URL_DJANGO + "/api/group/"
const urlPermisosAPI = process.env.REACT_APP_URL_DJANGO + "/api/permisos/"

//************************ MOSTRAR PERMISOS POR GRUPO**********************************************

export function mostrarPermisosByGroupAPIAction(idGroup) {

    return async (dispatch) => {
        dispatch (mostrarPermisosByGroupAPI(true))

        
            await axios({
                method: "GET",
                url: urlGruposAPI + "permisos/" + idGroup,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarPermisosByGroupAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarPermisosByGroupAPIError(true))
                    })

          }
}

const mostrarPermisosByGroupAPI = (estado) => ({
    type: MOSTRAR_PERMISOS,
    payload: false

})

const mostrarPermisosByGroupAPIExito = apps => ({
    type: MOSTRAR_PERMISOS_EXITO,
    payload: apps

})

const mostrarPermisosByGroupAPIError = estado => ({
  type: MOSTRAR_PERMISOS_ERROR,
  payload: estado
})

//************************ MOSTRAR ALL PERMISOS API GET **********************************************

export function mostrarAllPermisosAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarAllPermisosAPI(true))

        
            await axios({
                method: "GET",
                url: urlPermisosAPI,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarAllPermisosAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarAllPermisosAPIError(true))
                    })

          }
}

const mostrarAllPermisosAPI = (estado) => ({
    type: MOSTRAR_ALL_PERMISOS,
    payload: true

})

const mostrarAllPermisosAPIExito = apps => ({
    type: MOSTRAR_ALL_PERMISOS_EXITO,
    payload: apps

})

const mostrarAllPermisosAPIError = estado => ({
  type: MOSTRAR_ALL_PERMISOS_ERROR,
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
    type: CAMBIAR_VALOR_SELECCION_GRID_GROUP,
    payload: false

})

const cambiarValorSeleccionExito = valorNuevo => ({
    type: CAMBIAR_VALOR_SELECCION_GRID_GROUP_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionError = estado => ({
  type: CAMBIAR_VALOR_SELECCION_GRID_GROUP_ERROR,
  payload: estado
})

//************************CAMBIAR VISIBILIDAD MODAL **********************************************

export function cambiarVisibilidadModalInsertarAPIAction(valorNuevo, modoDialogo) {

    return (dispatch) => {
        dispatch (cambiarVisibilidadModalInsertarAPI())

        try {
            dispatch (cambiarVisibilidadModalInsertarAPIExito(valorNuevo, modoDialogo))

        } catch (error) {

            dispatch (cambiarVisibilidadModalInsertarAPIError(true))
        }
    }
}

const cambiarVisibilidadModalInsertarAPI = () => ({
    type: CAMBIAR_MODAL_INSERTAR_GROUP,
    payload: true

})

const cambiarVisibilidadModalInsertarAPIExito = (valorNuevo, modoDialogo) => ({
    type: CAMBIAR_MODAL_INSERTAR_GROUP_EXITO,
    payload: valorNuevo,
    modoDialogo: modoDialogo

})

const cambiarVisibilidadModalInsertarAPIError = estado => ({
  type:  CAMBIAR_MODAL_INSERTAR_GROUP_ERROR,
  payload: estado
})

//************************ INSERTA RM_ACCION MODAL INSERTAR**********************************************

export function insertarNewGroupAPIAction(grupo) {

    return async (dispatch) => {
        dispatch (createNewGroup())
             axios({
                    method: "POST",
                    url: urlGruposAPI,
                    data: grupo,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (createNewGroupExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Group successfully created",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarGroupAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (createNewGroupError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Group",
                        variant: "error"
                    })
                )
            })

    }
}

const createNewGroup = (grupo) => ({
    type: INSERTAR_NEW_GROUP,
    payload: grupo

})

const createNewGroupExito = grupo => ({
    type: INSERTAR_NEW_GROUP_EXITO,
    payload: grupo

})

const createNewGroupError = grupo => ({
    type:  INSERTAR_NEW_GROUP_ERROR,
    payload: grupo
})

//PUT CUSTOMER

export function putGroupAPIAction(id,contenido) {

    return async (dispatch) => {
        dispatch (putGroup())
             axios({
                    method: "PUT",
                    url: urlGruposAPI + "putPermisos/" + id,
                    data: contenido,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putGroupExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Group successfully modified",
                        variant: "success"
                    })
                 ) 

                 dispatch(mostrarGroupAPIAction())

             })
             .catch(error => {
                console.log(error.response)
                dispatch (putGroupError(true))

                dispatch(
                    showMessage({
                        message: "Error modified Group",
                        variant: "error"
                    })
                )
            })

    }
}

const putGroup = () => ({
    type: PUT_GROUP,
    payload: true

})

const putGroupExito = estado => ({
    type: PUT_GROUP_EXITO,
    payload: estado

})

const putGroupError = estado => ({
    type:  PUT_GROUP_ERROR,
    payload: estado
})

//************************ MOSTRAR CUSTOMER API GET **********************************************

export function mostrarGroupAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarGroupAPI(true))

        
            await axios({
                method: "GET",
                url: urlGruposAPI,
                headers: {
                    'Authorization': `Token ${getCookie('token')}` 
                        }
                
                    })
                     .then(response=>{
                        dispatch (mostrarGroupAPIExito(response.data))
                    })
                    .catch(error => {
                        console.log(error.response)
                        dispatch (mostrarGroupAPIError(true))
                    })

          }
}

const mostrarGroupAPI = (estado) => ({
    type: MOSTRAR_GROUP,
    payload: true

})

const mostrarGroupAPIExito = apps => ({
    type: MOSTRAR_GROUP_EXITO,
    payload: apps

})

const mostrarGroupAPIError = estado => ({
  type: MOSTRAR_GROUP_ERROR,
  payload: estado
})