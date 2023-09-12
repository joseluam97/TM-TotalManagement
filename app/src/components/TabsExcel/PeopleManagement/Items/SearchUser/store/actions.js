import {

    OBTENER_USER_BY_REQUERIMENTS,
    OBTENER_USER_BY_REQUERIMENTS_EXITO,
    OBTENER_USER_BY_REQUERIMENTS_ERROR,

    CAMBIAR_VALOR_USER_SELECTED,
    CAMBIAR_VALOR_USER_SELECTED_EXITO,
    CAMBIAR_VALOR_USER_SELECTED_ERROR,

} from './types';
import axios from 'axios'
import { showMessage } from 'app/store/fuse/messageSlice'
import {getCookie} from 'app/js/generalFunctions'

//Constantes globales
const urlUserAppAPI = process.env.REACT_APP_URL_DJANGO + "/api/aplication/"
const urlrequestUserAPI = process.env.REACT_APP_URL_DJANGO + "/api/requestUser/"

//************************ CAMBIAR SELECCION GRID ACTION**********************************************

export function cambiarValorSeleccionUserSelectedAPIAction(valorNuevo) {

    return (dispatch) => {
        dispatch (cambiarValorSeleccionUserSelectedAPI())

        try {
            dispatch (cambiarValorSeleccionUserSelectedAPIExito(valorNuevo))

        } catch (error) {

            dispatch (cambiarValorSeleccionUserSelectedAPIError(true))
        }

    }

}

const cambiarValorSeleccionUserSelectedAPI = () => ({
    type: CAMBIAR_VALOR_USER_SELECTED,
    payload: false

})

const cambiarValorSeleccionUserSelectedAPIExito = valorNuevo => ({
    type: CAMBIAR_VALOR_USER_SELECTED_EXITO,
    payload: valorNuevo

})

const cambiarValorSeleccionUserSelectedAPIError = estado => ({
  type: CAMBIAR_VALOR_USER_SELECTED_ERROR,
  payload: estado
})

//************************ GET USUARIOS CON LOS REQUISITOS CITADOS **********************************************

export function obtenerUsuariosByRequerimentAPIAction(requeriments) {

    return async (dispatch) => {
        dispatch (obtenerUsuariosByRequerimentAPI())
             axios({
                    method: "POST",
                    url: urlUserAppAPI + "search/",
                    data: {"listRequeriments": requeriments},
                    headers: {
                        'Authorization': `Token ${getCookie('token')}` 
                            }
                       
              })   
              .then(response => {
                 dispatch (obtenerUsuariosByRequerimentAPIExito(response.data))

                 dispatch(
                    showMessage({
                        message: "Search completed successfully",
                        variant: "success"
                    })
                 )

             })
             .catch(error => {
                console.log(error.response)
                dispatch (obtenerUsuariosByRequerimentAPIError(true))

                dispatch(
                    showMessage({
                        message: "Error in the search",
                        variant: "error"
                    })
                )
            })

    }
}

const obtenerUsuariosByRequerimentAPI = (user) => ({
    type: OBTENER_USER_BY_REQUERIMENTS,
    payload: user

})

const obtenerUsuariosByRequerimentAPIExito = notification => ({
    type: OBTENER_USER_BY_REQUERIMENTS_EXITO,
    payload: notification

})

const obtenerUsuariosByRequerimentAPIError = estado => ({
    type: OBTENER_USER_BY_REQUERIMENTS_ERROR,
    payload: estado
})