import {

    // COMPONENTE PRINCIPAL ------------------

    GET_USER_APP,
    GET_USER_APP_EXITO,
    GET_USER_APP_ERROR,

    VER_MODAL_ANADIR_APP_PERSONA,
    VER_MODAL_ANADIR_APP_PERSONA_EXITO,
    VER_MODAL_ANADIR_APP_PERSONA_ERROR,

    GET_ALL_APP,
    GET_ALL_APP_EXITO,
    GET_ALL_APP_ERROR,

    POST_ASIGNAR_APP,
    POST_ASIGNAR_APP_EXITO,
    POST_ASIGNAR_APP_ERROR,

    GET_RESULT_USERAPP_BY_TEAM,
    GET_RESULT_USERAPP_BY_TEAM_EXITO,
    GET_RESULT_USERAPP_BY_TEAM_ERROR,

    VER_MODAL_VER_DETALLES_REQUERIMIENTOS,
    VER_MODAL_VER_DETALLES_REQUERIMIENTOS_EXITO,
    VER_MODAL_VER_DETALLES_REQUERIMIENTOS_ERROR,

    ITEM_SELECCIONADO_TEAM_REQUERIMENTS,
    ITEM_SELECCIONADO_TEAM_REQUERIMENTS_EXITO,
    ITEM_SELECCIONADO_TEAM_REQUERIMENTS_ERROR,

    DELETE_USER_APP,
    DELETE_USER_APP_EXITO,
    DELETE_USER_APP_ERROR


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlUserAppAPI = process.env.REACT_APP_URL_DJANGO + "/api/userApp/"
const urlUserAppByPersonaAPI = process.env.REACT_APP_URL_DJANGO + "/api/userAppByUser/"
const urlAppAPI = process.env.REACT_APP_URL_DJANGO + "/api/aplication/"

//************************ DELETE USER APP**********************************************

export function deleteUserAppAPIAction(idItem, idUser) {

    return async (dispatch) => {
        dispatch(deleteUserAppAPI())

        await axios({
            method: "DELETE",
            url: urlUserAppAPI + idItem,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {
                dispatch(deleteUserAppAPIExito(false))

                dispatch(
                    showMessage({
                        message: "Correctly removed",
                        variant: "success"
                    })
                )

                dispatch(mostrarUserAppAPIAction(idUser))
                dispatch(getResultUserAppByTeamAPIAction(idUser))

            })

            .catch(error => {
                console.log(error.response)
                dispatch(deleteUserAppAPIError(false))
                dispatch(
                    showMessage({
                        message: "Error when deleting",
                        variant: "error"
                    })
                )
            })


    }
}

const deleteUserAppAPI = (id) => ({
    type: DELETE_USER_APP,
    payload: id

})

const deleteUserAppAPIExito = estado => ({
    type: DELETE_USER_APP_EXITO,
    payload: estado

})

const deleteUserAppAPIError = estado => ({
    type: DELETE_USER_APP_ERROR,
    payload: estado
})

//************************ LINEA SELECCIONADA DEL TEAM REQUERIMENTS**********************************************
export function seleccionarItemTeamRequerimentAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (seleccionarItemTeamRequerimentAPI())

        try {
            dispatch (seleccionarItemTeamRequerimentAPIActionExito(valorNuevo))
            

        } catch (error) {

            dispatch (seleccionarItemTeamRequerimentAPIActionError(true))
        }

    }

}

const seleccionarItemTeamRequerimentAPI = () => ({
    type: ITEM_SELECCIONADO_TEAM_REQUERIMENTS,
    payload: true

})

const seleccionarItemTeamRequerimentAPIActionExito = valorNuevo => ({
    type: ITEM_SELECCIONADO_TEAM_REQUERIMENTS_EXITO,
    payload: valorNuevo

})

const seleccionarItemTeamRequerimentAPIActionError = estado => ({
  type: ITEM_SELECCIONADO_TEAM_REQUERIMENTS_ERROR,
  payload: estado
})

//************************ MODAL ANADIR APP PERSONA**********************************************
export function verModalDetallesRequerimientosUserAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (verModalDetallesRequerimientosUserAPI())

        try {
            dispatch (verModalDetallesRequerimientosUserAPIExito(valorNuevo))
            

        } catch (error) {

            dispatch (verModalDetallesRequerimientosUserAPIError(true))
        }

    }

}

const verModalDetallesRequerimientosUserAPI = () => ({
    type: VER_MODAL_VER_DETALLES_REQUERIMIENTOS,
    payload: true

})

const verModalDetallesRequerimientosUserAPIExito = valorNuevo => ({
    type: VER_MODAL_VER_DETALLES_REQUERIMIENTOS_EXITO,
    payload: valorNuevo

})

const verModalDetallesRequerimientosUserAPIError = estado => ({
  type: VER_MODAL_VER_DETALLES_REQUERIMIENTOS_ERROR,
  payload: estado
})

//************************ GET RESULT USER APP BY TEAM **********************************************

export function getResultUserAppByTeamAPIAction(idUser) {

    return async (dispatch) => {
        dispatch (getResultUserAppByTeamAPI())
             axios({
                    method: "GET",
                    url: urlUserAppAPI + "resultByTeam/" + idUser,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getResultUserAppByTeamAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getResultUserAppByTeamAPIError(true))
            })

    }

}

const getResultUserAppByTeamAPI = () => ({
    type: GET_RESULT_USERAPP_BY_TEAM,
    payload: true

})

const getResultUserAppByTeamAPIExito = valorNuevo => ({
    type: GET_RESULT_USERAPP_BY_TEAM_EXITO,
    payload: valorNuevo

})

const getResultUserAppByTeamAPIError = estado => ({
  type: GET_RESULT_USERAPP_BY_TEAM_ERROR,
  payload: estado
})

//************************ INSERTA NUEVA NOTIFICACION**********************************************

export function insertarNewAppAPIAction(idLogin, userApp) {

    return async (dispatch) => {
        dispatch (insertarNewAppAPI())
             axios({
                    method: "POST",
                    url: urlUserAppAPI,
                    data: userApp,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (insertarNewAppAPIExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Requeriment assigned",
                        variant: "success"
                    })
                 )

                 dispatch (mostrarUserAppAPIAction(idLogin))

             })
             .catch(error => {
                console.log(error.response)
                dispatch (insertarNewAppAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error assigned app",
                        variant: "error"
                    })
                )
            })

    }
}

const insertarNewAppAPI = (user) => ({
    type: POST_ASIGNAR_APP,
    payload: user

})

const insertarNewAppAPIExito = notification => ({
    type: POST_ASIGNAR_APP_EXITO,
    payload: notification

})

const insertarNewAppAPIError = estado => ({
    type: POST_ASIGNAR_APP_ERROR,
    payload: estado
})

//************************ GET ALL APP **********************************************

export function mostrarAppAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarAppAPI())
             axios({
                    method: "GET",
                    url: urlAppAPI,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (mostrarAppAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (mostrarAppAPIError(true))
            })

    }

}

const mostrarAppAPI = () => ({
    type: GET_ALL_APP,
    payload: true

})

const mostrarAppAPIExito = valorNuevo => ({
    type: GET_ALL_APP_EXITO,
    payload: valorNuevo

})

const mostrarAppAPIError = estado => ({
  type: GET_ALL_APP_ERROR,
  payload: estado
})

//************************ MODAL ANADIR APP PERSONA**********************************************
export function verModalAnadirAppPersonaAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (verModalAnadirAppPersonaAPI())

        try {
            dispatch (verModalAnadirAppPersonaAPIExito(valorNuevo))
            

        } catch (error) {

            dispatch (verModalAnadirAppPersonaAPIError(true))
        }

    }

}

const verModalAnadirAppPersonaAPI = () => ({
    type: VER_MODAL_ANADIR_APP_PERSONA,
    payload: true

})

const verModalAnadirAppPersonaAPIExito = valorNuevo => ({
    type: VER_MODAL_ANADIR_APP_PERSONA_EXITO,
    payload: valorNuevo

})

const verModalAnadirAppPersonaAPIError = estado => ({
  type: VER_MODAL_ANADIR_APP_PERSONA_ERROR,
  payload: estado
})

//************************ GET ALL USER APP **********************************************

export function mostrarALLUserAppAPIAction() {

    return async (dispatch) => {
        dispatch (mostrarUserAppAPI())
             axios({
                    method: "GET",
                    url: urlUserAppAPI,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (mostrarUserAppAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (mostrarUserAppAPIError(true))
            })

    }

}

export function mostrarUserAppAPIAction(idPersona) {

    return async (dispatch) => {
        dispatch (mostrarUserAppAPI())
             axios({
                    method: "GET",
                    url: urlUserAppByPersonaAPI + idPersona,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (mostrarUserAppAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (mostrarUserAppAPIError(true))
            })

    }

}

const mostrarUserAppAPI = () => ({
    type: GET_USER_APP,
    payload: true

})

const mostrarUserAppAPIExito = valorNuevo => ({
    type: GET_USER_APP_EXITO,
    payload: valorNuevo

})

const mostrarUserAppAPIError = estado => ({
  type: GET_USER_APP_ERROR,
  payload: estado
})