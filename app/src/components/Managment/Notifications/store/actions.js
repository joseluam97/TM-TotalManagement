import {

    DESCARGAR_ADJUNTO_NOTIFICACION,
    DESCARGAR_ADJUNTO_NOTIFICACION_EXITO,
    DESCARGAR_ADJUNTO_NOTIFICACION_ERROR,
    
    POST_NUEVA_NOTIFICACION,
    POST_NUEVA_NOTIFICACION_EXITO,
    POST_NUEVA_NOTIFICACION_ERROR,

    PUT_NOTIFICACION,
    PUT_NOTIFICACION_EXITO,
    PUT_NOTIFICACION_ERROR,

    POST_CORREO_SOLICITUD,
    POST_CORREO_SOLICITUD_EXITO,
    POST_CORREO_SOLICITUD_ERROR,

    GET_NOTIFICACION,
    GET_NOTIFICACION_EXITO,
    GET_NOTIFICACION_ERROR,


} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import { getCookie } from 'app/js/generalFunctions'

//Constantes globales
const urlNotificacionesApi  = process.env.REACT_APP_URL_DJANGO + "/api/notifications/"
const urlPostCorreo  = process.env.REACT_APP_URL_DJANGO + "/api/sendEmail/"


//************************ GET NOTIFICACION**********************************************

export function getNotificationAPIAction(idDato) {

    return async (dispatch) => {
        dispatch (getNotificationAPI())
             axios({
                    method: "GET",
                    url: urlNotificacionesApi + "myNotifications/" + idDato,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (getNotificationAPIExito(response.data)) 

             })
             .catch(error => {
                console.log(error.response)
                dispatch (getNotificationAPIError(true))
            })

    }
}

const getNotificationAPI = (user) => ({
    type: GET_NOTIFICACION,
    payload: user

})

const getNotificationAPIExito = notification => ({
    type: GET_NOTIFICACION_EXITO,
    payload: notification

})

const getNotificationAPIError = estado => ({
    type: GET_NOTIFICACION_ERROR,
    payload: estado
})

//************************ PUT NOTIFICACION**********************************************

export function putNotificationAPIAction(idNotificacion, notificacion, personLoginID) {

    return async (dispatch) => {
        dispatch (putNotificationAPI())
             axios({
                    method: "PUT",
                    url: urlNotificacionesApi + idNotificacion,
                    data: notificacion,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (putNotificationAPIExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Notification deleted",
                        variant: "success"
                    })
                 ) 

                 dispatch(getNotificationAPIAction(personLoginID))

             })
             .catch(error => {
                console.log(error.response)
                dispatch (putNotificationAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error change Notifications",
                        variant: "error"
                    })
                )
            })

    }
}

const putNotificationAPI = (user) => ({
    type: PUT_NOTIFICACION,
    payload: user

})

const putNotificationAPIExito = notification => ({
    type: PUT_NOTIFICACION_EXITO,
    payload: notification

})

const putNotificationAPIError = estado => ({
    type: PUT_NOTIFICACION_ERROR,
    payload: estado
})

//************************ INSERTA NUEVA NOTIFICACION**********************************************

export function insertarNewNotificationAPIAction(notificacion) {

    return async (dispatch) => {
        dispatch (insertarNewNotification())
             axios({
                    method: "POST",
                    url: urlNotificacionesApi,
                    data: notificacion,
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (insertarNewNotificationExito(response.data))

                 {/*dispatch(
                    showMessage({
                        message: "Notification created",
                        variant: "success"
                    })
                )*/}

             })
             .catch(error => {
                console.log(error.response)
                dispatch (insertarNewNotificationError(true))

                dispatch(
                    showMessage({
                        message: "Error creating Notifications",
                        variant: "error"
                    })
                )
            })

    }
}

const insertarNewNotification = (user) => ({
    type: POST_NUEVA_NOTIFICACION,
    payload: user

})

const insertarNewNotificationExito = notification => ({
    type: POST_NUEVA_NOTIFICACION_EXITO,
    payload: notification

})

const insertarNewNotificationError = estado => ({
    type: POST_NUEVA_NOTIFICACION_ERROR,
    payload: estado
})

//************************ MOSTRAR LOG_RISK API GET **********************************************
export function descargarAdjuntoNotificacionAPIAction(idNotificacion) {

    return async (dispatch) => {
        dispatch(descargarAdjuntoNotificacionAPI(true))

        await axios({
            method: "GET",
            url: urlNotificacionesApi + "descarga/" + idNotificacion,
            headers: {
                'Authorization': `Token ${getCookie('token')}`
            }

        })
            .then(response => {

                dispatch(descargarAdjuntoNotificacionAPIExito(response.data))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(descargarAdjuntoNotificacionAPIError(true))
            })

    }
}

const descargarAdjuntoNotificacionAPI = (estado) => ({
    type: DESCARGAR_ADJUNTO_NOTIFICACION,
    payload: true

})

const descargarAdjuntoNotificacionAPIExito = customers => ({
    type: DESCARGAR_ADJUNTO_NOTIFICACION_EXITO,
    payload: customers

})

const descargarAdjuntoNotificacionAPIError = estado => ({
    type: DESCARGAR_ADJUNTO_NOTIFICACION_ERROR,
    payload: estado
})
